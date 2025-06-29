import React from 'react';
import { BlockMath, InlineMath } from 'react-katex';
import parse, { domToReact, HTMLReactParserOptions, Element, Text } from 'html-react-parser';

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
  // Regex para detectar expresiones LaTeX
  const regex = /\\\[(.+?)\\\]|\\\((.+?)\\\)|\$\$(.+?)\$\$|\$(.+?)\$/gs;

  // Visitor para procesar nodos de texto y reemplazar LaTeX
  const options: HTMLReactParserOptions = {
    replace: (domNode) => {
      if (domNode.type === 'text') {
        const node = domNode as Text;
        const text = node.data || '';
        let lastIndex = 0;
        let m;
        const fragments: (string | JSX.Element)[] = [];
        while ((m = regex.exec(text)) !== null) {
          if (m.index > lastIndex) {
            fragments.push(text.slice(lastIndex, m.index));
          }
          const latex = m[1] || m[2] || m[3] || m[4];
          const isBlock = !!(m[1] || m[3]);
          fragments.push(
            isBlock ? (
              <BlockMath math={latex} key={Math.random()} />
            ) : (
              <InlineMath math={latex} key={Math.random()} />
            )
          );
          lastIndex = m.index + m[0].length;
        }
        if (lastIndex < text.length) {
          fragments.push(text.slice(lastIndex));
        }
        if (fragments.length > 1) {
          return <>{fragments}</>;
        }
      }
      return undefined;
    },
  };

  // SSR y cliente funcionan igual, no hay manipulación de DOM ni efectos
  return <>{parse(html, options)}</>;
}
