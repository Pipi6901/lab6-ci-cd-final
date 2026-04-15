document.getElementById('calculateBtn').addEventListener('click', async () => {
  const passport = document.getElementById('passport').value.trim();
  const flightClass = document.getElementById('flightClass').value;
  const baggage = document.getElementById('baggage').value;
  const resultArea = document.getElementById('resultArea');

  resultArea.innerHTML = '';

  try {
    const response = await fetch('http://localhost:3000/api/ticket', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ passport, flightClass, baggage: Number(baggage) })
    });

    const data = await response.json();

    if (!response.ok) {
      resultArea.innerHTML = `<div class="error">${data.error}</div>`;
    } else {
      resultArea.innerHTML = `<div class="success">Итоговая стоимость: ${data.totalPrice} руб.</div>`;
    }
  } catch (e) {
    resultArea.innerHTML = `<div class="error">Ошибка соединения с сервером</div>`;
  }
});
