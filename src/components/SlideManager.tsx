'use client';

import { useState, useEffect } from 'react';
import { useSlides } from '@/contexts/SlidesContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { SlideViewer } from './SlideViewer';
import { SlideEditor } from './SlideEditor';
import { Welcome } from './Welcome';
import { ChevronLeft, ChevronRight, Plus, FilePlus, Trash2, ArrowLeft, ArrowRight } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export function SlideManager() {
  const { 
    activeSection, 
    getSlidesForSection, 
    updateSlideContent,
    addSlide,
    deleteSlide,
    reorderSlides
  } = useSlides();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const slides = activeSection ? getSlidesForSection(activeSection.id) : [];

  useEffect(() => {
    // When the active section changes, reset the slide index to the beginning.
    setCurrentSlideIndex(0);
  }, [activeSection]);

  useEffect(() => {
    // When slides change (e.g., after deletion), ensure the index is valid.
    if (slides.length > 0 && currentSlideIndex >= slides.length) {
      setCurrentSlideIndex(slides.length - 1);
    } else if (slides.length === 0) {
      setCurrentSlideIndex(0);
    }
  }, [slides, currentSlideIndex]);

  if (!activeSection) {
    return <Welcome />;
  }

  const isLeafNode = !activeSection.children || activeSection.children.length === 0;
  
  const handleSave = async (html: string) => {
    if (!activeSection) return;
    await updateSlideContent(activeSection.id, currentSlideIndex, html);
  };
  
  const handleAddSlide = async () => {
    if (!activeSection) return;
    const newIndex = await addSlide(activeSection.id);
    if (newIndex !== -1) {
      setCurrentSlideIndex(newIndex);
    }
  };

  const handleDeleteSlide = async () => {
    if (!activeSection || slides.length === 0) return;
    await deleteSlide(activeSection.id, currentSlideIndex);
  };

  const handleReorder = async (direction: 'left' | 'right') => {
    if (!activeSection) return;
    const fromIndex = currentSlideIndex;
    const toIndex = direction === 'left' ? fromIndex - 1 : fromIndex + 1;

    if (toIndex < 0 || toIndex >= slides.length) return;

    const newIndex = await reorderSlides(activeSection.id, fromIndex, toIndex);
    setCurrentSlideIndex(newIndex);
  };
  
  const slideContent = slides[currentSlideIndex] ?? null;

  const renderSlideControls = () => {
    if (!isLeafNode) return null;

    return (
      <div className="flex items-center justify-between gap-4 mb-4 flex-wrap">
        <div className="flex items-center gap-1">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => setCurrentSlideIndex(i => i - 1)}
            disabled={currentSlideIndex === 0}
            title="Diapositiva anterior"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleReorder('left')}
            disabled={currentSlideIndex === 0}
            title="Mover diapositiva a la izquierda"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>

          <span className="text-sm font-medium text-muted-foreground w-28 text-center px-2">
            Diapositiva {slides.length > 0 ? currentSlideIndex + 1 : 0} de {slides.length}
          </span>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleReorder('right')}
            disabled={currentSlideIndex >= slides.length - 1}
            title="Mover diapositiva a la derecha"
          >
            <ArrowRight className="h-4 w-4" />
          </Button>
          
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => setCurrentSlideIndex(i => i + 1)}
            disabled={currentSlideIndex >= slides.length - 1}
            title="Siguiente diapositiva"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleAddSlide}>
            <Plus className="mr-2 h-4 w-4" />
            Añadir Diapositiva
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="sm" disabled={slides.length === 0}>
                <Trash2 className="mr-2 h-4 w-4" />
                Eliminar
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>¿Está seguro?</AlertDialogTitle>
                <AlertDialogDescription>
                  Esta acción no se puede deshacer. Se eliminará permanentemente la diapositiva actual.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction onClick={handleDeleteSlide}>Continuar</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    );
  };

  return (
    <div className="h-full w-full bg-muted/20 p-4 overflow-y-auto">
      <Card className="h-full w-full flex flex-col border-0 shadow-none bg-card">
        <CardHeader>
          <CardTitle className="font-headline text-2xl text-primary">{activeSection.title}</CardTitle>
          <CardDescription>
            ID de sección: {activeSection.id}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col min-h-0">
          {isLeafNode ? (
            <>
              {renderSlideControls()}
              {slides.length > 0 ? (
                <Tabs defaultValue="view" className="flex-1 flex flex-col">
                  <TabsList className="self-start">
                    <TabsTrigger value="view">Visualizar</TabsTrigger>
                    <TabsTrigger value="edit">Editar HTML</TabsTrigger>
                  </TabsList>
                  <TabsContent value="view" className="flex-1 mt-4 rounded-md overflow-hidden">
                    <SlideViewer
                      htmlContent={slideContent}
                      onNext={() => setCurrentSlideIndex(i => i + 1)}
                      onPrevious={() => setCurrentSlideIndex(i => i - 1)}
                      hasNext={currentSlideIndex < slides.length - 1}
                      hasPrevious={currentSlideIndex > 0}
                    />
                  </TabsContent>
                  <TabsContent value="edit" className="flex-1 mt-4">
                    <SlideEditor
                      initialContent={slideContent}
                      onSave={handleSave}
                    />
                  </TabsContent>
                </Tabs>
              ) : (
                <div className="flex flex-col items-center justify-center h-full rounded-lg border-2 border-dashed border-border text-muted-foreground text-center p-8">
                    <FilePlus className="mx-auto h-12 w-12" />
                    <h3 className="mt-4 text-lg font-medium">Esta sección no tiene diapositivas</h3>
                    <p className="mt-1 text-sm">Haga clic en el botón de abajo para empezar a añadir contenido.</p>
                    <Button onClick={handleAddSlide} className="mt-6">
                        <Plus className="mr-2 h-4 w-4" />
                        Añadir primera diapositiva
                    </Button>
                </div>
              )}
            </>
          ) : (
            <div className="p-6 text-center text-muted-foreground">
              <h3 className="text-xl font-semibold">Resumen de la Sección</h3>
              <p className="mt-2">
                Seleccione un subtema del índice para ver o editar su contenido.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
