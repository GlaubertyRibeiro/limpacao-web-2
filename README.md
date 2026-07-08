# 🌿 LimpAção

LimpAção é uma aplicação web colaborativa criada para ajudar a comunidade a reportar problemas de limpeza urbana, como acúmulo de lixo, entulho e resíduos em locais públicos. A ideia principal é transformar a cidade em um ambiente mais seguro, limpo e bem cuidado, permitindo que moradores registrem ocorrências, acompanhem o status dos pedidos e contribuam para a solução dos problemas.

O projeto foi pensado para ser simples, intuitivo e voltado para uso prático, com foco em mobilizar a população e facilitar o trabalho de organização e resposta às demandas de limpeza.

---

## 🎯 Objetivo da aplicação

A aplicação permite que qualquer usuário cadastre um problema encontrado na cidade, informe sua localização, descreva a situação e acompanhe o andamento do pedido até a resolução. Com isso, a plataforma funciona como um canal direto de comunicação entre a comunidade e os responsáveis por agir nas demandas de limpeza.

---

## ✨ Funcionalidades principais

### 1. Cadastro e login de usuários
- O usuário pode criar uma conta com nome, e-mail e senha.
- Depois de cadastrado, pode fazer login na plataforma.
- Os dados do usuário ficam vinculados aos relatos criados.

### 2. Criação de relatos
- O usuário pode cadastrar novos relatos de problemas de limpeza.
- É possível informar título, localização, descrição, urgência, status e imagem.

### 3. Edição de relatos
- O usuário que criou o relatório pode editar as informações do relato.
- Isso permite corrigir detalhes, atualizar a descrição ou ajustar a localização.

### 4. Exclusão de relatos
- O usuário criador pode excluir um relatório quando desejar.
- A exclusão ajuda a manter a lista organizada e atualizada.

### 5. Alteração de status
- Cada relatório pode ter seu status alterado conforme o andamento da situação.
- Os status disponíveis incluem:
  - Pendente
  - Em andamento
  - Concluído
- Essa funcionalidade permite acompanhar a evolução do problema desde o cadastro até a solução.

### 6. Atualização para “Em andamento”
- Quando uma solicitação começa a ser tratada, o status pode ser alterado para “Em andamento”.
- Isso deixa claro que a demanda já está sendo acompanhada ou resolvida.

### 7. Marcação como concluído
- Quando a situação for resolvida, o usuário pode alterar o status para “Concluído”.
- Dessa forma, o sistema mostra de forma visual quais problemas já foram solucionados.

### 8. Filtros e busca
- A aplicação permite filtrar e localizar relatos com mais facilidade.
- É possível buscar por texto, urgência e status.
- Isso melhora a navegação e facilita a visualização dos problemas mais relevantes.

### 9. Visualização de relatos
- Os relatos cadastrados aparecem em uma interface organizada para que o usuário consiga visualizar rapidamente as ocorrências registradas.
- A lista ajuda a identificar problemas em diferentes regiões.

### 10. Perfil do usuário
- O sistema exibe informações do usuário logado, como nome e e-mail.
- Isso torna a experiência mais personalizada.

### 11. Chat e comunicação
- A aplicação também oferece a possibilidade de interação entre usuários por meio de mensagens relacionadas ao relatório.
- Isso favorece a troca de informações e o acompanhamento da situação.

### 12. Ofertas de ajuda
- Usuários podem oferecer ajuda em relação a um relatório.
- Essa funcionalidade amplia a participação da comunidade e valoriza a colaboração.

---

## 🧩 Fluxo de uso da aplicação

1. O usuário faz cadastro e realiza login.
2. Acessa a área principal da aplicação.
3. Cadastra um relato com descrição, localização e urgência.
4. Pode acompanhar o status do relato.
5. Pode editar ou excluir o relato, caso seja o responsável pelo cadastro.
6. Pode alterar o estado do problema para “Em andamento” ou “Concluído”.
7. Pode visualizar, buscar e filtrar outros relatos cadastrados.

---

## 🛠 Tecnologias utilizadas

- React + Vite para a interface web
- Tailwind CSS para a estilização
- JavaScript para a lógica da aplicação
- Node.js + Express para o backend
- MySQL para armazenamento dos dados
- Arquitetura baseada em componentes e organização por páginas e módulos

---

## 📦 Estrutura do projeto

A aplicação foi organizada de forma modular para facilitar manutenção e evolução:

- frontend com páginas, componentes e hooks
- backend com rotas de autenticação, relatórios e comunicação
- banco de dados MySQL para persistência das informações

---

## 🚀 Como executar localmente

### Frontend
```bash
npm install
npm run dev
```

### Backend
```bash
cd server
npm install
node server.js
```

---

## 📌 Resumo para apresentação

Essa aplicação tem como principal proposta facilitar o registro e o acompanhamento de problemas de limpeza urbana, permitindo que a comunidade participe ativamente da solução dos problemas. Entre as principais funcionalidades estão:

- cadastro e login
- criação de relatos
- edição e exclusão de relatos
- alteração de status
- atualização para “Em andamento”
- marcação como “Concluído”
- filtros e busca
- visualização de relatos
- perfil do usuário
- interação por chat e ofertas de ajuda

Essa combinação de recursos torna a plataforma prática, colaborativa e útil para a gestão de demandas de limpeza na cidade.

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

---

## 📞 Contato

- **Lucas Cinigalia** - lucas.cinigalia@example.com
- **Glauberty Ribeiro** - glauberty@example.com

---

## 🎉 Missão

> **"Lutar por uma Floripa mais limpa!"** 🌿

---

**Versão**: 1.0.0  
**Última atualização**: Junho 2024  
**Stack**: React + Vite + Tailwind + Atomic Design
