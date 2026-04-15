const { calculateTicket } = require('../priceCalculator');

describe('Unit: calculateTicket', () => {
  test('Корректно считает эконом с лояльностью', () => {
    const result = calculateTicket({ passport: 'AB123456', flightClass: 'economy', baggage: 20 });
    expect(result.status).toBe(200);
    expect(result.body.totalPrice).toBe(4500);
    expect(result.body.discount).toBe(500);
    expect(result.body.baggageFee).toBe(0);
  });

  test('Корректно считает перевес багажа', () => {
    const result = calculateTicket({ passport: 'AB123456', flightClass: 'economy', baggage: 35 });
    expect(result.status).toBe(200);
    expect(result.body.overweight).toBe(12);
    expect(result.body.baggageFee).toBe(1800);
    expect(result.body.totalPrice).toBe(6120);
  });

  test('Возвращает ошибку для отрицательного багажа', () => {
    const result = calculateTicket({ passport: 'AB123456', flightClass: 'economy', baggage: -5 });
    expect(result.status).toBe(400);
    expect(result.body.error).toBe('Вес багажа не может быть отрицательным');
  });
});
