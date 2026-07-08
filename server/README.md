# Backend da LimpAção

Este backend foi preparado para funcionar com MySQL e responder em português.

## Variáveis de ambiente

Crie um arquivo .env com base em .env.example:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=limpacao
```

## Como executar

```bash
cd server
npm install
npm start
```

## Endpoints principais

- GET /api/health
- GET /api/users
- POST /api/users
- POST /api/login
- GET /api/reports
- POST /api/reports
- PUT /api/reports/:id
- DELETE /api/reports/:id
- GET /api/reports/:id/help-offers
- POST /api/reports/:id/help-offers
- GET /api/reports/:id/chat
- POST /api/reports/:id/chat
