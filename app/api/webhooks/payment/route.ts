import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

/**
 * Webhook handler para procesar notificaciones de pago
 * Mandato SEC-001: Validación HMAC-SHA256 obligatoria
 * Mandato SEC-002: Sanitización de logs - Nunca loggear payload completo ni datos personales
 */

export async function POST(request: NextRequest) {
  try {
    // Obtener la firma del header
    const signature = request.headers.get('x-signature');
    
    if (!signature) {
      // SEC-002: Solo registrar estado de validación, nunca el payload
      console.log('[Webhook Payment] Firma inválida: Header x-signature ausente');
      return NextResponse.json(
        { error: 'Firma no proporcionada' },
        { status: 401 }
      );
    }

    // Obtener el secret del entorno
    const secret = process.env.PAYMENT_WEBHOOK_SECRET;
    
    if (!secret) {
      console.error('[Webhook Payment] Error de configuración: PAYMENT_WEBHOOK_SECRET no definido');
      return NextResponse.json(
        { error: 'Error de configuración del servidor' },
        { status: 500 }
      );
    }

    // Obtener el cuerpo raw de la petición
    const body = await request.text();
    
    if (!body) {
      console.log('[Webhook Payment] Firma inválida: Cuerpo de petición vacío');
      return NextResponse.json(
        { error: 'Cuerpo de petición vacío' },
        { status: 401 }
      );
    }

    // SEC-001: Validación HMAC-SHA256
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(body)
      .digest('hex');

    // Comparación timing-safe para prevenir timing attacks
    const isValid = crypto.timingSafeEqual(
      Buffer.from(signature, 'hex'),
      Buffer.from(expectedSignature, 'hex')
    );

    if (!isValid) {
      // SEC-002: Solo registrar estado de validación, nunca el payload ni datos sensibles
      console.log('[Webhook Payment] Firma inválida: Verificación HMAC fallida');
      return NextResponse.json(
        { error: 'Firma inválida' },
        { status: 401 }
      );
    }

    // Firma válida - procesar el webhook
    console.log('[Webhook Payment] Firma válida: Procesando notificación');

    // TODO: Aquí se procesaría la lógica de negocio
    // Por ejemplo: actualizar estado de orden, enviar confirmación, etc.
    // Importante: Nunca loggear el payload completo ni datos personales

    return NextResponse.json(
      { 
        success: true, 
        message: 'Webhook procesado correctamente',
        timestamp: new Date().toISOString()
      },
      { status: 200 }
    );

  } catch (error) {
    // SEC-002: En caso de error, solo registrar tipo de error, nunca datos del payload
    console.error('[Webhook Payment] Error interno del servidor:', 
      error instanceof Error ? error.message : 'Error desconocido'
    );
    
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

/**
 * Manejador para métodos no soportados
 */
export async function GET() {
  return NextResponse.json(
    { error: 'Método no permitido' },
    { status: 405 }
  );
}

export async function PUT() {
  return NextResponse.json(
    { error: 'Método no permitido' },
    { status: 405 }
  );
}

export async function DELETE() {
  return NextResponse.json(
    { error: 'Método no permitido' },
    { status: 405 }
  );
}

export async function PATCH() {
  return NextResponse.json(
    { error: 'Método no permitido' },
    { status: 405 }
  );
}
