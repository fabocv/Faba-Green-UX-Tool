# Metodología de Medición y Benchmark – Faba

## 1. Estrategia general

Faba utiliza una estrategia de **benchmark técnico comparativo**, basada en medición **in-process**, ejecuciones repetidas y agregación estadística.  
Cada aplicación bajo prueba (framework + variante UI) es responsable de medir su propio rendimiento utilizando exclusivamente **APIs nativas del navegador**, evitando dependencias externas que puedan interferir con los resultados.

El objetivo no es certificar consumo energético absoluto, sino **comparar costos técnicos relativos** asociados a decisiones de framework y arquitectura frontend, bajo condiciones controladas y reproducibles.

---

## 2. Tipo de testeo

- **Tipo**: Benchmark comparativo de rendimiento frontend.
- **Nivel**: Aplicación completa (no micro-benchmark).
- **Contexto**: Render inicial y estabilización del hilo principal.
- **Enfoque**: Consumo de recursos digitales (red, CPU, JS, memoria).

No se trata de pruebas sintéticas aisladas, sino de **escenarios funcionales equivalentes** ejecutados en condiciones homogéneas.

---

## 3. Limpieza metodológica

Para asegurar resultados comparables y limpios:

- No se utilizan librerías externas de medición (Lighthouse, Web Vitals, etc.).
- No hay analytics, tracking ni Service Workers.
- No existen caches compartidas entre ejecuciones.
- El controlador no inyecta lógica de medición en las aplicaciones evaluadas.
- Todas las métricas provienen del runtime real del navegador.

Esto reduce ruido, overhead artificial y sesgos introducidos por herramientas externas.

---

## 4. Decisión arquitectónica clave

### Medición distribuida y control pasivo

Cada aplicación evaluada:
- Mide internamente su ejecución.
- Agrega resultados de múltiples iteraciones.
- Expone únicamente métricas agregadas.

La aplicación controladora:
- Orquesta las ejecuciones.
- Define parámetros globales (por ejemplo, número de iteraciones).
- Recopila resultados finales.
- Normaliza y genera reportes.

El controlador **no mide rendimiento** ni ejecuta lógica dentro del sistema bajo prueba.

---

## 5. Ciclo de medición

1. La app inicia la medición antes del render.
2. Se ejecuta el render inicial y la carga de datos.
3. Se observan métricas mediante APIs nativas.
4. La medición finaliza cuando:
   > *El render inicial se completa y no se detectan Long Tasks durante 200 ms consecutivos.*
5. El proceso se repite **M veces**.
6. Se calculan estadísticas agregadas.
7. Se exponen los resultados al controlador.

---

## 6. Iteraciones (M)

- Cada aplicación ejecuta **M iteraciones completas** del escenario definido.
- Valor por defecto recomendado: **M = 20**.
- `M` es un **parámetro configurable**, definido por la aplicación controladora y transmitido a cada app evaluada.
- Los resultados reportados corresponden a valores **promediados**, con posibilidad de incluir desviación estándar.

Esto permite reducir variabilidad y capturar comportamientos consistentes.

> La desviación estándar se utiliza como indicador de estabilidad, no como criterio de exclusión de resultados.

---

## 7. Qué se envía al controlador

Cada aplicación envía **solo resultados agregados**, estructurados en un JSON normalizado:

- Metadata de la ejecución.
- Contexto del entorno.
- Métricas agregadas (mean, opcionalmente std).
- Indicadores derivados.
- Índice de eficiencia relativo.

No se envían resultados crudos de cada iteración por defecto.

---

## 8. Qué se maneja internamente en cada app

Internamente, cada aplicación:

- Almacena resultados individuales de cada iteración.
- Calcula estadísticas (promedio, desviación).
- Normaliza unidades.
- Deriva indicadores secundarios.

Estos datos pueden persistirse localmente (memoria, IndexedDB) solo con fines de auditoría o depuración, pero no forman parte de la salida estándar.

---

## 9. Métricas medidas

Todas las métricas se obtienen mediante **APIs nativas del navegador**, sin dependencias externas.

### Tabla de métricas

| Métrica | Qué mide / Importancia | Unidad | Cómo se mide y calcula |
|------|------------------------|--------|------------------------|
| Total Transferred | Volumen total de datos transferidos. Impacta red y energía | KB | Suma de `transferSize` desde Resource Timing |
| Requests Count | Número de solicitudes de red. Overhead de conexión | Cantidad | Conteo de entradas `resource` |
| JS Bundle Size | Peso total de JS descargado | KB | Filtrado por tipo `script` |
| CSS Bundle Size | Peso total de CSS descargado | KB | Filtrado por tipo `link` |
| FCP | Tiempo hasta primer contenido visible | ms | Performance Paint Timing |
| LCP | Tiempo hasta mayor contenido visible | ms | Largest Contentful Paint API |
| TTI* | Tiempo hasta interacción estable | ms | Derivado desde tareas largas + eventos |
| JS Execution Time | Tiempo total ejecutando JS | ms | Suma de ejecución de scripts |
| Long Tasks Count | Bloqueos del main thread >50 ms | Cantidad | Long Tasks API |
| Total Blocking Time | Tiempo total bloqueando el hilo principal | ms | Suma de long tasks |
| Max Long Task | Mayor bloqueo individual | ms | Máximo valor observado |
| Heap Used | Memoria JS utilizada post-render | MB | `performance.memory.usedJSHeapSize` (Chrome) |


TTI* se calcula de forma operativa, considerando ausencia de Long Tasks y disponibilidad de interacción básica, no como definición estricta de Lighthouse.
---

## 10. Métricas derivadas

A partir de las métricas base se calculan indicadores comparativos:

- **JS por registro renderizado**  
  `JS Bundle Size / número de elementos`
- **Tiempo de ejecución JS por registro**  
  `JS Execution Time / número de elementos`
- **Requests por registro**  
  `Requests Count / número de elementos`

Estos indicadores permiten evaluar **escalabilidad y costo marginal**.

---

## 11. Índice de eficiencia relativo

Se calcula un **índice compuesto y normalizado**, basado en métricas clave de red y ejecución.  
El índice es **relativo al conjunto comparado** y se utiliza exclusivamente para facilitar análisis comparativos, no como medida absoluta de eficiencia energética.

---

## 12. Qué no aborda esta metodología

- Medición directa de consumo eléctrico.
- Cálculo exacto de emisiones de CO₂.
- Impacto del backend o infraestructura.
- Experiencia de usuario subjetiva.
- Comportamiento en escenarios complejos de estado global o autenticación.

El foco es **frontend, técnico, comparativo y reproducible**.

---

## 13. Principio rector

> *Faba mide costos técnicos reales del frontend moderno utilizando prácticas estándar de benchmarking de sistemas, priorizando comparabilidad, transparencia y mínima interferencia.*

# Script de Normalización y Análisis Post-Proceso

### Rol del script en la arquitectura de Faba

El script de normalización es una herramienta de **análisis post-proceso**, ejecutada fuera del runtime de las aplicaciones evaluadas.  
Su función es **procesar, comparar y normalizar** los resultados agregados generados por cada aplicación medida, sin intervenir en la medición ni alterar los datos de origen.

Este script forma parte de la etapa de **análisis**, no de medición.

Apps medidas → JSON agregados → Controlador → Script de normalización → Reportes

---

### Principios metodológicos

El diseño del script sigue principios clásicos de benchmarking de sistemas:

- Separación estricta entre **sistema bajo prueba** y **herramientas de análisis**.
- Procesamiento offline de resultados.
- Normalización explícita y reproducible.
- Cálculo de métricas comparativas sin inferencias no documentadas.

El script **no ejecuta pruebas**, **no mide rendimiento** y **no introduce lógica adicional** en las aplicaciones evaluadas.

---

### Entradas del script

El script recibe como entrada un conjunto de archivos JSON, uno por cada aplicación evaluada, con métricas ya agregadas internamente tras **M iteraciones**.

Ejemplo de estructura de entrada:

```
/results
-  react-light.json
-  react-heavy.json
-  vue-light.json
-  vue-heavy.json
-  svelte-light.json
-  angular-heavy.json
```

Cada archivo debe cumplir el contrato de salida definido por Faba.

---

### Validación previa

Antes de realizar cualquier comparación, el script valida que:

- Todas las aplicaciones reporten el mismo escenario (`recordsRendered`, layout).
- El número de iteraciones coincida con el valor esperado (`M`).
- La condición de término de la medición sea idéntica.
- Las métricas base requeridas estén presentes.

Si una ejecución no cumple estos criterios, **se excluye del análisis**.

---

### Métricas utilizadas para normalización

El script utiliza únicamente métricas directamente asociadas al consumo de recursos:

- Tamaño total de JavaScript descargado (KB)
- Tiempo total de ejecución de JavaScript (ms)
- Total Blocking Time (ms)
- Número total de requests de red

Estas métricas se extraen desde los valores **promedio** reportados por cada aplicación.

---

### Normalización de métricas

Cada métrica se normaliza respecto al **peor caso observado** dentro del conjunto comparado, utilizando la siguiente fórmula:
```
m_norm = m_app / max(m_all_apps)
```

Esto produce valores en el rango `[0,1]`, donde:
- `1` representa el mayor costo relativo observado,
- valores menores indican mejor eficiencia relativa.

La normalización se realiza **por métrica**, de forma independiente.

---

### Cálculo del Relative Efficiency Index

El **Relative Efficiency Index** es un índice compuesto y ponderado, calculado a partir de las métricas normalizadas.

Pesos definidos:

- JavaScript descargado (KB): 0.30
- Tiempo de ejecución de JavaScript: 0.30
- Total Blocking Time: 0.25
- Número de requests: 0.15

Fórmula:
```
index =
JS_kb_norm * 0.30 +
JS_exec_norm * 0.30 +
TBT_norm * 0.25 +
REQ_norm * 0.15
```

El resultado es un valor entre `0` y `1`, donde **un valor menor indica mayor eficiencia relativa**, siempre dentro del conjunto comparado.

Este índice **no representa eficiencia energética absoluta**.

---

### Métricas derivadas

Además del índice, el script calcula métricas derivadas no normalizadas, utilizadas para análisis e interpretación:

- JavaScript por elemento renderizado (KB/elemento)
- Tiempo de ejecución JS por elemento (ms/elemento)
- Requests por elemento

Estas métricas permiten evaluar **escalabilidad y costo marginal**, pero no influyen en el índice.

---

### Salidas del script

El script genera los siguientes artefactos:

- JSON normalizado por aplicación
- Tablas comparativas en formato Markdown
- Exportaciones opcionales en CSV

Estos resultados son utilizados para documentación, análisis técnico y comparación entre frameworks.

---

### Qué no hace el script

El script de normalización **no**:

- Mide rendimiento.
- Recolecta métricas desde el navegador.
- Modifica resultados originales.
- Ajusta pesos o métricas según resultados observados.
- Realiza inferencias directas sobre consumo energético o emisiones.

---

### Nota metodológica

> *El script de normalización de Faba aplica técnicas estándar de benchmarking de sistemas para facilitar la comparación relativa entre aplicaciones frontend. Todas las decisiones de normalización, ponderación y agregación están explícitamente documentadas y versionadas.*


---



# Ejemplo de salida JSON
```
{
  "meta": {
    "benchmarkVersion": "1.0.0",
    "framework": "react",
    "frameworkVersion": "18.3.0",
    "uiLibrary": "chakra-ui",
    "uiLibraryVersion": "2.8.0",
    "buildTool": "vite",
    "buildMode": "production",
    "appVariant": "light",
    "runs": 20,
    "runTimestamp": "2025-12-15T22:40:00Z"
  },

  "environment": {
    "browser": "Chrome",
    "browserVersion": "121.0",
    "platform": "Linux x86_64",
    "hardwareConcurrency": 8,
    "deviceMemoryGB": 16,
    "connection": {
      "effectiveType": "3g",
      "downlinkMbps": 1.5,
      "rttMs": 300
    }
  },

  "scenario": {
    "dataSource": "randomuser.me",
    "recordsRendered": 100,
    "layout": "grid-4-columns",
    "measurementEndCondition": "initial-render-complete-and-no-long-tasks-for-200ms"
  },

  "network": {
    "totalTransferredKB": {
      "mean": 342,
      "std": 18
    },
    "requests": {
      "mean": 26,
      "std": 2
    },
    "jsBundleKB": {
      "mean": 198,
      "std": 9
    },
    "cssBundleKB": {
      "mean": 44,
      "std": 4
    }
  },

  "performance": {
    "FCPms": {
      "mean": 912,
      "std": 47
    },
    "LCPms": {
      "mean": 1340,
      "std": 62
    },
    "TTIms": {
      "mean": 1820,
      "std": 95
    }
  },

  "execution": {
    "jsExecutionTimeMs": {
      "mean": 412,
      "std": 26
    },
    "longTasks": {
      "count": {
        "mean": 6,
        "std": 1
      },
      "totalBlockingTimeMs": {
        "mean": 284,
        "std": 21
      },
      "maxLongTaskMs": {
        "mean": 92,
        "std": 8
      }
    }
  },

  "memory": {
    "jsHeapUsedMB": {
      "mean": 46.2,
      "std": 3.1
    },
    "note": "Memory API available only on Chromium-based browsers"
  },

  "derivedMetrics": {
    "jsPerRecordKB": 1.98,
    "jsExecutionPerRecordMs": 4.12,
    "requestsPerRecord": 0.26
  },

  "summary": {
    "relativeEfficiencyIndex": {
      "value": 0.42,
      "method": "weighted-normalized-index",
      "lowerIsBetter": true
    },
    "statistics": {
      "runs": 20,
      "aggregation": "mean",
      "includesStdDeviation": true
    }
  }
}
```