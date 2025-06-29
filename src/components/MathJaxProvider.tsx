// Proveedor de contexto para MathJax en Next.js
import { useEffect } from 'react';

declare global {
  interface Window {
    MathJax?: any;
  }
}

// MathJaxProvider eliminado porque ahora se utiliza KaTeX para el renderizado de fórmulas matemáticas.
