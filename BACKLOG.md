# BACKLOG — pao-alpha

Bugs y tareas fuera del alcance del sprint actual, documentados para no perderlos.

## Deuda técnica

- **`scripts/test-hmac.js` — error de lint (`@typescript-eslint/no-require-imports`).**
  Usa `require()` estilo CommonJS, prohibido por la config de ESLint. Se deja
  intacto: es un script de testing del esquema HMAC actual, que queda **obsoleto
  cuando la Fase 1.3 reemplace la validación HMAC genérica por la firma oficial
  de Mercado Pago** (`x-signature` / manifest). Reevaluar (migrar a ESM o
  eliminar junto con el webhook viejo) al ejecutar la Fase 1.3.

- **`push-to-github.bat` obsoleto.** Apunta al repo antiguo `paolarioseco`, sin
  secretos. Borrar (fuera de alcance de este sprint; ver AUDITORIA-V2 §1).
