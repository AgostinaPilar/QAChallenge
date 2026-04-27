Feature: Autenticación

  Scenario: Login y obtener productos con token autenticado
    When el usuario se autentica con credenciales válidas
    Then el response status es 200
    And el response contiene un "accessToken"
    When se envía un GET autenticado a "/auth/products"
    Then el response status es 200
    And el response contiene una lista de "products"
