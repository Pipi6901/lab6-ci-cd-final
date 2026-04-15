class TicketPage {
  constructor(page) {
    this.page = page;
    this.passportInput = '#passport';
    this.flightClassSelect = '#flightClass';
    this.baggageInput = '#baggage';
    this.calculateBtn = '#calculateBtn';
    this.resultArea = '#resultArea';
  }

  async navigate() {
    await this.page.goto('http://localhost:3000');
  }

  async setPassport(value) {
    await this.page.fill(this.passportInput, String(value));
  }

  async selectClass(value) {
    await this.page.selectOption(this.flightClassSelect, value);
  }

  async setBaggage(value) {
    await this.page.fill(this.baggageInput, String(value));
  }

  async calculate() {
    await this.page.click(this.calculateBtn);
  }

  async getSuccessMessage() {
    const el = this.page.locator('.success');
    await el.waitFor({ state: 'visible' });
    return el.textContent();
  }

  async getErrorMessage() {
    const el = this.page.locator('.error');
    await el.waitFor({ state: 'visible' });
    return el.textContent();
  }
}

module.exports = TicketPage;
