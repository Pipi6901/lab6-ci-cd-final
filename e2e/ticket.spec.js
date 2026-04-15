const { test, expect } = require('@playwright/test');
const TicketPage = require('./pages/TicketPage');

test.describe('Расчёт стоимости авиабилета', () => {
  let ticketPage;

  test.beforeEach(async ({ page }) => {
    ticketPage = new TicketPage(page);
    await ticketPage.navigate();
  });

  test('Расчёт для пассажира с уровнем лояльности (эконом)', async () => {
    await ticketPage.setPassport('AB123456');
    await ticketPage.selectClass('economy');
    await ticketPage.setBaggage('20');
    await ticketPage.calculate();
    const msg = await ticketPage.getSuccessMessage();
    expect(msg).toContain('руб.');
  });

  test('Доплата за перевес багажа', async () => {
    await ticketPage.setPassport('AB123456');
    await ticketPage.selectClass('economy');
    await ticketPage.setBaggage('35');
    await ticketPage.calculate();
    const msg = await ticketPage.getSuccessMessage();
    expect(msg).toContain('руб.');
  });

  test('Применение коэффициента бизнес-класса', async () => {
    await ticketPage.setPassport('AB123456');
    await ticketPage.selectClass('business');
    await ticketPage.setBaggage('10');
    await ticketPage.calculate();
    const msg = await ticketPage.getSuccessMessage();
    expect(msg).toContain('руб.');
  });

  test('Несуществующий номер паспорта → ошибка', async () => {
    await ticketPage.setPassport('INVALID999');
    await ticketPage.selectClass('economy');
    await ticketPage.setBaggage('10');
    await ticketPage.calculate();
    const err = await ticketPage.getErrorMessage();
    expect(err).toBeTruthy();
  });

  test('Отрицательный вес багажа → ошибка', async () => {
    await ticketPage.setPassport('AB123456');
    await ticketPage.selectClass('economy');
    await ticketPage.setBaggage('-5');
    await ticketPage.calculate();
    const err = await ticketPage.getErrorMessage();
    expect(err).toBeTruthy();
  });

  test('Невыбранный класс перевозки → ошибка', async () => {
    await ticketPage.setPassport('AB123456');
    await ticketPage.setBaggage('10');
    await ticketPage.calculate();
    const err = await ticketPage.getErrorMessage();
    expect(err).toBeTruthy();
  });

  test('Нечисловое значение веса → ошибка', async () => {
    await ticketPage.setPassport('AB123456');
    await ticketPage.selectClass('economy');
    await ticketPage.setBaggage('abc');
    await ticketPage.calculate();
    const err = await ticketPage.getErrorMessage();
    expect(err).toBeTruthy();
  });

  test('Data-Driven: разные значения веса багажа', async ({ page }) => {
    const cases = [
      { baggage: 0, shouldSucceed: true },
      { baggage: 10, shouldSucceed: true },
      { baggage: 23, shouldSucceed: true },
    ];

    for (const { baggage, shouldSucceed } of cases) {
      const tp = new TicketPage(page);
      await tp.navigate();
      await tp.setPassport('AB123456');
      await tp.selectClass('economy');
      await tp.setBaggage(String(baggage));
      await tp.calculate();

      if (shouldSucceed) {
        const msg = await tp.getSuccessMessage();
        expect(msg).toContain('руб.');
      } else {
        const err = await tp.getErrorMessage();
        expect(err).toBeTruthy();
      }
    }
  });
});
