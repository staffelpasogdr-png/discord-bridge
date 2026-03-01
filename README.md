export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { titolo, data, descrizione } = req.body;

  const webhookUrl = "INCOLLA_QUI_IL_TUO_WEBHOOK_DISCORD";

  const message = {
    content: `📌 Nuovo Evento Creato!
Titolo: ${titolo}
Data: ${data}
Descrizione: ${descrizione}`
  };

  try {
    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(message),
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ error: "Errore invio notifica" });
  }
}
