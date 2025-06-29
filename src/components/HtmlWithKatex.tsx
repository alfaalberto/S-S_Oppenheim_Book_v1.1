import React from 'react';
import { BlockMath, InlineMath } from 'react-katex';

// Utilidad para dividir el HTML en fragmentos de texto y expresiones LaTeX
function splitWithLatex(html: string) {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    // SSR: no procesar, solo devolver el HTML plano
    return html;
  }
  // Busca expresiones en $...$, $$...$$, \(...\), \[...\]
  // Solo para texto plano dentro del HTML, no dentro de atributos
  const regex = /\\\[(.+?)\\\]|\\\((.+?)\\\)|\$\$(.+?)\$\$|\$(.+?)\$/gs;
  let lastIndex = 0;
  let result: React.ReactNode[] = [];
  let match;

  // Usamos un div temporal para parsear el HTML y procesar solo los nodos de texto
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;

  function processNode(node: ChildNode): React.ReactNode {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent || '';
      let localLastIndex = 0;
      let localResult: React.ReactNode[] = [];
      let m;
      while ((m = regex.exec(text)) !== null) {
        if (m.index > localLastIndex) {
          localResult.push(text.slice(localLastIndex, m.index));
        }
        const latex = m[1] || m[2] || m[3] || m[4];
        const isBlock = !!(m[1] || m[3]);
        localResult.push(
          isBlock ? (
            <BlockMath math={latex} key={Math.random()} />
          ) : (
            <InlineMath math={latex} key={Math.random()} />
          )
        );
        localLastIndex = m.index + m[0].length;
      }
      if (localLastIndex < text.length) {
        localResult.push(text.slice(localLastIndex));
      }
      return localResult;
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      const el = node as HTMLElement;
      return React.createElement(
        el.tagName.toLowerCase(),
        // Copiar atributos
        Object.fromEntries(Array.from(el.attributes).map(attr => [attr.name, attr.value])),
        Array.from(node.childNodes).map(processNode)
      );
    } else {
      return null;
    }
  }

  return Array.from(tempDiv.childNodes).map(processNode);
}

export function HtmlWithKatex({ html }: { html: string }) {
  // Si es SSR, solo muestra el HTML plano
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return <div dangerouslySetInnerHTML={{ __html: html }} />;
  }
  // En el cliente, procesa el HTML y renderiza las fórmulas
  const processed = splitWithLatex(html);
  // Si splitWithLatex devolvió string (SSR fallback), renderiza como HTML plano
  if (typeof processed === 'string') {
    return <div dangerouslySetInnerHTML={{ __html: processed }} />;
  }
  return <>{processed}</>;
}
