'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import * as db from '@/lib/db';
import type { IndexItem } from '@/lib/index-data';
import { useToast } from '@/hooks/use-toast';

interface SlidesContextType {
  slidesBySection: Record<string, string[]>;
  activeSection: IndexItem | null;
  setActiveSection: (section: IndexItem | null) => void;
  getSlidesForSection: (id: string) => string[];
  updateSlideContent: (sectionId: string, slideIndex: number, html: string) => Promise<void>;
  addSlide: (sectionId: string) => Promise<number>; // Returns the new slide index
  deleteSlide: (sectionId: string, slideIndex: number) => Promise<void>;
  reorderSlides: (sectionId: string, fromIndex: number, toIndex: number) => Promise<number>;
  isLoading: boolean;
}

const SlidesContext = createContext<SlidesContextType | undefined>(undefined);

export function SlidesProvider({ children }: { children: ReactNode }) {
  const [slidesBySection, setSlidesBySection] = useState<Record<string, string[]>>({});
  const [activeSection, setActiveSection] = useState<IndexItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const loadSlides = async () => {
      try {
        setIsLoading(true);
        const storedSlides = await db.getAllSlides();
        setSlidesBySection(storedSlides);
      } catch (error) {
        console.error("Failed to load slides from DB", error);
        toast({
          variant: "destructive",
          title: "Error de Carga",
          description: "No se pudieron cargar las diapositivas guardadas.",
        });
      } finally {
        setIsLoading(false);
      }
    };
    loadSlides();
  }, [toast]);

  const getSlidesForSection = useCallback((id: string) => slidesBySection[id] || [], [slidesBySection]);

  const updateSlideContent = useCallback(async (sectionId: string, slideIndex: number, html: string) => {
    const currentSlides = [...(slidesBySection[sectionId] || [])];
    if (slideIndex < 0 || slideIndex >= currentSlides.length) {
      console.error("Invalid slide index");
      toast({ variant: "destructive", title: "Error", description: "Índice de diapositiva no válido." });
      return;
    }
    
    currentSlides[slideIndex] = html;

    try {
      await db.saveSlidesForSection(sectionId, currentSlides);
      setSlidesBySection(prev => ({ ...prev, [sectionId]: currentSlides }));
      toast({
        title: "Guardado",
        description: `La diapositiva ${slideIndex + 1} de la sección ${sectionId} se guardó correctamente.`,
      });
    } catch (error) {
      console.error("Failed to save slide", error);
      toast({
        variant: "destructive",
        title: "Error al Guardar",
        description: "No se pudo guardar la diapositiva.",
      });
    }
  }, [slidesBySection, toast]);

  const addSlide = useCallback(async (sectionId: string) => {
    const currentSlides = [...(slidesBySection[sectionId] || [])];
    const newSlideHtml = '<h1>Nueva Diapositiva</h1><p>Empiece a editar...</p>';
    const newSlides = [...currentSlides, newSlideHtml];

    try {
      await db.saveSlidesForSection(sectionId, newSlides);
      setSlidesBySection(prev => ({ ...prev, [sectionId]: newSlides }));
      toast({
        title: "Diapositiva Añadida",
        description: `Se ha añadido una nueva diapositiva a la sección ${sectionId}.`,
      });
      return newSlides.length - 1; // Return new index
    } catch (error) {
      console.error("Failed to add slide", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo añadir la nueva diapositiva.",
      });
      return -1;
    }
  }, [slidesBySection, toast]);

  const deleteSlide = useCallback(async (sectionId: string, slideIndex: number) => {
    const currentSlides = [...(slidesBySection[sectionId] || [])];
    if (slideIndex < 0 || slideIndex >= currentSlides.length) {
      console.error("Invalid slide index for deletion");
      toast({ variant: "destructive", title: "Error", description: "Índice de diapositiva no válido para eliminar." });
      return;
    }

    currentSlides.splice(slideIndex, 1);

    try {
      await db.saveSlidesForSection(sectionId, currentSlides);
      setSlidesBySection(prev => ({ ...prev, [sectionId]: currentSlides }));
      toast({
        title: "Diapositiva Eliminada",
        description: `La diapositiva ha sido eliminada.`,
      });
    } catch (error) {
      console.error("Failed to delete slide", error);
      toast({
        variant: "destructive",
        title: "Error al Eliminar",
        description: "No se pudo eliminar la diapositiva.",
      });
    }
  }, [slidesBySection, toast]);

  const reorderSlides = useCallback(async (sectionId: string, fromIndex: number, toIndex: number) => {
    const currentSlides = [...(slidesBySection[sectionId] || [])];
    
    if (fromIndex < 0 || fromIndex >= currentSlides.length || toIndex < 0 || toIndex >= currentSlides.length) {
      console.error("Invalid index for reordering");
      toast({ variant: "destructive", title: "Error", description: "Índice no válido para reordenar." });
      return fromIndex;
    }

    const [movedItem] = currentSlides.splice(fromIndex, 1);
    currentSlides.splice(toIndex, 0, movedItem);

    try {
      await db.saveSlidesForSection(sectionId, currentSlides);
      setSlidesBySection(prev => ({ ...prev, [sectionId]: currentSlides }));
      toast({
        title: "Diapositiva Reordenada",
        description: `El orden de las diapositivas se ha actualizado.`,
      });
      return toIndex; // Return the new index of the moved slide
    } catch (error) {
      console.error("Failed to reorder slides", error);
      toast({
        variant: "destructive",
        title: "Error al Reordenar",
        description: "No se pudo cambiar el orden de las diapositivas.",
      });
      return fromIndex;
    }
  }, [slidesBySection, toast]);


  const value = {
    slidesBySection,
    activeSection,
    setActiveSection,
    getSlidesForSection,
    updateSlideContent,
    addSlide,
    deleteSlide,
    reorderSlides,
    isLoading,
  };

  return <SlidesContext.Provider value={value}>{children}</SlidesContext.Provider>;
}

export function useSlides() {
  const context = useContext(SlidesContext);
  if (context === undefined) {
    throw new Error('useSlides must be used within a SlidesProvider');
  }
  return context;
}
