'use client';

import { useSlides } from '@/contexts/SlidesContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SlideViewer } from './SlideViewer';
import { SlideEditor } from './SlideEditor';
import { Welcome } from './Welcome';

export function SlideManager() {
  const { activeSection, getSlideContent, saveSlideContent } = useSlides();

  if (!activeSection) {
    return <Welcome />;
  }

  const isLeafNode = !activeSection.children || activeSection.children.length === 0;
  const slideContent = getSlideContent(activeSection.id);

  const handleSave = async (html: string) => {
    await saveSlideContent(activeSection.id, html);
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
            <Tabs defaultValue="view" className="flex-1 flex flex-col">
              <TabsList className="self-start">
                <TabsTrigger value="view">Visualizar</TabsTrigger>
                <TabsTrigger value="edit">Editar HTML</TabsTrigger>
              </TabsList>
              <TabsContent value="view" className="flex-1 mt-4 rounded-md overflow-hidden">
                <SlideViewer htmlContent={slideContent} />
              </TabsContent>
              <TabsContent value="edit" className="flex-1 mt-4">
                <SlideEditor
                  key={activeSection.id}
                  initialContent={slideContent}
                  onSave={handleSave}
                />
              </TabsContent>
            </Tabs>
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
