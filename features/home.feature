Feature: Página principal

  Scenario: Visualizar detalle de producto
    Given el usuario está logueado
    When el usuario hace click en un producto
    Then se muestra la pantalla de detalle del producto
