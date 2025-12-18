# 🌿 Guía Esencial: Entendiendo el "Costo Digital"
Si no eres programador, esta guía te ayudará a entender por qué las decisiones técnicas que tomamos al inicio de un proyecto afectan directamente a la experiencia del usuario y al medio ambiente.

### 1. El concepto del "Equipaje"
Imagina que visitar una página web es como enviar un paquete por correo. Para que la página aparezca en la pantalla del usuario, el servidor debe enviar un "equipaje" de datos y código.

- **La Web Ligera:** Envía lo justo y necesario. Es un paquete pequeño que llega rápido y se abre sin esfuerzo.

- **La Web Pesada**: Envía una caja enorme llena de instrucciones complejas. Abrir y organizar ese contenido requiere tiempo y energía, sin importar qué tan potente sea la máquina que lo recibe.

**Faba es la balanza que mide ese equipaje en un entorno de laboratorio controlado.**

---

### 2. ¿Qué medimos en el "Laboratorio"?

Aunque Faba se ejecuta en computadoras de alto rendimiento (ambiente Headless), las métricas que obtenemos son indicadores de la "salud técnica" de cada herramienta:

- **El Tamaño del Paquete (Red):** Medimos el volumen total de datos. Aunque tu conexión sea rápida, un paquete más grande siempre implica más infraestructura moviéndose y más energía consumida en el trayecto.

- **El Esfuerzo de Procesamiento (CPU)**: Medimos cuánto tiempo "piensa" la computadora para entender el código. Si una computadora de prueba potente muestra bloqueos, es una señal de alerta de que la herramienta es intrínsecamente pesada.

- **El "Silencio" del Navegador (Estabilidad)**: Medimos cuánto tiempo el navegador se queda procesando código antes de estar listo para atender al usuario. En Faba lo llamamos **FTTS (Faba Time To Stability)**.


---

### 3. La "Causa Raíz": El sesgo del entorno ideal

Los desarrolladores suelen construir aplicaciones en computadoras muy potentes. Esto genera un sesgo: como a ellos les funciona bien, asumen que la tecnología es eficiente.

**Faba elimina ese sesgo**. Al probar todos los frameworks en el mismo "laboratorio" neutro, exponemos el **costo base** de cada tecnología antes de que llegue siquiera a las manos del usuario.

---


### 4. Guía para Diseñadores: ¿Cómo escala tu diseño?

Si tu rol es definir la experiencia, te invitamos a mirar la métrica de "Costo por Registro".

Un diseño puede verse idéntico en dos herramientas distintas, pero una puede volverse mucho más pesada que la otra a medida que añades contenido (filas, tarjetas, imágenes). Faba te ayuda a elegir la herramienta que mejor escala con tu visión creativa, evitando que el diseño se vuelva "lento" a medida que crece.

---

### 5. Sostenibilidad desde la raíz

La eficiencia digital no se trata solo de ahorrar batería. Es reducir la cantidad de energía necesaria para mover y procesar información en todo el mundo. Elegir un framework eficiente es la decisión de Green UX más profunda que puedes tomar: es optimizar la fuente misma de la experiencia digital.

--- 

### 6. ¿Cómo leer los resultados de Faba?
Cuando veas nuestras tablas, fíjate en el Índice de Eficiencia, siempre en comparacipon con otras tecnologías medidas bajo este experimento:

- **Cercano a 0**: La tecnología es una "pluma". Es ideal para proyectos que buscan máxima inclusión y bajo impacto ambiental.

- **Cercano a 1**: La tecnología es "pesada". Quizás ofrece muchas funciones, pero el costo que le cobra al usuario es muy alto.

---


### 💡 ¿Quieres saber más?

Si quieres ver los detalles técnicos y matemáticos, puedes leer nuestra [Metodología Completa.](methodology.md)
