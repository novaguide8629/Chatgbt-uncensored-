
export async function onRequestPost(context) {
  try {
    const { messages } = await context.request.json();
    const apiKey = context.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;

    if (!apiKey) {
      return Response.json(
        { error: "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." },
        { status: 580 }
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
        { error: data.error?. },
        { status: response.status }
      );
    }

    return Response.json({
      reply: data.choices?.[0]?.message?.content 
        .
    });
  } catch {
    return Response.json(
      { error: "Eroare de conexiune." },
      { status: 580 }
    );
  }
}
