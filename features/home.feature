 Scenario: Visualizar detalle de producto
    When el usuario hace click en un producto
    Then se muestra la pantalla de detalle del producto    

  Scenario: Volver al listado desde detalle
    Given el usuario está en el detalle de un producto
    When hace click en "Back to products"
    Then regresa al listado de productos

  Scenario: Ordenar productos por precio ascendente
    When el usuario selecciona "Price (low to high)"
    Then los productos se ordenan de menor a mayor precio
    