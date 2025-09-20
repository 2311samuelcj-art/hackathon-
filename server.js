const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static(__dirname));

// ✅ Replace with your actual Gemini API key
const GEMINI_API_KEY = AIzaSyDQ2IH9dC9pWMChEywoDTEnzL5XuzED94E;

app.post('/ask', async (req, res) => {
  const question = req.body.question;

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: question }]
          }
        ]
      })
    });

    const data = await response.json();
    const answer = data.candidates?.[0]?.content?.parts?.[0]?.text || "No answer received.";
    res.json({ answer });
  } catch (error) {
    console.error('Gemini error:', error.message);
    res.status(500).json({ answer: 'Error fetching answer from Gemini.' });
  }
});

app.listen(port, () => {
  console.log(`Gemini server running at http://localhost:${port}`);
});

