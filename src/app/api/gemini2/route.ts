// Cambio menor para forzar redeploy en Vercel
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  // --- DEBUG BLOCK INICIO ---
  try {
    const body = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'Falta GEMINI_API_KEY', debug: { apiKey: 'MISSING', env: process.env } }, { status: 500 });
    }
    // Aquí iría tu lógica normal de llamada a Gemini...
    // Simula respuesta vacía:
    // return NextResponse.json({ error: 'No se obtuvo respuesta de Gemini', debug: { apiKey: 'OK', body } }, { status: 500 });
  } catch (e: any) {
    return NextResponse.json({ error: 'Error en el handler', debug: { message: e.message, stack: e.stack } }, { status: 500 });
  }
  // --- DEBUG BLOCK FIN ---
  // Si por alguna razón se sale del try/catch:
  return NextResponse.json({ error: 'Fin de función sin respuesta', debug: {} }, { status: 500 });
  const { html } = await req.json();
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'Gemini API Key not set' }, { status: 500 });
  }

  // Prepara el prompt para Gemini
  const prompt = `Corrige y mejora el siguiente código HTML para que sea profesional, académico, y renderice bien ecuaciones, tablas y figuras. Si hay ecuaciones en LaTeX, conviértelas a MathML o HTML con MathJax. Devuelve solo el HTML corregido.\n\n${html}`;

  try {
    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=' + apiKey, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      }),
    });
    let data: any = null;
    let text = '';
    try {
      text = await response.text();
      data = text ? JSON.parse(text) : null;
    } catch (err) {
      return NextResponse.json({ error: 'Respuesta no es JSON válido', raw: text }, { status: 500 });
    }
    if (!response.ok) {
      return NextResponse.json({
        error: 'Error HTTP de Gemini',
        status: response.status,
        body: data,
        debug: {
          apiKey: apiKey ? apiKey.slice(0, 6) + '...' : 'undefined',
          prompt: prompt.slice(0, 300),
          promptLength: prompt.length,
          raw: text,
        }
      }, { status: response.status });
    }
    const result = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
    if (!result) {
      return NextResponse.json({
        error: 'Respuesta vacía de Gemini',
        debug: {
          apiKey: apiKey ? apiKey.slice(0, 6) + '...' : 'undefined',
          prompt: prompt.slice(0, 300),
          promptLength: prompt.length,
          raw: text,
        }
      }, { status: 500 });
    }
    return NextResponse.json({ html: result });
  } catch (error) {
    return NextResponse.json({
      error: 'Error comunicando con Gemini',
      details: String(error),
      debug: {
        apiKey: apiKey ? apiKey.slice(0, 6) + '...' : 'undefined',
        prompt: prompt.slice(0, 300),
        promptLength: prompt.length,
      }
    }, { status: 500 });
  }
}
