# 🚀 Deployment Railway - Como Funciona

## 🔄 Fluxo Automático

```
┌─────────────────────────────────────────────┐
│  você faz git push                          │
└──────────────┬──────────────────────────────┘
               │
        ✅ Railway recebe
               │
    ┌──────────┴──────────┐
    │                     │
 ☁️ Railway      💻 Fallback Local
    │                     │
    ✓ DATABASE_URL        ✓ .env variables
    ✓ Conecta no MySQL    ✓ Conecta no local
    │                     │
    └──────────┬──────────┘
               │
        ✅ Aplicação online
```

---

## ✅ O que já está configurado

### `server/db.js` (Inteligente)
```javascript
// 1️⃣ Tenta usar DATABASE_URL (Railroad)
// 2️⃣ Se falhar → usa .env (local)
// 3️⃣ Testa conexão ao iniciar
// 4️⃣ Mostra logs coloridos
```

### `server/.env`
```
Credenciais locais
(Preencha com seus dados)
```

### `server/.env.example`
```
Exemplo de como preencher
```

### `.gitignore`
```
Protege .env de ser commitado
```

---

## 🎯 Próximos Passos

### Local (Testar agora)
```bash
cd server
npm install
npm start
```

### Railway (Quando estiver pronto)
```bash
# Commit tudo
git add .
git commit -m "Setup Railway connection with fallback"
git push origin main

# No Railway, adicione MySQL se não tiver
# Railway criará DATABASE_URL automaticamente
```

---

## 🔍 Como Verificar

### Logs Locais
```bash
npm start
# Olhe para: 🔗 Conectando ao MySQL (💻 LOCAL)...
# Depois: ✅ Conexão com MySQL estabelecida!
```

### Logs do Railway
```
Dashboard → seu projeto → Deployments → View Logs
```

---

## 🆘 Se algo der errado

### Erro no Railway?
1. Verifique logs: `Dashboard → Logs`
2. Confirme MySQL foi adicionado
3. Confirme DATABASE_URL existe em `Variables`

### Erro Local?
1. MySQL está rodando?
2. Dados em `.env` estão corretos?
3. Banco `limpacao` foi criado?

---

**Pronto!** Agora teste localmente primeiro! 🎉
