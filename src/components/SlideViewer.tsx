'use client';

import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Expand, Shrink, Code } from 'lucide-react';

interface SlideViewerProps {
  htmlContent: string | null;
}

export function SlideViewer({ htmlContent }: SlideViewerProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = async () => {
    if (!iframeRef.current) return;

    if (!document.fullscreenElement) {
      try {
        await iframeRef.current.requestFullscreen();
        setIsFullscreen(true);
      } catch (err) {
        console.error('Error attempting to enable full-screen mode:', err);
      }
    } else {
      if (document.exitFullscreen) {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };
  
    // Listen for fullscreen changes to update state
    if (iframeRef.current) {
        iframeRef.current.onfullscreenchange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };
    }

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
    <div className="relative h-full w-full">
      <div className="absolute top-2 right-2 z-10">
        <Button variant="outline" size="icon" onClick={toggleFullscreen} title="Toggle Fullscreen">
          {isFullscreen ? <Shrink className="h-4 w-4" /> : <Expand className="h-4 w-4" />}
        </Button>
      </div>
      <iframe
        ref={iframeRef}
        srcDoc={htmlContent}
        title="Slide Content"
        sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
        className="w-full h-full border-0 rounded-lg bg-white"
      />
    </div>
  );
}
