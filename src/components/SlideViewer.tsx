
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

// Commit de prueba automático para verificar push a GitHub
import { useToast } from '@/hooks/use-toast';
export function SlideViewer({ htmlContent, onNext, onPrevious, hasNext, hasPrevious }: SlideViewerProps) {
  const [isFakeFullscreen, setIsFakeFullscreen] = useState(false);

  // Detecta si es iOS/iPadOS
  function isIOS() {
    return (
      /iPad|iPhone|iPod/.test(navigator.userAgent) ||
      (navigator.userAgent.includes('Macintosh') && 'ontouchend' in document)
    );
  }

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

  // Helper to check Fullscreen API support
  function isFullscreenSupported() {
    const el = document.createElement('div') as any;
    return (
      !!(el.requestFullscreen || el.webkitRequestFullscreen || el.mozRequestFullScreen || el.msRequestFullscreen)
    );
  }

  const { toast } = useToast();

  const toggleFullscreen = async () => {
    if (!containerRef.current) return;

    // Si es iOS o no hay soporte de Fullscreen, activa fake fullscreen
    if (!isFullscreenSupported() || isIOS()) {
      setIsFakeFullscreen((prev) => {
        const newVal = !prev;
        window.dispatchEvent(new CustomEvent('fakefullscreen', { detail: newVal }));
        return newVal;
      });
      return;
    }

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
    <style>
      html, body {
        margin: 0;
        padding: 0;
        background: white;
        box-sizing: border-box;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
        line-height: 1.6;
        width: 100vw;
        height: 100vh;
        min-height: 100vh;
        min-width: 100vw;
        overflow: auto !important;
      }
      .content-wrapper {
        width: auto;
        height: auto;
        margin: 0;
        padding: 0;
        overflow: auto !important;
        max-width: none;
        max-height: none;
      }
    </style>
    <div class="content-wrapper">
      ${htmlContent || ''}
    </div>
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

  // Emitir evento cuando se sale de fake fullscreen
  useEffect(() => {
    if (!isFakeFullscreen) {
      window.dispatchEvent(new CustomEvent('fakefullscreen', { detail: false }));
    }
  }, [isFakeFullscreen]);

  return (
    <div
      ref={containerRef}
      className={`relative bg-background group flex items-center justify-center ${
        isFullscreen || isFakeFullscreen
          ? 'fixed inset-0 z-50 w-screen h-screen'
          : 'h-full w-full'
      }`}
      style={isFullscreen || isFakeFullscreen ? { padding: 0, margin: 0 } : {}}
    >
      <iframe
        srcDoc={styledHtmlContent}
        title="Slide Content"
        sandbox="allow-scripts allow-popups allow-forms"
        className={`border-0 bg-white ${isFullscreen ? 'w-screen h-screen rounded-none' : 'w-full h-full rounded-none'}`}
        style={{ width: '100%', height: '100%', display: 'block', margin: 0, padding: 0, borderRadius: 0, overflow: 'auto' }}
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
