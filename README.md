# 🧪 QA Automation Challenge – VMETRIX

## 📌 Descripción

Este repositorio contiene la resolución del challenge de QA Automation utilizando pruebas **UI automatizadas** sobre la aplicación:

👉 https://www.saucedemo.com

Se implementó un framework basado en **Page Object Model (POM)** utilizando Playwright con TypeScript.

---

## 🚀 Tecnologías utilizadas

* Playwright
* TypeScript
* Node.js
* HTML Reports (Playwright)

---

## 📁 Estructura del proyecto

```
qa-challenge/
│
├── features/
│   ├── checkout.feature
│   └── cart.feature
│
├── steps/
│   ├── common.steps.ts
│   ├── cart.steps.ts
│   └── checkout.steps.ts
│
├── pages/
│   ├── LoginPage.ts
│   ├── InventoryPage.ts
│   ├── CartPage.ts
│   └── CheckoutPage.ts
│
├── support/
│   └── world.ts
│
├── playwright.config.ts
├── cucumber.js
└── package.json
```

---

## ⚙️ Instalación

Clonar el repositorio:

```
git clone <repo-url>
cd qa-challenge
```

Instalar dependencias:

```
npm install
```

Instalar navegadores:

```
npx playwright install
```

---

## ▶️ Ejecución de tests

Ejecutar todos los tests:

```
npx playwright test
```

Ejecutar en modo UI:

```
npx playwright test --ui
```

---

## 📊 Reporte de ejecución

Generar y visualizar reporte:

```
npx playwright show-report
```

👉 Se genera un reporte HTML con el detalle de ejecución de los tests.

---

## 🧪 Casos automatizados

Se automatizaron los siguientes escenarios:

* ✔️ Agregar producto al carrito
* ✔️ Remover producto del carrito
* ✔️ Checkout exitoso
* ✔️ Validación de error en checkout (datos incompletos)
* ✔️ Ordenamiento de productos

---

## 🧠 Enfoque

* Implementación basada en **Page Object Model (POM)** para mejorar la mantenibilidad
* Separación de responsabilidades entre páginas y tests
* Cobertura de escenarios positivos y negativos
* Código limpio y reutilizable

---

## 🌐 API Testing

Se diseñaron y automatizaron pruebas sobre:

👉 https://dummyjson.com

Cubriendo:

* Autenticación
* Productos (GET, POST, PUT, DELETE)
* Usuarios

---

## 📌 Consideraciones finales

El objetivo fue construir una solución simple pero escalable, aplicando buenas prácticas de automatización y testing.

---
