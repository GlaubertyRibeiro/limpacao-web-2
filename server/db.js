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

const createPool = (currentConfig) => mysql.createPool({
  host: currentConfig.host,
  port: currentConfig.port,
  user: currentConfig.user,
  password: currentConfig.password,
  database: currentConfig.database,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  multipleStatements: true,
  enableKeepAlive: true,
  connectTimeout: 10000,
});

let config = parseConnectionConfig();
let pool = createPool(config);

const showConnectionInfo = (currentConfig) => {
  console.log(`\n🔗 Conectando ao MySQL (${currentConfig.source})...`);
  console.log(`   Host: ${currentConfig.host}`);
  console.log(`   Port: ${currentConfig.port}`);
  console.log(`   User: ${currentConfig.user}`);
  console.log(`   Database: ${currentConfig.database}\n`);
};

const testConnection = async () => {
  showConnectionInfo(config);
  try {
    const connection = await pool.getConnection();
    connection.release();
    console.log('✅ Conexão com MySQL estabelecida com sucesso!\n');
  } catch (error) {
    console.error('❌ Erro ao conectar ao MySQL:', error.message);

    if (config.source === '☁️ RAILWAY') {
      const fallbackConfig = {
        host: process.env.DB_HOST || 'localhost',
        port: Number(process.env.DB_PORT || 3306),
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'limpacao',
        source: '💻 LOCAL (fallback)',
      };

      console.log('\n⚠️  Falha no Railway, tentando reconectar com variáveis locais...\n');
      showConnectionInfo(fallbackConfig);

      config = fallbackConfig;
      pool = createPool(config);

      try {
        const connection = await pool.getConnection();
        connection.release();
        console.log('✅ Conexão local com MySQL estabelecida com sucesso!\n');
      } catch (fallbackError) {
        console.error('❌ Erro ao conectar ao MySQL local de fallback:', fallbackError.message);
        process.exit(1);
      }
    } else {
      process.exit(1);
    }
  }
};

testConnection();

export default pool;
