import React from 'react';
import 'katex/dist/katex.min.css';
import { BlockMath, InlineMath } from 'react-katex';

interface MathRendererProps {
  content: string;
}

// Helper to split content into text, inline math, and block math
function parseMath(content: string) {
  // Matches $$...$$ (block) and \(...\) (inline)
  const regex = /(\$\$[^$]+\$\$|\\\([^\\)]+\\\))/g;
  const parts = [];
  let lastIndex = 0;
  let match;
  while ((match = regex.exec(content)) !== null) {
    if (match.index > lastIndex) {
      parts.push({ type: 'text', value: content.slice(lastIndex, match.index) });
    }
    if (match[0].startsWith('$$')) {
      parts.push({ type: 'block', value: match[0].slice(2, -2) });
    } else {
      parts.push({ type: 'inline', value: match[0].slice(2, -2) });
    }
    lastIndex = regex.lastIndex;
  }
  if (lastIndex < content.length) {
    parts.push({ type: 'text', value: content.slice(lastIndex) });
  }
  return parts;
}

export const MathRenderer: React.FC<MathRendererProps> = ({ content }) => {
  const parts = parseMath(content);
  return (
    <>
      {parts.map((part, i) => {
        if (part.type === 'block') {
          return <BlockMath key={i}>{part.value}</BlockMath>;
        } else if (part.type === 'inline') {
          return <InlineMath key={i}>{part.value}</InlineMath>;
        } else {
          return <React.Fragment key={i}>{part.value}</React.Fragment>;
        }
      })}
    </>
  );
};
