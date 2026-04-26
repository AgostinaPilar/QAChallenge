Feature: Checkout

  Scenario: Completar compra exitosamente
    Given el usuario está logueado
    And el usuario tiene productos en el carrito
    When accede al checkout
    And completa los datos personales
    And confirma la compra
    Then la orden se procesa correctamente

  Scenario: Error al omitir First Name en checkout
    Given el usuario está logueado
    And el usuario está en el checkout
    When deja el campo First Name vacío
    And intenta continuar
    Then se muestra un mensaje de error

  Scenario: Error al omitir Postal Code en checkout
    Given el usuario está logueado
    And el usuario está en el checkout
    When deja el campo Postal Code vacío
    And intenta continuar
    Then se muestra un mensaje de error