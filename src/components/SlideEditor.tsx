'use client';

import { useState, useRef, ChangeEvent, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Upload, Save, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { mejorarHtmlConGemini } from '@/lib/geminiClient';

interface SlideEditorProps {
  initialContent: string | null;
  onSave: (html: string) => Promise<void>;
}

export function SlideEditor({ initialContent, onSave }: SlideEditorProps) {
  const [content, setContent] = useState(initialContent || '');
  const [isSaving, setIsSaving] = useState(false);
  const [isImproving, setIsImproving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    setContent(initialContent || '');
  }, [initialContent]);

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

  const handleImprove = async () => {
    setIsImproving(true);
    toast({ title: "Mejorando con IA Gemini...", description: "Esto puede tardar unos segundos." });
    try {
      const mejorado = await mejorarHtmlConGemini(content);
      setContent(mejorado);
      toast({ title: "¡Listo!", description: "El HTML fue mejorado con Gemini." });
    } catch (e: any) {
      toast({ variant: "destructive", title: "Error con Gemini", description: e.message });
    }
    setIsImproving(false);
  };

  return (
    <div className="flex flex-col h-full w-full p-0 m-0 gap-2">
      <Label htmlFor="html-editor" className="mb-2 font-headline">
        Editor de Contenido HTML
      </Label>
      <Textarea
        id="html-editor"
        value={content}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)}
        placeholder="Pegue aquí el código HTML de la diapositiva..."
        className="flex-1 font-mono text-sm resize-none"
        aria-label="Editor de HTML"
      />
      <div className="flex flex-col sm:flex-row gap-2 justify-end p-0 m-0">
        <input type="file" ref={fileInputRef} onChange={handleFileChange} accept=".html" className="hidden" />
        <Button variant="secondary" onClick={handleImprove} disabled={isImproving || isSaving}>
          <Sparkles className="mr-2 h-4 w-4 text-yellow-500" />
          {isImproving ? 'Mejorando...' : 'Mejorar con IA Gemini'}
        </Button>
        <Button variant="outline" onClick={triggerFileSelect} disabled={isImproving || isSaving}>
          <Upload className="mr-2 h-4 w-4" />
          Subir archivo HTML
        </Button>
        <Button onClick={handleSave} disabled={isSaving || isImproving}>
          <Save className="mr-2 h-4 w-4" />
          {isSaving ? 'Guardando...' : 'Guardar Cambios'}
        </Button>
      </div>
    </div>
  );
}
