Migração para esquema em Português (PT-BR)

1) Crie o banco e as tabelas usando o script:

```sql
-- no MySQL client
SOURCE mysql-schema.sql;
```

2) Se já tiver dados no banco antigo (colunas/tabelas em inglês), rode consultas de migração para copiar dados. Exemplo básico:

```sql
-- supondo esquema antigo em 'users' e 'reports'
INSERT INTO usuarios (nome, email, senha, criado_em)
SELECT name, email, password, created_at FROM users;

INSERT INTO relatorios (titulo, localizacao, urgencia, status, data, imagem, descricao, autor, participantes, ajudantes, multirao, usuario_id, criado_em)
SELECT title, location, urgency, status, date, image, description, author, participants, helpers, multirao, user_id, created_at FROM reports;

INSERT INTO ofertas_ajuda (relatorio_id, nome, telefone, mensagem, criado_em)
SELECT report_id, name, phone, message, created_at FROM help_offers;

INSERT INTO mensagens_chat (relatorio_id, autor, texto, criado_em)
SELECT report_id, author, text, created_at FROM chat_messages;

INSERT INTO participacoes_relatorio (relatorio_id, usuario_id, tipo_participacao, criado_em)
SELECT report_id, user_id, participation_type, created_at FROM report_participations;
```

3) Atualize as variáveis de ambiente em `.env` e reinicie o servidor.

4) Teste endpoints principais (exemplos):

```bash
curl http://localhost:3001/api/health
curl http://localhost:3001/api/usuarios
curl http://localhost:3001/api/relatorios
```
