export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { titolo, data, descrizione } = req.body;

    const webhookUrl = "https://discord.com/api/webhooks/1233450953970024469/Ulh5vwsR6454m2fQGHoylEllOb9JmXoawWKpWAyvOqjxO_nGTfVo-aHXNN7odbZF9JQL";

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: `📌 Nuovo Evento!\n\nTitolo: ${titolo}\nData: ${data}\nDescrizione: ${descrizione}`
      })
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
