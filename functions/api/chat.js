
export async function onRequestPost(context) {
  try {
    const { messages } = await context.request.json();
    const apiKey = context.env.OPENROUTER_API_KEY;

    if (!apiKey) {
      return Response.json(
        { error: "Lipsește cheia API OpenRouter." },
        { status: 500 }
      );
    }

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "openrouter/free",
          messages
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return Response.json(
        { error: data.error?.message || "Eroare la modelul AI." },
        { status: response.status }
      );
    }

    return Response.json({
      reply: data.choices?.[0]?.message?.content || "Nu am primit un răspuns."
    });
  } catch {
    return Response.json(
      { error: "Eroare de conexiune." },
      { status: 500 }
    );
  }
}
