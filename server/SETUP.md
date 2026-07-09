# 🚀 Setup Rápido - LimpAção Web 2

## ✅ O que foi configurado?

- ✅ Backend tenta conectar no **Railway** automaticamente
- ✅ Se Railway falhar → cai para **LOCAL** automaticamente  
- ✅ Nenhuma configuração manual necessária!

---

## 📋 Como testar localmente

### 1️⃣ **Certifique-se que MySQL está rodando**

```bash
# Windows com XAMPP
# Abra XAMPP Control Panel e clique "Start" em MySQL

# Ou pelo terminal
net start MySQL80
```

### 2️⃣ **Instalar dependências**

```bash
cd server
npm install
```

### 3️⃣ **Rodar o servidor**

```bash
npm start
```

**Esperado:**
```
🔗 Conectando ao MySQL (💻 LOCAL)...
   Host: localhost
   Port: 3306
   User: root
   Database: limpacao

✅ Conexão com MySQL estabelecida com sucesso!
```

### 4️⃣ **Testar se funciona**

```bash
# Em outro terminal
curl http://localhost:3001/api/health
```

**Resposta esperada:**
```json
{"ok":true,"mensagem":"Backend da LimpAção funcionando"}
```

---

## 🌐 No Railway

### Quando você fizer `git push`:

1. **Railway detecta mudanças**
2. **Reconstrói o projeto**
3. **Se tiver DATABASE_URL configurada** → conecta no Railway
4. **Se falhar** → tenta local (se houver `.env` lá)

---

## 📁 Arquivos Importantes

- `server/.env` - Suas credenciais locais (não commit!)
- `server/.env.example` - Exemplo de como preencher
- `server/db.js` - Lógica de conexão (Railway + fallback)
- `.gitignore` - Protege seu `.env`

---

## ⚠️ Se der erro

| Erro | Solução |
|------|---------|
| ❌ Connection refused | MySQL não está rodando |
| ❌ Access denied | Senha errada em `.env` |
| ❌ Unknown database | Execute o script SQL |

---

**Tudo pronto!** 🎉 Pode fazer `npm start` agora!
