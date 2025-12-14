# Network Baseline

### Cifras de Impacto de la Red y el Volumen de Datos

Para contextualizar el impacto de la red sobre el volumen de datos que debe procesar el frontend, se realizó una prueba simple de consumo de la API pública de `RandomUser.me` para **1000 registros** bajo dos escenarios de conectividad. El volumen de datos transferidos es de **315 KB** en ambos casos. Similar para los **100 registros**, el volumen de datos rondea los **34 KB**.

Esto demuestra cómo la latencia y el ancho de banda penalizan la transferencia inicial de datos y, por ende, el *start-up* del navegador, incluso antes de que el framework comience a renderizar.

| N.º Registros | Conexión | Datos Transferidos | Tiempo Total de Carga (Finish) | Factor de Incremento (vs. Fibra) |
| :------------ | :------- | :----------------- | :----------------------------- | :------------------------------- |
| **100** | Fibra Óptica | 33 KB | 704 ms | 1x |
| **100** | 3G Simulado | 35 KB | 4.71 s | **6.7x** |
| **1000** | Fibra Óptica | 315 KB | 799 ms | 1x |
| **1000** | 3G Simulado | 316 KB | 8.55 s | **10.7x** |

**Observaciones Clave para 100 registros:**

* **Impacto de la Latencia:** Incluso con una carga de datos muy pequeña (33 KB para 100 registros), la conexión 3G incrementa el tiempo de carga en **6.7 veces**. Esto resalta que la latencia (el tiempo que tarda una solicitud en ir y volver) es el principal factor de penalización en la red, incluso más que el volumen de datos en sí mismo.
* **Foco del Benchmark:** El objetivo de Faba es medir y reducir el consumo computacional del framework *después* de esta transferencia inicial. Reducir el *overhead* del framework mitigará el impacto acumulado de los **8.55 segundos** o **4.71 segundos** ya consumidos en la red.
* **Validación del Green UX:** Este contraste extremo entre conexiones valida que cada milisegundo de eficiencia que Faba pueda identificar y eliminar en el frontend contribuye directamente a una experiencia funcional para los usuarios más vulnerables (baja cobertura, dispositivos antiguos).

---

**Observaciones Clave para 1000 registros:**

* **Diferencia de Rendimiento:** Bajo una carga de datos idéntica (aproximadamente 315 KB), el tiempo de carga total se incrementa más de **10 veces** (de 799 ms a 8.55 s) al simular una conexión 3G.
* **Relevancia para Green UX:** Esto valida que en escenarios de red limitada o dispositivos de bajo rendimiento, el **tiempo de espera del usuario** está dominado por la latencia. Los segundos que el frontend de Faba puede ahorrar en procesamiento (ejecución de JS, renderizado) son cruciales para mejorar la experiencia de usuario y la **inclusión digital** para aquellos con peores condiciones de acceso.
* **Foco del Benchmark:** El objetivo de Faba es medir y reducir el consumo computacional del framework *después* de esta transferencia inicial, mitigando el impacto acumulado de los **8.55 segundos** que ya se han consumido en la red.

---