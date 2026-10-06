export async function GET() {
  return new Response(
    JSON.stringify({msg: "Hello from the API route!"}), {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    } 
  )
}

import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ params, request }) => {
  // 1. Check if the content-type is actually JSON
  const contentType = request.headers.get("content-type");
  if (!contentType || !contentType.includes("application/json")) {
    return new Response(JSON.stringify({ error: "Expected JSON content-type" }), { status: 400 });
  }

  try {
    // 2. Read the raw text first to see if it's empty
    const rawBody = await request.text();
    if (!rawBody.trim()) {
      return new Response(JSON.stringify({ error: "Request body is empty" }), { status: 400 });
    }

    // 3. Parse safely inside the try block
    const data = JSON.parse(rawBody);

    // ... Your processing logic here (e.g., saving data, etc.) ...

    return new Response(JSON.stringify({ success: true, data }), { status: 200 });

  } catch (error) {
    // Catch malformed JSON syntax errors gracefully
    return new Response(JSON.stringify({ error: "Invalid JSON format" }), { status: 400 });
  }
};

