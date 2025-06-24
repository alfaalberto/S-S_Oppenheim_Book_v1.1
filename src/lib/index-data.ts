export interface IndexItem {
  id: string;
  title: string;
  children?: IndexItem[];
}

export const bookIndex: IndexItem[] = [
  {
    id: '1',
    title: '1 SEÑALES Y SISTEMAS',
    children: [
      { id: '1.0', title: '1.0 Introducción' },
      {
        id: '1.1',
        title: '1.1 Señales en tiempo continuo y en tiempo discreto',
        children: [
          { id: '1.1.1', title: '1.1.1 Ejemplos y representación matemática de las señales' },
          { id: '1.1.2', title: '1.1.2 Señales de energía y de potencia' },
        ],
      },
      {
        id: '1.2',
        title: '1.2 Transformaciones de la variable independiente',
        children: [
          { id: '1.2.1', title: '1.2.1 Ejemplos de transformaciones de la variable independiente' },
          { id: '1.2.2', title: '1.2.2 Señales periódicas' },
          { id: '1.2.3', title: '1.2.3 Señales par e impar' },
        ],
      },
      {
        id: '1.3',
        title: '1.3 Señales exponenciales y senoidales',
        children: [
          { id: '1.3.1', title: '1.3.1 Señales exponenciales y senoidales en tiempo continuo' },
          { id: '1.3.2', title: '1.3.2 Señales exponenciales y senoidales en tiempo discreto' },
          { id: '1.3.3', title: '1.3.3 Propiedades de periodicidad de las señales en tiempo discreto' },
        ],
      },
      {
        id: '1.4',
        title: '1.4 La función impulso unitario y la función escalón unitario',
        children: [
          { id: '1.4.1', title: '1.4.1 El impulso y el escalón unitarios en tiempo discreto' },
          { id: '1.4.2', title: '1.4.2 El impulso y el escalón unitarios en tiempo continuo' },
        ],
      },
      {
        id: '1.5',
        title: '1.5 Sistemas en tiempo continuo y en tiempo discreto',
        children: [
          { id: '1.5.1', title: '1.5.1 Ejemplos sencillos de sistemas' },
          { id: '1.5.2', title: '1.5.2 Interconexiones de sistemas' },
        ],
      },
      {
        id: '1.6',
        title: '1.6 Propiedades básicas de los sistemas',
        children: [
          { id: '1.6.1', title: '1.6.1 Sistemas con y sin memoria' },
          { id: '1.6.2', title: '1.6.2 Invertibilidad y sistemas inversos' },
          { id: '1.6.3', title: '1.6.3 Causalidad' },
          { id: '1.6.4', title: '1.6.4 Estabilidad' },
          { id: '1.6.5', title: '1.6.5 Invariancia en el tiempo' },
          { id: '1.6.6', title: '1.6.6 Linealidad' },
        ],
      },
      { id: '1.7', title: '1.7 Resumen' },
      { id: '1.P', title: 'Problemas' },
    ],
  },
  {
    id: '2',
    title: '2 SISTEMAS LINEALES E INVARIANTES EN EL TIEMPO',
    children: [
        { id: '2.0', title: '2.0 Introducción' },
        { id: '2.1', title: '2.1 Sistemas LTI en tiempo discreto: La suma de convolución' },
        { id: '2.2', title: '2.2 Sistemas LTI en tiempo continuo: La integral de convolución' },
        { id: '2.3', title: '2.3 Propiedades de los sistemas lineales e invariantes en el tiempo' },
        { id: '2.4', title: '2.4 Sistemas LTI causales descritos por ecuaciones diferenciales y en diferencias' },
        { id: '2.5', title: '2.5 Funciones de singularidad' },
        { id: '2.6', title: '2.6 Resumen' },
        { id: '2.P', title: 'Problemas' },
    ]
  },
  {
    id: '3',
    title: '3 REPRESENTACIÓN DE SEÑALES PERIÓDICAS MEDIANTE SERIES DE FOURIER',
    children: [
        { id: '3.0', title: '3.0 Introducción' },
        { id: '3.1', title: '3.1 Una perspectiva histórica' },
        { id: '3.2', title: '3.2 La respuesta de los sistemas LTI a exponenciales complejas' },
        { id: '3.3', title: '3.3 Representación en series de Fourier de señales periódicas en tiempo continuo' },
        { id: '3.4', title: '3.4 Convergencia de las series de Fourier' },
        { id: '3.5', title: '3.5 Propiedades de las series de Fourier en tiempo continuo' },
        { id: '3.6', title: '3.6 Representación en series de Fourier de señales periódicas en tiempo discreto' },
        { id: '3.7', title: '3.7 Propiedades de las series de Fourier en tiempo discreto' },
        { id: '3.8', title: '3.8 Las series de Fourier y los sistemas LTI' },
        { id: '3.9', title: '3.9 Filtrado' },
        { id: '3.10', title: '3.10 Ejemplos de filtros en tiempo continuo descritos por ecuaciones diferenciales' },
        { id: '3.11', title: '3.11 Ejemplos de filtros en tiempo discreto descritos por ecuaciones en diferencias' },
        { id: '3.12', title: '3.12 Resumen' },
        { id: '3.P', title: 'Problemas' },
    ]
  },
  {
    id: '4',
    title: '4 LA TRANSFORMADA DE FOURIER EN TIEMPO CONTINUO',
    children: [
        { id: '4.0', title: '4.0 Introducción' },
        { id: '4.1', title: '4.1 Representación de señales aperiódicas: la transformada de Fourier en tiempo continuo' },
        { id: '4.2', title: '4.2 La transformada de Fourier de señales periódicas' },
        { id: '4.3', title: '4.3 Propiedades de la transformada de Fourier en tiempo continuo' },
        { id: '4.4', title: '4.4 La propiedad de convolución' },
        { id: '4.5', title: '4.5 La propiedad de multiplicación' },
        { id: '4.6', title: '4.6 Tablas de propiedades y pares básicos de la transformada de Fourier' },
        { id: '4.7', title: '4.7 Sistemas caracterizados por ecuaciones diferenciales lineales con coeficientes constantes' },
        { id: '4.8', title: '4.8 Resumen' },
        { id: '4.P', title: 'Problemas' },
    ]
  },
  {
    id: '5',
    title: '5 LA TRANSFORMADA DE FOURIER EN TIEMPO DISCRETO',
    children: [
        { id: '5.0', title: '5.0 Introducción' },
        { id: '5.1', title: '5.1 Representación de señales aperiódicas: la transformada de Fourier en tiempo discreto' },
        { id: '5.2', title: '5.2 La transformada de Fourier de señales periódicas' },
        { id: '5.3', title: '5.3 Propiedades de la transformada de Fourier en tiempo discreto' },
        { id: '5.4', title: '5.4 La propiedad de convolución' },
        { id: '5.5', title: '5.5 La propiedad de multiplicación' },
        { id: '5.6', title: '5.6 Tablas de propiedades y pares básicos de la transformada de Fourier' },
        { id: '5.7', title: '5.7 Dualidad' },
        { id: '5.8', title: '5.8 Sistemas caracterizados por ecuaciones en diferencias lineales con coeficientes constantes' },
        { id: '5.9', title: '5.9 Resumen' },
        { id: '5.P', title: 'Problemas' },
    ]
  },
  {
    id: '6',
    title: '6 CARACTERIZACIÓN EN TIEMPO Y FRECUENCIA DE SEÑALES Y SISTEMAS',
    children: [
        { id: '6.0', title: '6.0 Introducción' },
        { id: '6.1', title: '6.1 La representación magnitud-fase de la transformada de Fourier' },
        { id: '6.2', title: '6.2 La representación magnitud-fase de la respuesta en frecuencia de los sistemas LTI' },
        { id: '6.3', title: '6.3 Retardo de tiempo y retardo de grupo' },
        { id: '6.4', title: '6.4 Propiedades de los filtros ideales selectivos en frecuencia' },
        { id: '6.5', title: '6.5 Sistemas en tiempo continuo de primer y segundo orden' },
        { id: '6.6', title: '6.6 Sistemas en tiempo discreto de primer y segundo orden' },
        { id: '6.7', title: '6.7 Ejemplos de análisis en tiempo y en frecuencia de sistemas' },
        { id: '6.8', title: '6.8 Resumen' },
        { id: '6.P', title: 'Problemas' },
    ]
  },
  {
    id: '7',
    title: '7 MUESTREO',
    children: [
        { id: '7.0', title: '7.0 Introducción' },
        { id: '7.1', title: '7.1 Representación de una señal en tiempo continuo mediante sus muestras: el teorema de muestreo' },
        { id: '7.2', title: '7.2 Reconstrucción de una señal a partir de sus muestras usando interpolación' },
        { id: '7.3', title: '7.3 El efecto del submuestreo: aliasing' },
        { id: '7.4', title: '7.4 Procesamiento en tiempo discreto de señales en tiempo continuo' },
        { id: '7.5', title: '7.5 Muestreo de señales en tiempo discreto' },
        { id: '7.6', title: '7.6 Decimación e interpolación' },
        { id: '7.7', title: '7.7 Resumen' },
        { id: '7.P', title: 'Problemas' },
    ]
  },
  {
    id: '8',
    title: '8 SISTEMAS DE COMUNICACIÓN',
    children: [
        { id: '8.0', title: '8.0 Introducción' },
        { id: '8.1', title: '8.1 Modulación de amplitud senoidal compleja' },
        { id: '8.2', title: '8.2 Modulación de amplitud senoidal' },
        { id: '8.3', title: '8.3 Demodulación para AM senoidal' },
        { id: '8.4', title: '8.4 Multiplexaje por división de frecuencia' },
        { id: '8.5', title: '8.5 Modulación de amplitud de banda lateral única (SSB)' },
        { id: '8.6', title: '8.6 Modulación con un tren de pulsos de amplitud y modulación por tiempo' },
        { id: '8.7', title: '8.7 Modulación de amplitud de pulsos (PAM)' },
        { id: '8.8', title: '8.8 Modulación de frecuencia y de fase (modulación angular)' },
        { id: '8.9', title: '8.9 Resumen' },
        { id: '8.P', title: 'Problemas' },
    ]
  },
  {
    id: '9',
    title: '9 LA TRANSFORMADA DE LAPLACE',
    children: [
        { id: '9.0', title: '9.0 Introducción' },
        { id: '9.1', title: '9.1 La transformada de Laplace' },
        { id: '9.2', title: '9.2 La región de convergencia para la transformada de Laplace' },
        { id: '9.3', title: '9.3 La transformada inversa de Laplace' },
        { id: '9.4', title: '9.4 Evaluación geométrica de la transformada de Fourier a partir del diagrama de polos y ceros' },
        { id: '9.5', title: '9.5 Propiedades de la transformada de Laplace' },
        { id: '9.6', title: '9.6 Pares y propiedades de la transformada de Laplace' },
        { id: '9.7', title: '9.7 Análisis y caracterización de sistemas LTI usando la transformada de Laplace' },
        { id: '9.8', title: '9.8 Álgebra de diagramas de bloques y función del sistema' },
        { id: '9.9', title: '9.9 La transformada unilateral de Laplace' },
        { id: '9.10', title: '9.10 Resumen' },
        { id: '9.P', title: 'Problemas' },
    ]
  },
  {
    id: '10',
    title: '10 LA TRANSFORMADA Z',
    children: [
        { id: '10.0', title: '10.0 Introducción' },
        { id: '10.1', title: '10.1 La transformada z' },
        { id: '10.2', title: '10.2 La región de convergencia para la transformada z' },
        { id: '10.3', title: '10.3 La transformada z inversa' },
        { id: '10.4', title: '10.4 Evaluación geométrica de la transformada de Fourier a partir del diagrama de polos y ceros' },
        { id: '10.5', title: '10.5 Propiedades de la transformada z' },
        { id: '10.6', title: '10.6 Pares y propiedades comunes de la transformada z' },
        { id: '10.7', title: '10.7 Análisis y caracterización de sistemas LTI usando la transformada z' },
        { id: '10.8', title: '10.8 Álgebra de diagramas de bloques y función del sistema' },
        { id: '10.9', title: '10.9 La transformada z unilateral' },
        { id: '10.10', title: '10.10 Resumen' },
        { id: '10.P', title: 'Problemas' },
    ]
  },
  {
    id: '11',
    title: '11 SISTEMAS LINEALES CON RETROALIMENTACIÓN',
    children: [
        { id: '11.0', title: '11.0 Introducción' },
        { id: '11.1', title: '11.1 Sistemas lineales con retroalimentación y sus propiedades básicas' },
        { id: '11.2', title: '11.2 Aplicaciones de la retroalimentación: Diseño de sistemas de control' },
        { id: '11.3', title: '11.3 El método del lugar geométrico de las raíces' },
        { id: '11.4', title: '11.4 El criterio de estabilidad de Nyquist' },
        { id: '11.5', title: '11.5 Márgenes de ganancia y de fase' },
        { id: '11.6', title: '11.6 Resumen' },
        { id: '11.P', title: 'Problemas' },
    ]
  }
];
