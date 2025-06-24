'use client';

import { BookOpen, Menu } from 'lucide-react';
import { InteractiveIndex } from '@/components/InteractiveIndex';
import { SlideManager } from '@/components/SlideManager';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useIsMobile } from '@/hooks/use-mobile';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from './ui/button';
import { useState } from 'react';

export function AppLayout() {
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const sidebarContent = (
      <>
        <header className="flex items-center gap-3 p-4 border-b border-border">
          <BookOpen className="w-8 h-8 text-primary" />
          <div>
            <h1 className="text-xl font-bold font-headline text-foreground">Señales y Sistemas</h1>
            <p className="text-sm text-muted-foreground">A. V. Oppenheim</p>
          </div>
        </header>
        <ScrollArea className="flex-1">
          <InteractiveIndex onSelect={() => setMobileMenuOpen(false)} />
        </ScrollArea>
      </>
  );

  if (isMobile) {
    return (
       <div className="flex flex-col h-screen bg-background text-foreground">
        <header className="flex items-center justify-between p-2 border-b border-border">
            <div className="flex items-center gap-2">
                 <BookOpen className="w-6 h-6 text-primary" />
                 <h1 className="text-lg font-bold font-headline text-foreground">Señales y Sistemas</h1>
            </div>
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <Menu className="w-6 h-6" />
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="p-0 w-[85%] flex flex-col">
                    {sidebarContent}
                </SheetContent>
            </Sheet>
        </header>
        <main className="flex-1 overflow-auto">
          <SlideManager />
        </main>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-background text-foreground">
      <aside className="w-[380px] flex-shrink-0 border-r border-border flex flex-col">
        {sidebarContent}
      </aside>
      <main className="flex-1 flex flex-col overflow-hidden">
        <SlideManager />
      </main>
    </div>
  );
}
