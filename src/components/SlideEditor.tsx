'use client';

import { useState, useRef, ChangeEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Upload, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SlideEditorProps {
  initialContent: string | null;
  onSave: (html: string) => Promise<void>;
}

export function SlideEditor({ initialContent, onSave }: SlideEditorProps) {
  const [content, setContent] = useState(initialContent || '');
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleSave = async () => {
    setIsSaving(true);
    await onSave(content);
    setIsSaving(false);
  };
  
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type === 'text/html') {
        const reader = new FileReader();
        reader.onload = (e) => {
          const text = e.target?.result as string;
          setContent(text);
          toast({
            title: "Archivo Cargado",
            description: "El contenido del archivo HTML se ha cargado en el editor."
          });
        };
        reader.readAsText(file);
      } else {
        toast({
          variant: "destructive",
          title: "Tipo de Archivo Incorrecto",
          description: "Por favor, seleccione un archivo .html.",
        });
      }
    }
  };

  const triggerFileSelect = () => fileInputRef.current?.click();

  return (
    <div className="flex flex-col h-full gap-4">
      <div className="flex-1 flex flex-col">
        <Label htmlFor="html-editor" className="mb-2 font-headline">
          Editor de Contenido HTML
        </Label>
        <Textarea
          id="html-editor"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Pegue aquí el código HTML de la diapositiva..."
          className="flex-1 font-mono text-sm resize-none"
          aria-label="Editor de HTML"
        />
      </div>
      <div className="flex flex-col sm:flex-row gap-2 justify-end">
        <input type="file" ref={fileInputRef} onChange={handleFileChange} accept=".html" className="hidden" />
        <Button variant="outline" onClick={triggerFileSelect}>
          <Upload className="mr-2 h-4 w-4" />
          Subir archivo HTML
        </Button>
        <Button onClick={handleSave} disabled={isSaving}>
          <Save className="mr-2 h-4 w-4" />
          {isSaving ? 'Guardando...' : 'Guardar Cambios'}
        </Button>
      </div>
    </div>
  );
}
