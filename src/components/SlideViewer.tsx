
'use client';

import { useRef, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Expand, Shrink, Code, ChevronLeft, ChevronRight } from 'lucide-react';

interface SlideViewerProps {
  htmlContent: string | null;
  onNext: () => void;
  onPrevious: () => void;
  hasNext: boolean;
  hasPrevious: boolean;
}

export function SlideViewer({ htmlContent, onNext, onPrevious, hasNext, hasPrevious }: SlideViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  const toggleFullscreen = async () => {
    if (!containerRef.current) return;

    if (!document.fullscreenElement) {
      try {
        await containerRef.current.requestFullscreen();
      } catch (err) {
        console.error('Error attempting to enable full-screen mode:', err);
      }
    } else {
      if (document.exitFullscreen) {
        await document.exitFullscreen();
      }
    }
  };
  
  const styledHtmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          /* Basic Reset & Font Styles */
          html {
            box-sizing: border-box;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            line-height: 1.6;
            -webkit-text-size-adjust: 100%;
            
            /* --- KEY CHANGE FOR SCROLLING --- */
            /* The html element will be the scroll container */
            height: 100%; 
            overflow-y: auto; /* Show scrollbar if content overflows vertically */
            overflow-x: hidden; /* Prevent horizontal scroll */
          }
          *, *:before, *:after {
            box-sizing: inherit;
          }
          body {
            margin: 0;
            padding: 0;
            background-color: #111827; /* Tailwind bg-neutral-900 */
            color: #e5e7eb; /* Tailwind text-neutral-200 */
            min-height: 100%;
            min-width: 100%;
            box-sizing: border-box;
            overflow: auto;
          }
          /* Wrapper for aesthetics */
          
        </style>
      </head>
      <body>
        <div style="min-width:100%;min-height:100%;overflow:auto;">
          ${htmlContent || ''}
        </div>
      </body>
    </html>
  `;

  if (!htmlContent) {
    return (
      <div className="flex items-center justify-center h-full rounded-lg border-2 border-dashed border-border text-muted-foreground">
        <div className="text-center">
            <Code className="mx-auto h-12 w-12" />
            <h3 className="mt-4 text-lg font-medium">Sin Contenido</h3>
            <p className="mt-1 text-sm">Pegue código en la pestaña "Editar HTML" para comenzar.</p>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative h-full w-full bg-background group overflow-auto px-6">
      <iframe
        srcDoc={styledHtmlContent}
        title="Slide Content"
        sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
        className="w-full h-full border-0 rounded-lg bg-white overflow-auto"
      />
      
      <div className="absolute top-2 right-2 z-10">
        <Button variant="outline" size="icon" onClick={toggleFullscreen} title={isFullscreen ? "Salir de pantalla completa" : "Pantalla completa"}>
          {isFullscreen ? <Shrink className="h-4 w-4" /> : <Expand className="h-4 w-4" />}
        </Button>
      </div>
      
      {isFullscreen && (
        <>
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 h-14 w-14 rounded-full bg-black/25 text-white hover:bg-black/40 disabled:hidden"
            onClick={onPrevious}
            disabled={!hasPrevious}
            aria-label="Diapositiva anterior"
          >
            <ChevronLeft className="h-8 w-8" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 h-14 w-14 rounded-full bg-black/25 text-white hover:bg-black/40 disabled:hidden"
            onClick={onNext}
            disabled={!hasNext}
            aria-label="Siguiente diapositiva"
          >
            <ChevronRight className="h-8 w-8" />
          </Button>
        </>
      )}
    </div>
  );
}
