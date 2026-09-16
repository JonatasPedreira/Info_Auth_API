# Info Auth API

REST API developed with NestJS for authentication and credential resolution.

## 🚀 Technologies

- NestJS
- TypeScript
- TypeORM
- PostgreSQL
- Docker
- Swagger

## 📋 Features

- Credential resolution by ID
- Key-based authorization
- Encrypted credential storage
- Internal token authentication
- API documentation with Swagger
- PostgreSQL database integration

## ⚙️ Environment Variables

Create a `.env` file in the root directory of the project.

Use `.env.example` as a reference:

```env
DB_HOST=
DB_PORT=
DB_USERNAME=
DB_PASSWORD=
DB_DATABASE=

MASTER_KEY=
ENCRYPTION_KEY=
ENCRYPTION_IV=

P_99=
P_104=
P_129=
```
Running with Docker

Start the containers with:
```docker
docker compose up -d
```
Check the running containers:
```docker
docker ps
```
💻 Running the API

Install dependencies:
```npm
npm install
```
Start the development server:
```npm
npm run start:dev
```
The API will be available at:
```
http://localhost:3000
```
📚 Swagger

API documentation is available at:
```
http://localhost:3000/api
```
Swagger provides an interactive interface for viewing and testing the API endpoints.

🔐 Authentication

Protected endpoints use Bearer Token authentication.

The authorization token should be provided through the HTTP Authorization header:

Authorization: Bearer <TOKEN>
📌 Main Endpoint
Resolve Credential
POST /auth/resolve

Request body:
```
{
  "id": 99,
  "key": "your-key"
}
```
Example response:
```
{
  "authorized": true,
  "id": 99,
  "senha": "decrypted-value",
  "message": "Autorização Concedida."
}
```
📁 Project Structure
src/
├── auth/
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   ├── entities/
│   └── guards/
│
├── crypto/
│   └── crypto.service.ts
│
├── utils/
│
└── main.ts

👨‍💻 Author
Jonatas Pedreira
