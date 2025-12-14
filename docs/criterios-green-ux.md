# CRITERIOS Y MÉTRICAS

## Cuantificando el Esfuerzo de Adopción

Ahora que la justificación de rendimiento y accesibilidad es innegable, podemos centrarnos en el nuevo punto que agregaste: medir la **dificultad/esfuerzo de aplicación de Green UX** en cada framework (Líneas de Código, Percepción de Complejidad, etc.).

Para hacer esta métrica objetiva, definiremos criterios para cuantificar el esfuerzo de implementar dos técnicas esenciales:

1.  *Lazy loading inteligente de componentes y recursos.*
2.  *Minimizar el peso del JS (Code Splitting/Tree Shaking).*


## Criterios de cuantificación del Esfuerzo de Green UX sobre un framework

### Métricas a considerar:

|Métrica de Esfuerzo | Definición (Objetivo) |Escala de Puntuación o Criterios |
| :------------ | :------- | :----------------- | 
|1. Dependencias Externas | "Número de librerías o paquetes adicionales (no nativos del framework) requeridos para implementar la optimización (ej., Lazy Loading)." | "0: Funcionalidad nativa del framework (ej., Vue defineAsyncComponent). 1: Paquete oficial del ecosistema (ej., React Loadable). 2+: Paquete de terceros o plugin de build complejo." |
| 2. Configuración de Build | "Esfuerzo requerido en el archivo de configuración (Vite, Angular CLI, etc.) para habilitar o refinar la optimización (ej., Code Splitting)." | "0: Automático (configuración por defecto del framework). 1: Agregar una línea de plugin o loader en el config base. 2+: Modificar archivos de configuración profundos (presets, targets o loaders)." | 
| 3. Líneas de Código (LOC) de Implementación | Promedio de líneas de código extra necesarias en el componente para aplicar la técnica (excluyendo la lógica de negocio). | Baja (1-3 LOC): Sintaxis simple o una función envolvente. Media (4-8 LOC): HOC o hook que requiere lógica de fallback o loading. Alta (9+ LOC): Lógica manual o boilerplate significativo.|
| 4. Grado de Modificación de Componente | Indica qué tan invasivo es el cambio de la técnica sobre el código existente del componente. | "Baja: Solo modifica la instrucción de import. Media: Requiere modificar la sintaxis template o JSX (ej., un <Suspense>). Alta: Requiere refactorizar la lógica del componente o lifecycle." |
| 5. Soporte Nativo (Nivel de Abstracción) | "Indica si la técnica está completamente resuelta por la API del framework o si se basa en el bundler (Webpack, etc.) para funcionar." | Alto: Resuelta por API del framework (la abstracción maneja la complejidad). Medio: Requiere colaboración framework/bundler. Bajo: Depende casi enteramente de soluciones de build externas.| 

## Aplicación a las Estrategias Green UX
Con estos criterios, puedes medir la complejidad (¿Qué tan dificil es implementar?) de las siguientes estrategias clave de Green UX:

### 1) Lazy Loading / Code Splitting:

**Pregunta Clave**: ¿Qué tan difícil es dividir el bundle principal y cargar un componente de forma asíncrona (solo cuando se necesita o se muestra) en cada framework?

### 2) Gestión de Imágenes Responsivas / Optimización de Assets:

**Pregunta Clave**: ¿El framework o su toolchain (Vite, Angular CLI, etc.) ofrece soporte nativo para WebP/AVIF, o se necesita configurar loaders y plugins de terceros?

### 3) Opt-out del Runtime (Svelte vs. otros):

**Pregunta Clave**: En el caso de Vanilla JS y Svelte, ¿cuánto boilerplate o runtime de gestión de estado debes agregar manualmente para lograr la misma funcionalidad que en React o Vue?