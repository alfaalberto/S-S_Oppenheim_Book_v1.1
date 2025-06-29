// Declaración de tipos para react-katex
declare module 'react-katex' {
  import React from 'react';
  
  interface KatexProps {
    children: string;
    math?: string;
    block?: boolean;
    errorColor?: string;
    renderError?: (error: Error) => React.ReactNode;
    settings?: any;
    [key: string]: any;
  }
  
  export const BlockMath: React.FC<KatexProps>;
  export const InlineMath: React.FC<KatexProps>;
}
