# 🧪 QA Automation Challenge – VMETRIX

## 📌 Descripción

Este repositorio contiene la resolución del challenge de QA Automation utilizando pruebas **UI automatizadas** y **API automatizadas**.

* 🖥️ UI: https://www.saucedemo.com
* 🌐 API: https://dummyjson.com

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
├── features/                  # Archivos .feature UI (Gherkin)
│   ├── cart.feature
│   ├── chekout.feature
│   └── home.feature
│
├── steps/                     # Step definitions UI
│   ├── common.ts
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
├── backend/                   # API Testing
│   ├── features/
│   │   ├── auth/
│   │   │   └── auth.feature
│   │   ├── products/
│   │   │   └── products.feature
│   │   └── users/
│   │       └── users.feature
│   ├── steps/
│   │   ├── common.steps.ts    # Validaciones compartidas
│   │   ├── auth.steps.ts
│   │   └── products.steps.ts
│   ├── support/
│   │   ├── apiWorld.ts        # World con APIRequestContext
│   │   ├── allureSetup.ts
│   │   └── hooks.ts
│   └── cucumber.js
│
├── support/
│   ├── world.ts
│   ├── allureSetup.ts
│   └── formatters/
│       └── prettyStepFormatter.js
│
├── utils/
│   └── allureLogger.ts
│
├── cucumber.js
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

### UI Tests

Ejecutar todos los tests UI:

```bash
npm run test:cucumber
```

Ejecutar un caso específico:

```bash
npx cucumber-js --name "Agregar un producto al carrito"
```

Ejecutar UI + abrir reporte Allure:

```bash
npm run allure:report
```

### API Tests

Ejecutar todos los tests API:

```bash
npm run test:api
```

Ejecutar API + abrir reporte Allure:

```bash
npm run allure:api
```

---

## 📊 Reportes Allure

### UI

```bash
npm run allure:generate
npm run allure:open
```

### API

```bash
npm run allure:api
```

---

## 🧪 Casos automatizados

### 🖥️ UI Tests (saucedemo.com)

#### 🛒 Carrito (cart.feature)

* ✔️ Agregar un producto al carrito
* ✔️ Remover producto del carrito

#### 💳 Checkout (chekout.feature)

* ✔️ Completar compra exitosamente
* ✔️ Error al omitir First Name en checkout

#### 🏠 Página principal (home.feature)

* ✔️ Visualizar detalle de producto

### 🌐 API Tests (dummyjson.com)

#### 🔐 Autenticación (auth.feature)

* ✔️ Login y obtener productos con token autenticado

#### 📦 Productos (products.feature)

* ✔️ Obtener un producto por ID
* ✔️ Crear un nuevo producto
* ✔️ Obtener producto inexistente

#### 👤 Usuarios (users.feature)

* ✔️ Obtener un usuario por ID

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
* Código limpio y reutilizable

---

## 📌 Consideraciones finales

El objetivo fue construir una solución simple pero escalable, aplicando buenas prácticas de automatización y testing.

---
