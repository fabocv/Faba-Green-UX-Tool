# 🛡️ Security Policy

Faba es una herramienta de auditoría de rendimiento. Nos tomamos muy en serio la seguridad de los entornos de prueba y la integridad de los datos recopilados durante los benchmarks.

## Supported Versions
Actualmente, solo proporcionamos actualizaciones de seguridad para las versiones estables más recientes. Al trabajar con frameworks de terceros (Angular, React, Vue, Svelte, Qwik), recomendamos mantener las dependencias de las `apps/` actualizadas.

| Version | Supported          |
| ------- | ------------------ |
| 1.3.x   | :white_check_mark: |
| 1.2.x   | :white_check_mark: |
| < 1.1   | :x:                |

## Reporting a Vulnerability
#### ¡No abras un Issue público para reportar una vulnerabilidad!

Si descubres un fallo de seguridad en el controlador de Faba, en el sistema de sockets o en la forma en que Puppeteer maneja los entornos de prueba, sigue estos pasos:

- **Envío del reporte**: Envía un mensaje a https://linkedin.com/in/fkatv con el asunto `[SECURITY VULNERABILITY] - Faba`.
- **Detalle**: Incluye una descripción detallada del fallo, pasos para reproducirlo y, si es posible, un ejemplo de código (PoC).
- **Respuesta:** Recibirás una confirmación de recepción en menos de **48 horas**.
- **Resolución:** Te mantendremos informado sobre el progreso del parche. Una vez solucionado, te daremos crédito en las notas de la versión (si así lo deseas).

## Our Security Commitments

- **Aislamiento de Tests:** Trabajamos para que cada benchmark corra en una instancia de navegador aislada para evitar fugas de datos entre sesiones.
- **Privacidad de Hardware:** Como discutimos en la v1.2, Faba recopila datos del sistema (CPU, RAM). Nos comprometemos a **no capturar información sensible** como nombres de usuario, direcciones IP o rutas de archivos personales en los reportes generados.
- **Dependencias**: Auditamos semanalmente las dependencias de Node.js mediante `npm audit` para mitigar vulnerabilidades en la cadena de suministro.
