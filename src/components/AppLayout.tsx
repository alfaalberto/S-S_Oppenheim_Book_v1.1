'use client';

import { BookOpen, Menu, Save, Sun, Moon } from 'lucide-react';
import { InteractiveIndex } from '@/components/InteractiveIndex';
import { SlideManager } from '@/components/SlideManager';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useIsMobile } from '@/hooks/use-mobile';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from './ui/button';
import { useState, useEffect } from 'react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { useToast } from '@/hooks/use-toast';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export function AppLayout() {
  // Estado para mostrar/ocultar el sidebar (índice)
  const [showSidebar, setShowSidebar] = useState(true);
  // Estado para saber si estamos en pantalla completa (real o fake)
  const [isAnyFullscreen, setIsAnyFullscreen] = useState(false);
  // Estado para modo oscuro/claro
  const [isDark, setIsDark] = useState(() =>
    typeof window !== 'undefined'
      ? document.documentElement.classList.contains('dark')
      : false
  );

  // Alternar modo oscuro
  const toggleDark = () => {
    const html = document.documentElement;
    if (html.classList.contains('dark')) {
      html.classList.remove('dark');
      setIsDark(false);
    } else {
      html.classList.add('dark');
      setIsDark(true);
    }
  };


  // Escuchar eventos de pantalla completa y fake fullscreen
  useEffect(() => {
    function handleFullscreenChange() {
      setIsAnyFullscreen(!!document.fullscreenElement);
    }
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    // Escucha evento personalizado para fake fullscreen (emitido desde SlideViewer)
    function handleFakeFullscreen(e: CustomEvent) {
      setIsAnyFullscreen(e.detail);
    }
    window.addEventListener('fakefullscreen', handleFakeFullscreen as EventListener);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      window.removeEventListener('fakefullscreen', handleFakeFullscreen as EventListener);
    };
  }, []);
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { toast } = useToast();

  const handleSaveClick = () => {
    toast({
      title: 'Progreso Asegurado',
      description:
        'No te preocupes, todos tus cambios se guardan automáticamente.',
      duration: 4000,
    });
  };

  if (isMobile) {
    return (
      <div className="flex flex-col h-screen bg-background text-foreground">
        <header className="flex items-center justify-between p-2 border-b border-border">
          <div className="flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-primary" />
            <h1 className="text-lg font-bold font-headline text-foreground">
              Señales y Sistemas
            </h1>
          </div>
          <div className="flex items-center">
            <Button variant="ghost" size="icon" onClick={handleSaveClick}>
              <Save className="w-5 h-5" />
            </Button>
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-[85%] flex flex-col">
                <header className="flex items-center gap-3 p-4 border-b border-border">
                  <BookOpen className="w-8 h-8 text-primary" />
                  <div>
                    <h1 className="text-xl font-bold font-headline text-foreground">
                      Señales y Sistemas
                    </h1>
                    <p className="text-sm text-muted-foreground">
                      A. V. Oppenheim
                    </p>
                  </div>
                </header>
                <ScrollArea className="flex-1">
                  <InteractiveIndex onSelect={() => setMobileMenuOpen(false)} />
                </ScrollArea>
              </SheetContent>
            </Sheet>
          </div>
        </header>
        <main className="flex-1 overflow-auto">
          <SlideManager />
        </main>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-screen bg-background text-foreground">
      <aside
        className={`min-w-[300px] max-w-[400px] w-full border-r border-border flex flex-col h-screen min-h-screen overflow-y-auto bg-background z-40 transition-transform duration-500 ease-in-out
        ${!showSidebar ? '-translate-x-full absolute left-0 top-0' : 'relative translate-x-0'}`}
        style={{ pointerEvents: showSidebar ? 'auto' : 'none' }}
      >
        <header className="flex items-center justify-between p-4 border-b border-border">
          {/* Botón de modo claro/oscuro */}
          <button
            className="mr-4 p-2 rounded-full bg-secondary shadow-sm hover:bg-primary/10 transition-colors duration-300"
            onClick={toggleDark}
            aria-label={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
          >
            {isDark ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-blue-600" />}
          </button>
          <div className="flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-primary" />
            <div>
              <h1 className="text-xl font-bold font-headline text-foreground">
                Señales y Sistemas
              </h1>
              <p className="text-sm text-muted-foreground">A. V. Oppenheim</p>
            </div>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" onClick={handleSaveClick}>
                  <Save className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Verificar guardado</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </header>
        {!isAnyFullscreen && (
          <div className="relative h-full">
            <Accordion type="single" collapsible defaultValue="index-collapsed">
              <AccordionItem value="index-collapsed">
                <AccordionTrigger className="sticky top-0 z-30 bg-background border-b border-border px-4 py-2 text-left w-full">
                  Índice
                </AccordionTrigger>
                <AccordionContent className="p-0">
                  <ScrollArea className="flex-1 overflow-y-auto h-screen min-h-screen">
                    <InteractiveIndex onSelect={() => {}} />
                  </ScrollArea>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            {/* Botón para ocultar el índice */}
            <button
              className="absolute top-2 right-2 z-50 bg-primary text-white rounded-full p-2 shadow-md focus:outline-none"
              onClick={() => setShowSidebar(false)}
              aria-label="Ocultar índice"
            >
              ←
            </button>
          </div>
        )}
      </aside>
      {/* Botón flotante para mostrar el índice, solo cuando está oculto */}
      {!showSidebar && !isAnyFullscreen && (
        <button
          className="fixed top-4 left-4 z-50 bg-primary text-white rounded-full p-2 shadow-md focus:outline-none"
          onClick={() => setShowSidebar(true)}
          aria-label="Mostrar índice"
        >
          ☰
        </button>
      )}
      <main className="flex-1 flex flex-col items-center justify-center overflow-y-auto h-screen min-h-screen p-0 m-0 w-full">
        <SlideManager />
      </main>
    </div>
  );
}
