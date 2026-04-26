Feature: Carrito de compras

  Scenario: Agregar un producto al carrito
    Given el usuario está logueado
    When el usuario hace click en "Add to cart" de un producto
    Then el producto se agrega al carrito
    And el contador del carrito se actualiza

  Scenario: Remover producto del carrito
    Given el usuario está logueado
    And el usuario tiene un producto en el carrito
    When hace click en "Remove"
    Then el producto se elimina del carrito

  Scenario: Visualizar cantidad correcta en carrito
    Given el usuario está logueado
    When el usuario agrega múltiples productos
    Then el carrito muestra la cantidad correcta de productos

  Scenario: Acceder al carrito
    Given el usuario está logueado
    When el usuario hace click en el icono del carrito
    Then se muestra la página del carrito
