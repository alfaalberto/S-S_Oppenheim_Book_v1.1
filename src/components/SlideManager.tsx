'use client';

import { useState, useEffect } from 'react';
import { useSlides } from '@/contexts/SlidesContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { SlideViewer } from './SlideViewer';
import { SlideEditor } from './SlideEditor';
import { Welcome } from './Welcome';
import { ChevronLeft, ChevronRight, Plus, FilePlus } from 'lucide-react';

export function SlideManager() {
  const { 
    activeSection, 
    getSlidesForSection, 
    updateSlideContent,
    addSlide 
  } = useSlides();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  // Reset slide index when section changes
  useEffect(() => {
    setCurrentSlideIndex(0);
  }, [activeSection]);

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

  const slides = getSlidesForSection(activeSection.id);
  const slideContent = slides[currentSlideIndex] ?? null;

  const renderSlideControls = () => {
    if (!isLeafNode) return null;

    return (
      <div className="flex items-center gap-4 mb-4">
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => setCurrentSlideIndex(i => i - 1)}
            disabled={currentSlideIndex === 0}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm font-medium text-muted-foreground w-28 text-center">
            Diapositiva {slides.length > 0 ? currentSlideIndex + 1 : 0} de {slides.length}
          </span>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => setCurrentSlideIndex(i => i + 1)}
            disabled={currentSlideIndex >= slides.length - 1}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <Button variant="outline" size="sm" onClick={handleAddSlide}>
          <Plus className="mr-2 h-4 w-4" />
          Añadir Diapositiva
        </Button>
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
                <Tabs defaultValue="view" className="flex-1 flex flex-col" key={activeSection.id + '-' + currentSlideIndex}>
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
                      key={activeSection.id + '-' + currentSlideIndex} // Important to re-mount editor
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
