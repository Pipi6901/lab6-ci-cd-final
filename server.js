const express = require('express');
const { calculateTicket } = require('./priceCalculator');

const app = express();
app.use(express.json());
app.use(express.static('public'));

app.post('/api/ticket', (req, res) => {
  const result = calculateTicket(req.body);
  return res.status(result.status).json(result.body);
});

const PORT = process.env.PORT || 3000;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Сервер запущен: http://localhost:${PORT}`);
  });
}

module.exports = app;
