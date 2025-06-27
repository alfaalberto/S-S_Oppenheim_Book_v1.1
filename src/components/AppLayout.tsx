'use client';

import { BookOpen, Menu, Save } from 'lucide-react';
import { InteractiveIndex } from '@/components/InteractiveIndex';
import { SlideManager } from '@/components/SlideManager';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useIsMobile } from '@/hooks/use-mobile';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from './ui/button';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export function AppLayout() {
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
      <aside className="min-w-[280px] max-w-[340px] w-full sm:w-[320px] md:w-[340px] border-r border-border flex flex-col h-screen min-h-screen overflow-y-auto">
        <header className="flex items-center justify-between p-4 border-b border-border">
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
        <ScrollArea className="flex-1 overflow-y-auto h-screen min-h-screen">
          <InteractiveIndex onSelect={() => {}} />
        </ScrollArea>
      </aside>
      <main className="flex-1 flex flex-col items-center justify-center overflow-y-auto h-screen min-h-screen p-0 m-0 w-full">
        <SlideManager />
      </main>
    </div>
  );
}
