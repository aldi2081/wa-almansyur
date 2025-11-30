const venom = require('venom-bot');
const express = require('express');
const app = express();

app.use(express.json());

let clientBot;

venom
  .create({
    session: 'session-bot',
    multidevice: true,
    headless: true,
  })
  .then(client => {
    clientBot = client;
    console.log('Bot siap!');
  })
  .catch(err => console.error(err));

app.post('/send', async (req, res) => {
  const { number, message } = req.body;

  if (!clientBot) {
    return res.json({ status: 'error', info: 'Bot belum siap' });
  }

  try {
    await clientBot.sendText(number + '@c.us', message);
    res.json({ status: 'success', info: 'Pesan dikirim' });
  } catch (e) {
    res.json({ status: 'error', info: e.toString() });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('API running on port ' + PORT));
