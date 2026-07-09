import path from 'path';
import { fileURLToPath } from 'url';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envPath = path.resolve(__dirname, '.env');
dotenv.config({ path: envPath });

// Parsear DATABASE_URL do Railway ou usar local
const parseConnectionConfig = () => {
  const databaseUrl = process.env.DATABASE_URL;
  
  // Tentar Railway primeiro
  if (databaseUrl) {
    try {
      const url = new URL(databaseUrl);
      return {
        host: url.hostname,
        port: Number(url.port) || 3306,
        user: url.username,
        password: url.password,
        database: url.pathname.slice(1),
        source: '☁️ RAILWAY',
      };
    } catch (error) {
      console.warn('⚠️  DATABASE_URL inválida, usando local');
    }
  }
  
  // Fallback para local
  return {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'limpacao',
    source: '💻 LOCAL',
  };
};

let config = parseConnectionConfig();

const pool = mysql.createPool({
  host: config.host,
  port: config.port,
  user: config.user,
  password: config.password,
  database: config.database,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  multipleStatements: true,
  enableKeepAlive: true,
    connectTimeout: 10000,
});

console.log(`\n🔗 Conectando ao MySQL (${config.source})...`);
console.log(`   Host: ${config.host}`);
console.log(`   Port: ${config.port}`);
console.log(`   User: ${config.user}`);
console.log(`   Database: ${config.database}\n`);

// Testar conexão ao iniciar
pool.getConnection()
  .then((connection) => {
    console.log('✅ Conexão com MySQL estabelecida com sucesso!\n');
    connection.release();
  })
  .catch((error) => {
    console.error('❌ Erro ao conectar ao MySQL:', error.message);
    
    // Se falhou Railway, tenta reconectar com local
    if (config.source === '☁️ RAILWAY') {
      console.log('\n⚠️  Falha no Railway, tentando reconectar com variáveis locais...\n');
      config = {
        host: process.env.DB_HOST || 'localhost',
        port: Number(process.env.DB_PORT || 3306),
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'limpacao',
        source: '💻 LOCAL (fallback)',
      };
      
      console.log(`🔗 Reconectando (${config.source})...`);
      console.log(`   Host: ${config.host}`);
      console.log(`   Port: ${config.port}`);
      console.log(`   User: ${config.user}`);
      console.log(`   Database: ${config.database}\n`);
    }
  });

export default pool;
