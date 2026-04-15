const passengers = {
  AB123456: { loyalty: 10 },
  CD789012: { loyalty: 20 },
  EF345678: { loyalty: 0 },
};

const BASE_PRICE_ECONOMY = 5000;
const BASE_PRICE_BUSINESS = 12000;
const BAGGAGE_LIMIT = 23;
const BAGGAGE_FEE = 150;

function calculateTicket({ passport, flightClass, baggage }) {
  if (!passport || passport.trim() === '') {
    return { status: 400, body: { error: 'Введите номер паспорта' } };
  }
  if (!passengers[passport]) {
    return { status: 404, body: { error: 'Пассажир не найден. Проверьте номер паспорта.' } };
  }
  if (!flightClass || flightClass === '') {
    return { status: 400, body: { error: 'Выберите класс перевозки' } };
  }
  if (!['economy', 'business'].includes(flightClass)) {
    return { status: 400, body: { error: 'Некорректный класс перевозки' } };
  }
  if (baggage === undefined || baggage === null || baggage === '') {
    return { status: 400, body: { error: 'Введите вес багажа' } };
  }

  const baggageNumber = Number(baggage);
  if (Number.isNaN(baggageNumber)) {
    return { status: 400, body: { error: 'Вес багажа должен быть числом' } };
  }
  if (baggageNumber < 0) {
    return { status: 400, body: { error: 'Вес багажа не может быть отрицательным' } };
  }

  const basePrice = flightClass === 'business' ? BASE_PRICE_BUSINESS : BASE_PRICE_ECONOMY;
  const overweight = Math.max(0, baggageNumber - BAGGAGE_LIMIT);
  const baggageFee = overweight * BAGGAGE_FEE;
  const loyalty = passengers[passport].loyalty;
  const discount = Math.round((basePrice + baggageFee) * loyalty / 100);
  const totalPrice = basePrice + baggageFee - discount;

  return {
    status: 200,
    body: { totalPrice, basePrice, baggageFee, discount, loyalty, overweight },
  };
}

module.exports = {
  calculateTicket,
  passengers,
  BASE_PRICE_ECONOMY,
  BASE_PRICE_BUSINESS,
  BAGGAGE_LIMIT,
  BAGGAGE_FEE,
};
