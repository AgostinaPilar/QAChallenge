Feature: Productos

  Scenario: Obtener un producto por ID
    When se envía un GET a "/products/1"
    Then el response status es 200
    And el response contiene el campo "title"

  Scenario: Crear un nuevo producto
    When se envía un POST a "/products/add" con body:
      """
      { "title": "Producto Test", "price": 99.99 }
      """
    Then el response status es 201
    And el response contiene el campo "id"

  Scenario: Obtener producto inexistente
    When se envía un GET a "/products/99999"
    Then el response status es 404
