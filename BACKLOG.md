# BACKLOG — pao-alpha

Bugs y tareas fuera del alcance del sprint actual, documentados para no perderlos.

## Deuda técnica

- ~~**`scripts/test-hmac.js` — error de lint.**~~ RESUELTO en la Fase 1.3: el
  script probaba el esquema HMAC genérico (firma del body completo) que ya no
  existe, así que se eliminó junto con el webhook viejo. Con eso el lint queda
  sin errores. La validación de la firma de MP se prueba con el simulador de
  notificaciones de Tus integraciones > Webhooks (Fase 3).

- **`push-to-github.bat` obsoleto.** Apunta al repo antiguo `paolarioseco`, sin
  secretos. Borrar (fuera de alcance de este sprint; ver AUDITORIA-V2 §1).
