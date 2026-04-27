Feature: Usuarios

  Scenario: Obtener un usuario por ID
    When se envía un GET a "/users/1"
    Then el response status es 200
    And el response contiene el campo "firstName"
