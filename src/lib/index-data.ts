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
        title: '1.1 Señales continuas y discretas',
        children: [
          { id: '1.1.1', title: '1.1.1 Ejemplos y representación matemática' },
          { id: '1.1.2', title: '1.1.2 Señales de energía y de potencia' },
        ],
      },
      {
        id: '1.2',
        title: '1.2 Transformaciones de la variable independiente',
        children: [
          { id: '1.2.1', title: '1.2.1 Ejemplos de transformaciones' },
          { id: '1.2.2', title: '1.2.2 Señales periódicas' },
          { id: '1.2.3', title: '1.2.3 Señales par e impar' },
        ],
      },
      {
        id: '1.3',
        title: '1.3 Señales exponenciales y senoidales',
        children: [
          { id: '1.3.1', title: '1.3.1 Señales continuas' },
          { id: '1.3.2', title: '1.3.2 Señales discretas' },
          { id: '1.3.3', title: '1.3.3 Propiedades de periodicidad' },
        ],
      },
      {
        id: '1.4',
        title: '1.4 Las funciones impulso unitario y escalón unitario',
        children: [
          { id: '1.4.1', title: '1.4.1 Secuencias discretas' },
          { id: '1.4.2', title: '1.4.2 Funciones continuas' },
        ],
      },
      {
        id: '1.5',
        title: '1.5 Sistemas continuos y discretos',
        children: [
          { id: '1.5.1', title: '1.5.1 Ejemplos sencillos' },
          { id: '1.5.2', title: '1.5.2 Interconexiones de sistemas' },
        ],
      },
      {
        id: '1.6',
        title: '1.6 Propiedades básicas de los sistemas',
        children: [
          { id: '1.6.1', title: '1.6.1 Con y sin memoria' },
          { id: '1.6.2', title: '1.6.2 Invertibilidad' },
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
    title: '2 SISTEMAS LINEALES INVARIANTES EN EL TIEMPO',
    children: [
        { id: '2.0', title: '2.0 Introducción' },
        { id: '2.1', title: '2.1 Sistemas LTI discretos: La suma de convolución' },
        { id: '2.2', title: '2.2 Sistemas LTI continuos: La integral de convolución' },
        { id: '2.3', title: '2.3 Propiedades de los sistemas LTI' },
        { id: '2.4', title: '2.4 Sistemas LTI causales' },
        { id: '2.5', title: '2.5 Funciones singulares' },
        { id: '2.6', title: '2.6 Resumen' },
        { id: '2.P', title: 'Problemas' },
    ]
  },
  {
    id: '3',
    title: '3 REPRESENTACIÓN DE SEÑALES PERIÓDICAS EN SERIES DE FOURIER',
    children: [
        { id: '3.0', title: '3.0 Introducción' },
        { id: '3.1', title: '3.1 Una perspectiva histórica' },
        { id: '3.2', title: '3.2 La respuesta de sistemas LTI a exponenciales complejas' },
        { id: '3.3', title: '3.3 Representación en serie de Fourier de señales periódicas continuas' },
        { id: '3.4', title: '3.4 Convergencia de las series de Fourier' },
        { id: '3.5', title: '3.5 Propiedades de la serie continua de Fourier' },
        { id: '3.6', title: '3.6 Representación en series de Fourier de señales periódicas discretas' },
        { id: '3.7', title: '3.7 Propiedades de la serie discreta de Fourier' },
        { id: '3.8', title: '3.8 Serie de Fourier y sistemas LTI' },
        { id: '3.9', title: '3.9 Filtrado' },
        { id: '3.10', title: '3.10 Ejemplos de filtros continuos' },
        { id: '3.11', title: '3.11 Ejemplos de filtros discretos' },
        { id: '3.12', title: '3.12 Resumen' },
        { id: '3.P', title: 'Problemas' },
    ]
  },
  {
    id: '4',
    title: '4 LA TRANSFORMADA CONTINUA DE FOURIER',
    children: [
        { id: '4.0', title: '4.0 Introducción' },
        { id: '4.1', title: '4.1 Representación de señales aperiódicas' },
        { id: '4.2', title: '4.2 La transformada para señales periódicas' },
        { id: '4.3', title: '4.3 Propiedades de la transformada' },
        { id: '4.4', title: '4.4 La propiedad de convolución' },
        { id: '4.5', title: '4.5 La propiedad de multiplicación' },
        { id: '4.6', title: '4.6 Tablas de propiedades y pares' },
        { id: '4.7', title: '4.7 Sistemas con ecuaciones diferenciales' },
        { id: '4.8', title: '4.8 Resumen' },
        { id: '4.P', title: 'Problemas' },
    ]
  },
  {
    id: '5',
    title: '5 LA TRANSFORMADA DE FOURIER DE TIEMPO DISCRETO',
    children: [
        { id: '5.0', title: '5.0 Introducción' },
        { id: '5.1', title: '5.1 Representación de señales aperiódicas' },
        { id: '5.2', title: '5.2 La transformada para señales periódicas' },
        { id: '5.3', title: '5.3 Propiedades de la transformada' },
        { id: '5.4', title: '5.4 La propiedad de convolución' },
        { id: '5.5', title: '5.5 La propiedad de multiplicación' },
        { id: '5.6', title: '5.6 Tablas de propiedades y pares' },
        { id: '5.7', title: '5.7 Dualidad' },
        { id: '5.8', title: '5.8 Sistemas con ecuaciones en diferencias' },
        { id: '5.9', title: '5.9 Resumen' },
        { id: '5.P', title: 'Problemas' },
    ]
  },
  {
    id: '6',
    title: '6 CARACTERIZACIÓN EN TIEMPO Y FRECUENCIA',
    children: [
        { id: '6.0', title: '6.0 Introducción' },
        { id: '6.1', title: '6.1 Representación magnitud-fase' },
        { id: '6.2', title: '6.2 Representación de la respuesta en frecuencia' },
        { id: '6.3', title: '6.3 Propiedades de filtros ideales' },
        { id: '6.4', title: '6.4 Aspectos de filtros no ideales' },
        { id: '6.5', title: '6.5 Sistemas continuos de 1er y 2do orden' },
        { id: '6.6', title: '6.6 Sistemas discretos de 1er y 2do orden' },
        { id: '6.7', title: '6.7 Ejemplos de análisis' },
        { id: '6.8', title: '6.8 Resumen' },
        { id: '6.P', title: 'Problemas' },
    ]
  },
  {
    id: '7',
    title: '7 MUESTREO',
    children: [
        { id: '7.0', title: '7.0 Introducción' },
        { id: '7.1', title: '7.1 Teorema de muestreo' },
        { id: '7.2', title: '7.2 Reconstrucción de una señal' },
        { id: '7.3', title: '7.3 El efecto del submuestreo: Traslape' },
        { id: '7.4', title: '7.4 Procesamiento discreto de señales continuas' },
        { id: '7.5', title: '7.5 Muestreo de señales discretas' },
        { id: '7.6', title: '7.6 Decimación e interpolación' },
        { id: '7.7', title: 'Resumen' },
        { id: '7.P', title: 'Problemas' },
    ]
  },
  {
    id: '8',
    title: '8 SISTEMAS DE COMUNICACIÓN',
    children: [
        { id: '8.0', title: '8.0 Introducción' },
        { id: '8.1', title: '8.1 Modulación de amplitud' },
        { id: '8.2', title: '8.2 Demodulación para AM senoidal' },
        { id: '8.3', title: '8.3 Multiplexaje por división de frecuencia' },
        { id: '8.4', title: '8.4 Modulación de amplitud de banda lateral única' },
        { id: '8.5', title: '8.5 Modulación con tren de pulsos' },
        { id: '8.6', title: '8.6 Modulación de amplitud de pulsos' },
        { id: '8.7', title: '8.7 Modulación de frecuencia senoidal' },
        { id: '8.8', title: '8.8 Modulación discreta' },
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
        { id: '9.2', title: '9.2 La región de convergencia' },
        { id: '9.3', title: '9.3 La transformada inversa' },
        { id: '9.4', title: '9.4 Evaluación geométrica' },
        { id: '9.5', title: '9.5 Propiedades de la transformada' },
        { id: '9.6', title: '9.6 Almacén para transformadas' },
        { id: '9.7', title: '9.7 Análisis y caracterización de sistemas LTI' },
        { id: '9.8', title: '9.8 Álgebra de la función del sistema' },
        { id: '9.9', title: '9.9 La transformada unilateral' },
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
        { id: '10.2', title: '10.2 La región de convergencia' },
        { id: '10.3', title: '10.3 La transformada z inversa' },
        { id: '10.4', title: '10.4 Evaluación geométrica' },
        { id: '10.5', title: '10.5 Propiedades de la transformada z' },
        { id: '10.6', title: '10.6 Pares comunes de transformada z' },
        { id: '10.7', title: '10.7 Análisis y caracterización de sistemas LTI' },
        { id: '10.8', title: '10.8 Álgebra de la función del sistema' },
        { id: '10.9', title: '10.9 La transformada z unilateral' },
        { id: '10.10', title: '10.10 Resumen' },
        { id: '10.P', title: 'Problemas' },
    ]
  },
  {
    id: '11',
    title: '11 SISTEMAS LINEALES RETROALIMENTADOS',
    children: [
        { id: '11.0', title: '11.0 Introducción' },
        { id: '11.1', title: '11.1 Sistemas lineales retroalimentados' },
        { id: '11.2', title: '11.2 Aplicaciones y consecuencias' },
        { id: '11.3', title: '11.3 Análisis del lugar geométrico de las raíces' },
        { id: '11.4', title: '11.4 Propiedades de la estabilidad de Nyquist' },
        { id: '11.5', title: '11.5 Márgenes de ganancia y fase' },
        { id: '11.6', title: '11.6 Resumen' },
        { id: '11.P', title: 'Problemas' },
    ]
  }
];
