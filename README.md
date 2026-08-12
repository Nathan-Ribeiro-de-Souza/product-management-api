# Product Management API

RESTful API for product management built with Node.js, Express, and PostgreSQL.

The project implements a complete CRUD system and follows a layered architecture to keep responsibilities separated and the code easier to maintain.

## Features

* Create products
* List all products
* Find a product by ID
* Search products by name
* Filter products by maximum price
* Update specific product fields with PATCH
* Replace product data with PUT
* Delete products
* Product data validation
* Duplicate product validation
* PostgreSQL database persistence
* Health check endpoint

## Technologies

* Node.js
* Express
* PostgreSQL
* pg (node-postgres)
* JavaScript
* REST API

## Project Structure

```text
src/
├── server.js
├── database/
│   └── database.js
├── routes/
│   └── products.routes.js
├── controllers/
│   └── products.controller.js
├── services/
│   └── products.service.js
└── repositories/
    └── products.repository.js
```

The application follows this request flow:

```text
Route → Controller → Service → Repository → Database
```

### Routes

Defines the API endpoints and forwards requests to the appropriate controller.

### Controllers

Handles HTTP requests, responses, status codes, and input validation.

### Services

Contains the application logic and coordinates operations between controllers and repositories.

### Repositories

Handles PostgreSQL database access and SQL queries.

### Database

Creates a connection pool between the Node.js application and PostgreSQL using the `pg` package.

Database connection settings are provided through environment variables.

## API Endpoints

### Health Check

```http
GET /health
```

### Products

```http
GET /products
GET /products/:id
POST /products
PATCH /products/:id
PUT /products/:id
DELETE /products/:id
```

### Filters

Search products by name:

```http
GET /products?search=keyboard
```

Filter products by maximum price:

```http
GET /products?maxPrice=500
```

Use both filters:

```http
GET /products?search=keyboard&maxPrice=500
```

## Product Example

```json
{
  "id": 1,
  "name": "Keyboard",
  "price": 150
}
```

## Running the Project

Clone the repository:

```bash
git clone https://github.com/Nathan-Ribeiro-de-Souza/product-management-api.git
```

Enter the project directory:

```bash
cd product-management-api
```

Install dependencies:

```bash
npm install
```

### PostgreSQL Setup

Create a PostgreSQL database:

```sql
CREATE DATABASE product_management;
```

Inside the `product_management` database, create the `products` table:

```sql
CREATE TABLE products (
  id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  price NUMERIC(10, 2) NOT NULL
);
```

### Environment Variables

Create a `.env` file in the root of the project:

```env
PGHOST=localhost
PGPORT=5432
PGUSER=postgres
PGPASSWORD=your_password
PGDATABASE=product_management
```

Replace `your_password` with your PostgreSQL password.

The `.env` file is ignored by Git and should not be committed to the repository.

### Start the Server

Start the development server:

```bash
npm run dev
```

The API will be available at:

```text
http://localhost:3000
```

## Example Request

Create a product:

```http
POST /products
Content-Type: application/json
```

```json
{
  "name": "Keyboard",
  "price": 150
}
```

Example response:

```json
{
  "id": 1,
  "name": "Keyboard",
  "price": 150
}
```

## License

This project is licensed under the MIT License.

## Author

Nathan Ribeiro de Souza
