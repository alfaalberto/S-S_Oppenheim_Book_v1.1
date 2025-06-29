import React from 'react';
import { BlockMath, InlineMath } from 'react-katex';
import parse, { domToReact, HTMLReactParserOptions, Element, Text } from 'html-react-parser';

export function HtmlWithKatex({ html }: { html: string }) {
  // Regex para detectar expresiones LaTeX - versión compatible con ES2017 (sin flag 's')
  const regex = /\\\[([\s\S]+?)\\\]|\\\(([\s\S]+?)\\\)|\$\$([\s\S]+?)\$\$|\$([\s\S]+?)\$/g;

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
