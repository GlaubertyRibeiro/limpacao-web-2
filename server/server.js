import express from 'express';
import cors from 'cors';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import mysql from 'mysql2/promise';
import pool from './db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));

const run = async (sql, params = []) => {
  const [result] = await pool.execute(sql, params);
  return { id: result.insertId, changes: result.affectedRows };
};

const get = async (sql, params = []) => {
  const [rows] = await pool.execute(sql, params);
  return rows[0];
};

const all = async (sql, params = []) => {
  const [rows] = await pool.execute(sql, params);
  return rows;
};

const getDbStats = async () => {
  const [usuariosRows] = await pool.query('SELECT COUNT(*) AS total FROM usuarios');
  const [relatoriosRows] = await pool.query('SELECT COUNT(*) AS total FROM relatorios');
  const [ultimosUsuarios] = await pool.query('SELECT id, nome, email FROM usuarios ORDER BY id DESC LIMIT 3');
  const [ultimosRelatorios] = await pool.query('SELECT id, titulo, autor FROM relatorios ORDER BY id DESC LIMIT 3');

  return {
    usuarios: usuariosRows[0].total,
    relatorios: relatoriosRows[0].total,
    ultimosUsuarios,
    ultimosRelatorios,
  };
};

app.get('/api/health', (req, res) => {
  res.json({ ok: true, mensagem: 'Backend da LimpAção funcionando' });
});

app.get('/api/usuarios', async (req, res) => {
  try {
    const usuarios = await all('SELECT id, nome, email, criado_em FROM usuarios ORDER BY id');
    res.json(usuarios);
  } catch (error) {
    console.error('Erro GET /api/usuarios', error);
    res.status(500).json({ erro: error.message });
  }
});

app.post('/api/usuarios', async (req, res) => {
  const { nome, email, senha } = req.body;
  if (!nome || !email || !senha) {
    return res.status(400).json({ erro: 'Nome, e-mail e senha são obrigatórios' });
  }

  try {
    const existing = await get('SELECT id FROM usuarios WHERE email = ?', [email]);
    if (existing) return res.status(409).json({ erro: 'E-mail já cadastrado' });

    const result = await run('INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)', [nome, email, senha]);
    console.log('Usuário gravado no banco', { id: result.id, nome, email });
    res.status(201).json({ id: result.id, nome, email });
  } catch (error) {
    console.error('Erro POST /api/usuarios', error);
    res.status(500).json({ erro: error.message });
  }
});

app.post('/api/login', async (req, res) => {
  const { email, senha } = req.body;
  if (!email || !senha) {
    return res.status(400).json({ erro: 'E-mail e senha são obrigatórios' });
  }

  try {
    const usuario = await get('SELECT id, nome, email FROM usuarios WHERE email = ? AND senha = ?', [email, senha]);
    if (!usuario) return res.status(401).json({ erro: 'Credenciais inválidas' });
    res.json(usuario);
  } catch (error) {
    console.error('Erro POST /api/login', error);
    res.status(500).json({ erro: error.message });
  }
});

app.get('/api/relatorios', async (req, res) => {
  try {
    const currentUserId = req.query.usuario_id ? Number(req.query.usuario_id) : 0;
    const relatorios = await all(
      `SELECT r.id, r.titulo, r.localizacao, r.urgencia, r.status, r.data, r.imagem, r.descricao, r.autor,
        COALESCE(SUM(CASE WHEN p.tipo_participacao = 'participating' THEN 1 ELSE 0 END), 0) AS participantes,
        COALESCE(SUM(CASE WHEN p.tipo_participacao = 'helping' THEN 1 ELSE 0 END), 0) AS ajudantes,
        r.multirao, r.status_anterior, r.usuario_id,
        MAX(CASE WHEN p.usuario_id = ? AND p.tipo_participacao = 'participating' THEN 1 ELSE 0 END) AS participando,
        MAX(CASE WHEN p.usuario_id = ? AND p.tipo_participacao = 'helping' THEN 1 ELSE 0 END) AS ajudando
      FROM relatorios r
      LEFT JOIN participacoes_relatorio p ON p.relatorio_id = r.id
      GROUP BY r.id
      ORDER BY r.data DESC, r.id DESC`,
      [currentUserId, currentUserId]
    );
    res.json(relatorios);
  } catch (error) {
    console.error('Erro GET /api/relatorios', error);
    res.json([]);
  }
});

app.post('/api/relatorios', async (req, res) => {
  const { titulo, localizacao, descricao, urgencia, imagem, multirao, autor, usuario_id } = req.body;
  try {
    const bodySize = JSON.stringify(req.body).length;
    const imageSize = typeof imagem === 'string' ? imagem.length : 0;
    console.log('POST /api/relatorios body keys:', Object.keys(req.body), 'bodySize:', bodySize, 'imageSize:', imageSize);
  } catch (logErr) {
    console.warn('Could not log request body size', logErr);
  }
  if (!titulo || !localizacao || !descricao || !urgencia) {
    return res.status(400).json({ erro: 'Título, localização, descrição e urgência são obrigatórios' });
  }

  try {
    const base64Image = typeof imagem === 'string' ? imagem : '';
    const result = await run(`
      INSERT INTO relatorios (titulo, localizacao, urgencia, status, data, imagem, descricao, autor, participantes, ajudantes, multirao, usuario_id)
      VALUES (?, ?, ?, 'pending', ?, ?, ?, ?, 0, 0, ?, ?)
    `, [titulo, localizacao, urgencia, new Date().toISOString().slice(0, 10), base64Image, descricao, autor || 'Você', multirao ? 1 : 0, usuario_id || null]);

    const created = await get('SELECT * FROM relatorios WHERE id = ?', [result.id]);
    console.log('Relatório gravado no banco', { id: result.id, titulo, localizacao, autor: autor || 'Você' });
    res.status(201).json({ ...created, participantes: 0, ajudantes: 0, participando: 0, ajudando: 0 });
  } catch (error) {
    console.error('Erro POST /api/relatorios', error);
    res.status(500).json({ erro: error.message });
  }
});

app.put('/api/relatorios/:id', async (req, res) => {
  const { id } = req.params;
  const { titulo, localizacao, descricao, urgencia, imagem, multirao, status, status_anterior, usuario_id, participantes, ajudantes, participants, helpers } = req.body;

  try {
    const existing = await get('SELECT * FROM relatorios WHERE id = ?', [id]);
    if (!existing) {
      return res.status(404).json({ erro: 'Relatório não encontrado' });
    }

    const hasParticipationFields = [participantes, participants, ajudantes, helpers].some((value) => value !== undefined);
    const isParticipationOnlyUpdate = hasParticipationFields && !['titulo', 'localizacao', 'descricao', 'urgencia', 'imagem', 'multirao', 'status', 'status_anterior', 'usuario_id'].some((field) => Object.prototype.hasOwnProperty.call(req.body, field));

    if (!isParticipationOnlyUpdate && existing.usuario_id != null && usuario_id != null && Number(existing.usuario_id) !== Number(usuario_id)) {
      return res.status(403).json({ erro: 'Somente o usuário que criou este relatório pode editá-lo' });
    }

    const safeTitulo = titulo ?? existing.titulo ?? '';
    const safeLocalizacao = localizacao ?? existing.localizacao ?? '';
    const safeDescricao = descricao ?? existing.descricao ?? '';
    const safeUrgencia = urgencia ?? existing.urgencia ?? 'medium';
    const safeImagem = imagem ?? existing.imagem ?? '';
    const safeMultirao = multirao ?? existing.multirao ?? 0;
    const safeParticipantes = participantes ?? participants ?? existing.participantes ?? 0;
    const safeAjudantes = ajudantes ?? helpers ?? existing.ajudantes ?? 0;
    const safeStatus = status ?? existing.status ?? 'pending';
    const safeStatusAnterior = status_anterior ?? existing.status_anterior ?? null;
    const safeUsuarioId = isParticipationOnlyUpdate ? existing.usuario_id ?? null : (usuario_id ?? existing.usuario_id ?? null);

    await run(`
      UPDATE relatorios
      SET titulo = ?, localizacao = ?, descricao = ?, urgencia = ?, imagem = ?, multirao = ?, participantes = ?, ajudantes = ?, status = ?, status_anterior = ?, usuario_id = COALESCE(?, usuario_id)
      WHERE id = ?
    `, [safeTitulo, safeLocalizacao, safeDescricao, safeUrgencia, safeImagem, safeMultirao ? 1 : 0, safeParticipantes, safeAjudantes, safeStatus, safeStatusAnterior, safeUsuarioId, id]);

    const updated = await get('SELECT * FROM relatorios WHERE id = ?', [id]);
    const counts = await get(
      `SELECT
        COALESCE(SUM(CASE WHEN tipo_participacao = 'participating' THEN 1 ELSE 0 END), 0) AS participantes,
        COALESCE(SUM(CASE WHEN tipo_participacao = 'helping' THEN 1 ELSE 0 END), 0) AS ajudantes
      FROM participacoes_relatorio
      WHERE relatorio_id = ?`,
      [id]
    );
    res.json({ ...updated, ...counts });
  } catch (error) {
    console.error('Erro PUT /api/relatorios/:id', error);
    res.status(500).json({ erro: error.message });
  }
});

app.delete('/api/relatorios/:id', async (req, res) => {
  const { id } = req.params;
  const { usuario_id } = req.body || {};

  try {
    const existing = await get('SELECT usuario_id FROM relatorios WHERE id = ?', [id]);
    if (!existing) {
      return res.status(404).json({ erro: 'Relatório não encontrado' });
    }

    if (existing.usuario_id != null && usuario_id != null && Number(existing.usuario_id) !== Number(usuario_id)) {
      return res.status(403).json({ erro: 'Somente o usuário que criou este relatório pode excluí-lo' });
    }

    await run('DELETE FROM relatorios WHERE id = ?', [id]);
    res.json({ sucesso: true });
  } catch (error) {
    console.error('Erro DELETE /api/relatorios/:id', error);
    res.status(500).json({ erro: error.message });
  }
});

app.post('/api/relatorios/:id/participacoes', async (req, res) => {
  const { id } = req.params;
  const { usuario_id, tipo_participacao, action } = req.body;

  if (!usuario_id || !tipo_participacao || !['participating', 'helping'].includes(tipo_participacao) || !['add', 'remove'].includes(action)) {
    return res.status(400).json({ erro: 'Dados de participação inválidos' });
  }

  try {
    const existingReport = await get('SELECT id FROM relatorios WHERE id = ?', [id]);
    if (!existingReport) {
      return res.status(404).json({ erro: 'Relatório não encontrado' });
    }

    if (action === 'add') {
      await run(
        'INSERT INTO participacoes_relatorio (relatorio_id, usuario_id, tipo_participacao) SELECT ?, ?, ? FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM participacoes_relatorio WHERE relatorio_id = ? AND usuario_id = ? AND tipo_participacao = ?)',
        [id, usuario_id, tipo_participacao, id, usuario_id, tipo_participacao]
      );
    } else {
      await run('DELETE FROM participacoes_relatorio WHERE relatorio_id = ? AND usuario_id = ? AND tipo_participacao = ?', [id, usuario_id, tipo_participacao]);
    }

    const summary = await get(
      `SELECT
        COALESCE(SUM(CASE WHEN tipo_participacao = 'participating' THEN 1 ELSE 0 END), 0) AS participantes,
        COALESCE(SUM(CASE WHEN tipo_participacao = 'helping' THEN 1 ELSE 0 END), 0) AS ajudantes,
        MAX(CASE WHEN usuario_id = ? AND tipo_participacao = 'participating' THEN 1 ELSE 0 END) AS participando,
        MAX(CASE WHEN usuario_id = ? AND tipo_participacao = 'helping' THEN 1 ELSE 0 END) AS ajudando
      FROM participacoes_relatorio
      WHERE relatorio_id = ?`,
      [usuario_id, usuario_id, id]
    );
    res.json(summary);
  } catch (error) {
    console.error('Erro POST participacoes', error);
    res.status(500).json({ erro: error.message });
  }
});

app.get('/api/relatorios/:id/ofertas-ajuda', async (req, res) => {
  const { id } = req.params;
  try {
    const rows = await all('SELECT * FROM ofertas_ajuda WHERE relatorio_id = ? ORDER BY id', [id]);
    res.json(rows);
  } catch (error) {
    console.error('Erro GET ofertas-ajuda', error);
    res.status(500).json({ erro: error.message });
  }
});

app.post('/api/relatorios/:id/ofertas-ajuda', async (req, res) => {
  const { id } = req.params;
  const { nome, telefone, mensagem } = req.body;
  if (!nome || !telefone) return res.status(400).json({ erro: 'Nome e telefone são obrigatórios' });

  try {
    const result = await run('INSERT INTO ofertas_ajuda (relatorio_id, nome, telefone, mensagem) VALUES (?, ?, ?, ?)', [id, nome, telefone, mensagem || '']);
    const created = await get('SELECT * FROM ofertas_ajuda WHERE id = ?', [result.id]);
    res.json(created);
  } catch (error) {
    console.error('Erro POST ofertas-ajuda', error);
    res.status(500).json({ erro: error.message });
  }
});

app.get('/api/debug/db', async (req, res) => {
  try {
    const stats = await getDbStats();
    res.json(stats);
  } catch (error) {
    console.error('Erro GET /api/debug/db', error);
    res.status(500).json({ erro: error.message });
  }
});

app.get('/api/relatorios/:id/chat', async (req, res) => {
  const { id } = req.params;
  try {
    const rows = await all('SELECT * FROM mensagens_chat WHERE relatorio_id = ? ORDER BY id', [id]);
    res.json(rows);
  } catch (error) {
    console.error('Erro GET chat', error);
    res.status(500).json({ erro: error.message });
  }
});

app.post('/api/relatorios/:id/chat', async (req, res) => {
  const { id } = req.params;
  const { autor, texto } = req.body;
  if (!autor || !texto) return res.status(400).json({ erro: 'Autor e texto são obrigatórios' });

  try {
    const result = await run('INSERT INTO mensagens_chat (relatorio_id, autor, texto) VALUES (?, ?, ?)', [id, autor, texto]);
    const created = await get('SELECT * FROM mensagens_chat WHERE id = ?', [result.id]);
    res.json(created);
  } catch (error) {
    console.error('Erro POST chat', error);
    res.status(500).json({ erro: error.message });
  }
});

const ensureSchema = async () => {
  const schemaPath = path.resolve(__dirname, 'mysql-schema.sql');
  const schemaSql = await fs.readFile(schemaPath, 'utf-8');
  await pool.query(schemaSql);
  console.log('Schema MySQL verificado/aplicado');
  try {
    // Allow large base64 images by using LONGTEXT for `imagem`
    await pool.query("ALTER TABLE relatorios MODIFY imagem LONGTEXT NULL");
    console.log('Aplicado ALTER TABLE relatorios MODIFY imagem LONGTEXT');
  } catch (e) {
    console.warn('ALTER TABLE imagem não aplicado (provavelmente já está em LONGTEXT):', e.message);
  }
};

const start = async () => {
  try {
    await pool.query('SELECT 1');
    console.log('Conexão com MySQL estabelecida');
    await ensureSchema();
  } catch (err) {
    console.error('Falha ao conectar no MySQL ou aplicar schema:', err);
    process.exit(1);
  }

  app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
  });
};

start();
