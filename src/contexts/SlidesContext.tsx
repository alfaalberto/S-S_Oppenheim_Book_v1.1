'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import * as db from '@/lib/db';
import type { IndexItem } from '@/lib/index-data';
import { useToast } from '@/hooks/use-toast';

interface SlidesContextType {
  slides: Record<string, string>;
  activeSection: IndexItem | null;
  setActiveSection: (section: IndexItem | null) => void;
  getSlideContent: (id: string) => string | null;
  saveSlideContent: (id: string, html: string) => Promise<void>;
  isLoading: boolean;
}

const SlidesContext = createContext<SlidesContextType | undefined>(undefined);

export function SlidesProvider({ children }: { children: ReactNode }) {
  const [slides, setSlides] = useState<Record<string, string>>({});
  const [activeSection, setActiveSection] = useState<IndexItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const loadSlides = async () => {
      try {
        setIsLoading(true);
        const storedSlides = await db.getAllSlides();
        setSlides(storedSlides);
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

  const getSlideContent = useCallback((id: string) => slides[id] || null, [slides]);

  const saveSlideContent = useCallback(async (id: string, html: string) => {
    try {
      await db.saveSlide(id, html);
      setSlides(prevSlides => ({ ...prevSlides, [id]: html }));
       toast({
        title: "Guardado",
        description: `La diapositiva para la sección ${id} se guardó correctamente.`,
      });
    } catch (error) {
       console.error("Failed to save slide", error);
       toast({
        variant: "destructive",
        title: "Error al Guardar",
        description: "No se pudo guardar la diapositiva.",
      });
    }
  }, [toast]);

  const value = {
    slides,
    activeSection,
    setActiveSection,
    getSlideContent,
    saveSlideContent,
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
