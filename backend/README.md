# Getting Started

## Prerequisites

-   Must have a MySQL database running
-   Create a .env file in the root directory with the following variables

```bash
DB_HOST=localhost
DB_USER=root
DB_PASS=yourpassword
DB_NAME=yourdatabasename
```

## Installation

1. Install packages

```bash
npm install
```

2. Run the server

```bash
npm start
```

## Database Configuration

1. Create the database tables using the following route:

```bash
GET http://localhost:9000/api/create
```

2. Populate the database with the following route:

```bash
POST http://localhost:9000/api/seed
```

## Usage

### User Routes

1. To get all the users in the database, use the following route:

```bash
GET http://localhost:9000/api/user
```

2. To get a specific user, use the following route:

```bash
GET http://localhost:9000/api/user/:id
```

3. To create a new user, use the following route:

```bash
POST http://localhost:9000/api/user
body: {
    "username": "yourusername",
    "email": "youremail",
    "password": "yourpassword"
}
```

4. To login, use the following route:

```bash
POST http://localhost:9000/api/user/login
body: {
    "email": "youremail",
    "password": "yourpassword"
}
```

5. To update a user, use the following route:

```bash
PUT http://localhost:9000/api/user/:id
body: {
    "username": "yourusername",
    "email": "youremail",
    "password": "yourpassword"
}
```

6. To delete a user, use the following route:

```bash
DELETE http://localhost:9000/api/user/:id
```

7. To get all Food Items for a specific user, use the following route:

```bash
GET http://localhost:9000/api/user/:id/food_items
```

8. To add a Food Item to a specific user, use the following route:

```bash
POST http://localhost:9000/api/user/:id/
body: {
    "name": "foodname",
    "quantity": "foodquantity", (number)
    "expiration_date": "foodexpirationdate", (date)
    "category": "foodcategory" (fruits, vegetables, meats, dairy, bakery, sweets, drinks, meals, other)
}
```

### Food Item Routes

1. To get all visible Food Items, use the following route:

```bash
GET http://localhost:9000/api/food_item/visible
```

2. To update a Food Item, use the following route:

```bash
PATCH http://localhost:9000/api/food_item/:id
body: {
    "name": "foodname",
    "quantity": "foodquantity", (number)
    "expiration_date": "foodexpirationdate", (date)
    "category": "foodcategory" (fruits, vegetables, meats, dairy, bakery, sweets, drinks, meals, other),
    "visible": "foodvisible" (boolean)
}
```

3. To delete a Food Item, use the following route:

```bash
DELETE http://localhost:9000/api/food_item/:id
```

4. To claim a Food Item, use the following route:

```bash
PATCH http://localhost:9000/api/food_item/claim/:id
```