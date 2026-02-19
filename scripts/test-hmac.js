/**
 * Script de prueba de estrés para validación HMAC (SEC-001)
 * Simula envío de payload con firma alterada
 */

const crypto = require('crypto');

const WEBHOOK_SECRET = 'tu_secreto_temporal_aqui';
const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

// Payload de prueba
const payload = JSON.stringify({
  order_id: 'test-123',
  amount: 20000,
  currency: 'CLP',
  timestamp: new Date().toISOString()
});

// Generar firma válida
const validSignature = crypto
  .createHmac('sha256', WEBHOOK_SECRET)
  .update(payload)
  .digest('hex');

// Generar firma alterada (simulando ataque)
const alteredSignature = crypto
  .createHmac('sha256', 'clave_incorrecta')
  .update(payload)
  .digest('hex');

console.log('=== PRUEBA DE ESTRÉS HMAC (SEC-001) ===\n');
console.log('Payload de prueba:', payload);
console.log('\nFirma válida:', validSignature.substring(0, 20) + '...');
console.log('Firma alterada:', alteredSignature.substring(0, 20) + '...');

async function testWebhook(signature, description) {
  console.log(`\n--- ${description} ---`);
  
  try {
    const response = await fetch(`${BASE_URL}/api/webhooks/payment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-signature': signature
      },
      body: payload
    });
    
    const result = await response.json();
    
    console.log('Status:', response.status);
    console.log('Response:', result);
    
    if (response.status === 401) {
      console.log('✅ COMPORTAMIENTO CORRECTO: Firma inválida rechazada');
    } else if (response.status === 200) {
      console.log('✅ COMPORTAMIENTO CORRECTO: Firma válida aceptada');
    } else {
      console.log('⚠️ Status inesperado');
    }
    
  } catch (error) {
    console.error('❌ Error en la petición:', error.message);
    console.log('Nota: Asegúrate de que el servidor esté corriendo en', BASE_URL);
  }
}

async function runTests() {
  // Test 1: Firma alterada (debe rechazar)
  await testWebhook(alteredSignature, 'TEST 1: Firma ALTERADA (simulación de ataque)');
  
  // Test 2: Firma válida (debe aceptar)
  await testWebhook(validSignature, 'TEST 2: Firma VÁLIDA (flujo normal)');
  
  // Test 3: Sin firma (debe rechazar)
  console.log('\n--- TEST 3: Sin firma ---');
  try {
    const response = await fetch(`${BASE_URL}/api/webhooks/payment`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: payload
    });
    const result = await response.json();
    console.log('Status:', response.status);
    console.log('Response:', result);
    if (response.status === 401) {
      console.log('✅ COMPORTAMIENTO CORRECTO: Petición sin firma rechazada');
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
  
  console.log('\n=== FIN DE PRUEBAS ===');
  console.log('\nVerifica los logs del servidor.');
  console.log('Debe mostrar "Firma inválida" sin exponer el payload completo.');
}

runTests();
