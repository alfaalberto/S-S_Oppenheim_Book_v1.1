import { BookOpen } from 'lucide-react';

export function Welcome() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground p-8">
      <BookOpen className="w-24 h-24 text-primary/50" strokeWidth={1} />
      <h2 className="mt-6 text-3xl font-bold font-headline text-foreground">
        Bienvenido al Visor Interactivo
      </h2>
      <p className="mt-2 max-w-md">
        Esta es una herramienta para visualizar y organizar las presentaciones del libro "Señales y Sistemas" de A.V. Oppenheim.
      </p>
      <p className="mt-4 font-semibold text-primary">
        Seleccione un tema del índice a la izquierda para comenzar.
      </p>
    </div>
  );
}
