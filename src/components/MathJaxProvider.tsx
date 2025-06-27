// Proveedor de contexto para MathJax en Next.js
import { useEffect } from 'react';

export function MathJaxProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof window !== 'undefined' && !window.MathJax) {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.id = 'mathjax-script';
      script.async = true;
      script.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js';
      document.head.appendChild(script);
    }
  }, []);
  return <>{children}</>;
}
