# MEN Stack CRUD App Lab

This is a full-stack CRUD application built using the MEN stack (MongoDB, Express, Node.js) with EJS for server-side rendering.

## Description
The application manages a **Cars** resource and allows users to create, view, update, and delete car records stored in a MongoDB database. The project demonstrates RESTful routing, Mongoose schemas, and dynamic views using EJS.

## Technologies Used
- Node.js
- Express
- MongoDB & Mongoose
- EJS
- Method-Override
- HTML & CSS

## RESTful Routes

| HTTP Method | Route             | Action  | Description                  |
|------------|------------------|---------|------------------------------|
| GET        | /cars            | Index   | Display all cars             |
| GET        | /cars/new        | New     | Show form to create a car    |
| POST       | /cars            | Create  | Create a new car             |
| GET        | /cars/:id        | Show    | Show a single car            |
| GET        | /cars/:id/edit   | Edit    | Show form to edit a car      |
| PUT        | /cars/:id        | Update  | Update a car                 |
| DELETE     | /cars/:id        | Destroy | Delete a car                 |


