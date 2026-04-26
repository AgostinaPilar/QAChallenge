# 🧪 QA Automation Challenge – VMETRIX

## 📌 Descripción

Este repositorio contiene la resolución del challenge de QA Automation utilizando pruebas **UI automatizadas** sobre la aplicación:

👉 https://www.saucedemo.com

Se implementó un framework basado en **Cucumber + Playwright + Page Object Model (POM)** con TypeScript, reportes con **Allure** y logs detallados en consola.

---

## 🚀 Tecnologías utilizadas

* Cucumber (BDD / Gherkin)
* Playwright
* TypeScript
* Node.js
* Allure Reports
* Page Object Model (POM)

---

## 📁 Estructura del proyecto

```
vmetrixChallenge/
│
├── features/                  # Archivos .feature (Gherkin)
│   ├── cart.feature
│   ├── chekout.feature
│   └── home.feature
│
├── steps/                     # Step definitions (Cucumber)
│   ├── common.ts              # Hooks (Before/After) + login
│   ├── cart.ts
│   ├── checkout.ts
│   └── home.ts
│
├── pages/                     # Page Objects (POM)
│   ├── LoginPage.ts
│   ├── InventoryPage.ts
│   ├── CartPage.ts
│   └── CheckoutPage.ts
│
├── support/
│   ├── world.ts               # CustomWorld (browser/page)
│   ├── allureSetup.ts         # Setup del runtime de Allure
│   └── formatters/
│       └── prettyStepFormatter.js  # Formatter custom para consola
│
├── utils/
│   └── allureLogger.ts        # Helper para Allure (sub-steps + attachments)
│
├── cucumber.js                # Configuración de Cucumber
├── tsconfig.json
├── package.json
└── README.md
```

---

## ⚙️ Instalación

Clonar el repositorio:

```bash
git clone <repo-url>
cd vmetrixChallenge
```

Instalar dependencias:

```bash
npm install
```

Instalar navegadores de Playwright:

```bash
npx playwright install
```

Instalar Allure CLI (para reportes):

```bash
brew install allure
```

---

## ▶️ Ejecución de tests

Ejecutar todos los tests:

```bash
npm run test:cucumber
```

Ejecutar un caso específico:

```bash
npx cucumber-js --name "Agregar un producto al carrito"
```

Ejecutar todos los tests + abrir reporte Allure:

```bash
npm run allure:report
```

Ejecutar un caso específico + abrir reporte Allure:

```bash
rm -rf allure-results allure-report && npx cucumber-js --name "Agregar un producto al carrito" && npm run allure:generate && npm run allure:open
```

---

## 📊 Reporte Allure

Generar reporte:

```bash
npm run allure:generate
```

Abrir reporte:

```bash
npm run allure:open
```

---

## 🧪 Casos automatizados

### 🛒 Carrito (cart.feature)

* ✔️ Agregar un producto al carrito
* ✔️ Remover producto del carrito
* ✔️ Visualizar cantidad correcta en carrito
* ✔️ Acceder al carrito

### 💳 Checkout (chekout.feature)

* ✔️ Completar compra exitosamente
* ✔️ Error al omitir First Name en checkout
* ✔️ Error al omitir Postal Code en checkout

### 🏠 Página principal (home.feature)

* ✔️ Visualizar detalle de producto
* ✔️ Volver al listado desde detalle
* ✔️ Ordenar productos por precio ascendente

---

## 📋 Ejemplo de output en consola

```
Feature: Checkout
  Scenario: Completar compra exitosamente

    ✔ Given el usuario está logueado  [2 sub-steps]  685ms
        Navegando a saucedemo.com  567ms
        Ingresando credenciales: standard_user  118ms
    ✔ And el usuario tiene productos en el carrito  [2 sub-steps]  94ms
        Agregando primer producto al carrito  17ms
        Navegando al carrito  74ms
    ✔ When accede al checkout  [1 sub-step]  66ms
        Haciendo click en Checkout  65ms
    ✔ And completa los datos personales  [1 sub-step]  89ms
        Completando formulario: Test User, ZIP 1234  89ms
    ✔ And confirma la compra  [1 sub-step]  65ms
        Confirmando compra con Finish  65ms
    ✔ Then la orden se procesa correctamente  [1 sub-step]  5ms
        Verificando mensaje de orden completada  5ms

────────────────────────────────────
  ✔ 1 passed
  Total: 1 scenarios
────────────────────────────────────
```

---

## 🧠 Enfoque

* **BDD con Cucumber**: escenarios escritos en Gherkin en español
* **Page Object Model (POM)**: separación de selectores y lógica de páginas
* **Allure Reports**: reportes detallados con sub-steps, screenshots y tiempos
* **Custom Formatter**: output en consola con detalle de cada step y resumen final
* Cobertura de escenarios positivos y negativos

---

## 📌 Consideraciones finales

El objetivo fue construir una solución simple pero escalable, aplicando buenas prácticas de automatización y testing.

---
