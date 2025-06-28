// Cliente para llamar a la API Gemini vía el endpoint Next.js
export async function mejorarHtmlConGemini(html: string): Promise<string> {
  const res = await fetch('/api/gemini', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ html }),
  });
  const text = await res.text();
  if (!text) throw new Error('Respuesta vacía de Gemini');
  let data;
  try {
    data = JSON.parse(text);
  } catch (e) {
    throw new Error('Respuesta no es JSON válido: ' + text);
  }
  if (data.html) return data.html;
  throw new Error(data.error || 'Error usando Gemini');
}

