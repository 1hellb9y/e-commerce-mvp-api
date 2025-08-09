## Project Overview
E-commerce MVP API is a minimal, secure, and scalable backend REST API for online stores.  
Built with **Node.js**, **Express.js**, and **MongoDB (Mongoose)**, it provides core e-commerce features to handle users, products, carts, and orders, secured with industry best practices.

## Features

- User authentication and authorization with JWT  
- Role-based access control (admin/customer)  
- Product management: create, read, update, delete (CRUD)  
- Cart management: add, update, remove items  
- Order system: create orders from cart, manage order status  
- Security: Helmet, rate limiting, CORS, XSS & NoSQL injection protection  
- Input validation with `express-validator`


## Tech Stack


| Technology         | Purpose                     |
|--------------------|-----------------------------|
| Node.js            | JavaScript runtime           |
| Express.js         | Web framework                |
| MongoDB            | NoSQL database               |
| Mongoose           | MongoDB ODM                  |
| JSON Web Tokens    | Authentication               |
| express-validator  | Input validation             |
| Helmet             | HTTP headers security        |
| express-rate-limit | Rate limiting                |
| xss-clean          | XSS attack prevention        |
| express-mongo-sanitize | NoSQL injection prevention |
| CORS               | Cross-Origin Resource Sharing|

---
