export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { titolo, data, descrizione, immagine } = req.body;

    const webhookUrl = "https://discord.com/api/webhooks/1233450953970024469/Ulh5vwsR6454m2fQGHoylEllOb9JmXoawWKpWAyvOqjxO_nGTfVo-aHXNN7odbZF9JQL";

    const linkBacheca = "https://suncitygdr.infinityfreeapp.com";

    const payload = {
      content: `🔗 Vai alla Bacheca: ${linkBacheca}`,
      embeds: [
        {
          title: titolo || "Titolo non disponibile",
          description: descrizione || "Descrizione non disponibile",
          fields: [
            { name: "Data", value: data || "Non specificata", inline: true }
          ],
          image: immagine ? { url: immagine } : undefined,
          color: 0x3498db
        }
      ]
    };

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const text = await response.text();
      return res.status(500).json({ error: text });
    }

    return res.status(200).json({ success: true });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
