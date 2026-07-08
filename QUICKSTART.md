# 🚀 Setup Rápido - LimpAção

## Pré-requisitos

- **Node.js** >= 16.0.0 ([Download](https://nodejs.org/))
- **npm** ou **yarn** (vem com Node.js)

## Verificar instalação

```bash
node --version  # Deve mostrar v16 ou superior
npm --version   # Deve mostrar 7 ou superior
```

## 1️⃣ Instalar Dependências (1 min)

```bash
# Navegue até a pasta do projeto
cd limpacao

# Instale as dependências
npm install
```

## 2️⃣ Iniciar Desenvolvimento (1 min)

```bash
npm run dev
```

✅ A aplicação abrirá automaticamente em http://localhost:5173

## 3️⃣ Navegar pela Aplicação

### O que você verá:

1. **Header** com logo LimpAção e botão "Reportar Lixo"
2. **Dashboard** com 3 estatísticas principais
3. **Filtros** para buscar por urgência, status e texto
4. **Grid de Reports** com 6 exemplos mockados
5. **Footer** com informações do projeto

### Funcionalidades para testar:

- ✅ Clicar em "Reportar Lixo" para abrir modal
- ✅ Preencer o formulário e enviar novo report
- ✅ Usar filtros para buscar reports
- ✅ Buscar por texto (título ou localização)
- ✅ Ver diferentes cores por urgência

## 4️⃣ Build para Produção

```bash
# Compilar para produção
npm run build

# Visualizar o build localmente
npm run preview
```

Arquivos compilados ficarão em `/dist`

## 📁 Arquivos Principais

| Arquivo | Função |
|---------|--------|
| `index.jsx` | Componente principal (toda a lógica) |
| `App.jsx` | Wrapper React |
| `main.jsx` | Entry point |
| `index.html` | HTML base |
| `index.css` | Estilos globais (Tailwind) |
| `vite.config.js` | Config do build |
| `tailwind.config.js` | Config de cores e temas |
| `package.json` | Dependências e scripts |

## 🎨 Dados Mockados

A aplicação já vem com 6 reports de exemplo em `index.jsx`:

```javascript
const [reports, setReports] = useState([
  {
    id: 1,
    title: 'Lixo acumulado na Praia da Armação',
    urgency: 'high',
    status: 'pending',
    // ... mais dados
  },
  // ... mais 5 reports
])
```

Para editar os dados, abra `index.jsx` e procure por `useState([` no início.

## 🔧 Problemas Comuns

### "npm: comando não encontrado"
- Node.js não está instalado
- [Instale Node.js](https://nodejs.org/) e reinicie o terminal

### "Porta 5173 já está em uso"
```bash
# Use outra porta
npm run dev -- --port 5174
```

### "Module not found: lucide-react"
```bash
# Reinstale as dependências
npm install
```

### Estilos Tailwind não aparecem
- Verificar se o arquivo `index.css` é importado
- Limpar cache: `npm run dev` e recarregar página

## 🚢 Deploy Rápido (Vercel)

1. Instale Vercel CLI:
```bash
npm install -g vercel
```

2. Faça deploy:
```bash
vercel
```

3. Siga as instruções na tela

Pronto! Sua app estará online em poucos segundos.

## 📚 Próximos Passos

1. ✅ Entender a estrutura em `index.jsx`
2. ✅ Modificar dados em `useState`
3. ✅ Adicionar novos filtros
4. ✅ Integrar com API real
5. ✅ Deploy em produção

## 💡 Dicas

- Use **F12** (DevTools) para debugar
- Console.log para entender o fluxo de dados
- Tailwind CSS classes são muito poderosas (veja `index.jsx`)
- Lucide React tem muitos ícones disponíveis

## 📞 Suporte

Documentação completa em:
- `README.md` - Visão geral do projeto
- `DEVELOPMENT.md` - Guia de desenvolvimento detalhado

---

**Pronto para começar?** 🎉

```bash
npm install && npm run dev
```

Bom desenvolvimento! 🚀
