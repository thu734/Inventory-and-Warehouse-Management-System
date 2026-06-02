# Inventory-and-Warehouse-Management-System
# Warehouse Management System

React • Node.js • Express • PostgreSQL • Docker

A full-stack Warehouse Management System built with React, Express, and PostgreSQL. The system supports inventory management, stock transactions, warehouse operations, and analytical reporting.

---

## 📦 Required Software

Install the following before running the project:

| Software               | Purpose                               |
| ---------------------- | ------------------------------------- |
| Node.js (v18 or newer) | Run frontend and backend applications |
| Docker Desktop         | Run PostgreSQL database containers    |

### Verify Installation

```bash
node -v
npm -v
docker --version
```

---

# 🚀 Quick Start (Local Development)

Recommended setup:

1. Start PostgreSQL database with Docker
2. Run the backend server
3. Run the frontend client

---

## Step 1: Start the Database

Navigate to the database folder:

```bash
cd database
docker compose up -d
```

This starts PostgreSQL and initializes the database schema and sample data.

Database configuration:

| Setting  | Value        |
| -------- | ------------ |
| Host     | localhost    |
| Port     | 5432         |
| Database | warehouse_db |
| Username | postgres     |
| Password | postgres     |

> Update the values above if your docker configuration uses different credentials.

---

## Step 2: Run the Backend Server

Open a terminal:

```bash
cd server
npm install
npm run dev
```

Backend API:

```text
http://localhost:4000
```

Configure database connection inside:

```text
server/.env
```

Example:

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/warehouse_db
PORT=4000
```

---

## Step 3: Run the Frontend Client

Open another terminal:

```bash
cd client
npm install
npm run dev
```

Frontend:

```text
http://localhost:5173
```

Configure API URL if needed:

```env
VITE_API_BASE=http://localhost:4000
```

---

# 🐳 Run Entire Application with Docker

To run database, backend, and frontend together:

```bash
# Wipes out all new transactions and resets back to the original assignment seeds
docker-compose down -v
docker-compose up --build
```

Useful commands:

```bash
docker compose ps
docker compose logs -f
docker compose down
```

---

# 🎯 Features

## Master Data Management

* Product Types Management
* Units Management
* Warehouses Management
* Suppliers Management
* Customers Management
* Products Management

### Supported Operations

* Create
* View
* Update
* Delete
* Search
* Filter

---

## Inventory Transactions

### Stock Purchase

* Create purchase transactions
* Receive inventory into warehouses
* Maintain supplier references
* Multiple line items per transaction

### Stock Sales

* Create sales transactions
* Issue inventory from warehouses
* Maintain customer references
* Multiple line items per transaction

### Stock Adjustments

* Increase stock quantities
* Decrease stock quantities
* Record adjustment reasons
* Maintain inventory accuracy

---

## Reports

### Report 1 — Product List

Displays all products and product information.

### Report 2 — Bill of Materials (BOM)

Displays product BOM structures and component details.

### Report 3 — Stock By Product Type

Summarizes inventory by product category.

### Report 4 — Purchase List

Displays purchase transactions within selected criteria.

### Report 5 — Receiving Voucher

Printable receiving documents for stock purchases.

### Report 6 — Purchase By Supplier

Analyzes purchases grouped by supplier.

### Report 7 — Sales List

Displays sales transactions within selected criteria.

### Report 8 — Delivery Voucher

Printable delivery documents for stock sales.

### Report 9 — Sales By Product

Analyzes sales performance by product.

### Report 10 — Stock Balance

Displays stock received, stock issued, and current inventory balances.

### Report 11 — Stock Card

Provides complete inventory movement history by product and warehouse.

### Report 12 — Adjustment By Product Analysis

Analyzes inventory adjustments and identifies products requiring frequent stock corrections.

---

## Printing Support

All 12 reports can be previewed and printed directly from the system.

---

# 🛠 Technology Stack

## Frontend

* React
* Vite
* React Router
* JavaScript

## Backend

* Node.js
* Express.js

## Database

* PostgreSQL

## Deployment

* Docker
* Docker Compose

---

# 📁 Project Structure

```text
warehouse-app/
├── docker-compose.yml

├── client/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── pages/
│   │   │   ├── productTypes/
│   │   │   ├── units/
│   │   │   ├── warehouses/
│   │   │   ├── suppliers/
│   │   │   ├── customers/
│   │   │   ├── products/
│   │   │   ├── stockPurchase/
│   │   │   ├── stockSales/
│   │   │   ├── stockAdjustment/
│   │   │   └── reports/
│   │   ├── main.jsx
│   │   └── utils.js
│   └── package.json

├── server/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── models/
│   │   ├── db/
│   │   └── app.js
│   └── package.json

└── database/
    ├── compose.yaml
    ├── setup_db.js
    ├── init/
    └── sql/
```

---

# 🔌 Main API Modules

```text
/api/product-types
/api/units
/api/warehouses
/api/suppliers
/api/customers
/api/products

/api/stock-purchase
/api/stock-sales
/api/stock-adjustment

/api/reports
```

---

# 📝 Development Notes

### Inventory Flow

```text
Purchase
    ↓
Stock Increase

Sales
    ↓
Stock Decrease

Adjustment
    ↓
Manual Increase / Decrease
```

### Reporting

All reports support filtering and are designed for printing and operational analysis.

---

# 📄 License

This project was developed for educational purposes as part of a Warehouse Management System project using React, Express, PostgreSQL, and Docker.
