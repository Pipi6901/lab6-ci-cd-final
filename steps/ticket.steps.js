const assert = require('assert');
const { Before, When, Then } = require('@cucumber/cucumber');

Before(function () {
  this.response = null;
  this.data = null;
});

When('I send POST request to {string} with body:', async function (path, docString) {
  this.response = await fetch(`http://127.0.0.1:3000${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: docString,
  });
  this.data = await this.response.json();
});

Then('response status should be {int}', function (statusCode) {
  assert.strictEqual(this.response.status, statusCode);
});

Then('response field {string} should be {int}', function (field, value) {
  assert.strictEqual(this.data[field], value);
});

Then('response field {string} should be {string}', function (field, value) {
  assert.strictEqual(this.data[field], value);
});
