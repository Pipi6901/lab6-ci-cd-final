Feature: API расчёта стоимости авиабилета
  Scenario: Успешный расчёт стоимости билета
    When I send POST request to "/api/ticket" with body:
      """
      {
        "passport": "AB123456",
        "flightClass": "economy",
        "baggage": 20
      }
      """
    Then response status should be 200
    And response field "totalPrice" should be 4500

  Scenario: Ошибка при неизвестном пассажире
    When I send POST request to "/api/ticket" with body:
      """
      {
        "passport": "ZZ999999",
        "flightClass": "economy",
        "baggage": 20
      }
      """
    Then response status should be 404
    And response field "error" should be "Пассажир не найден. Проверьте номер паспорта."
