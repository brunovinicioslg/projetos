/**
 * config.js
 * ============================================================
 * Centraliza todas as configurações do sistema.
 * Carrega variáveis do .env e define defaults seguros.
 * Exporta objeto de config imutável para uso nos outros módulos.
 * ============================================================
 */

const path = require('path');

// --- Detecta se rodando como executável pkg ---
const IS_PKG = !!process.pkg;

// --- Em modo pkg, .env fica ao lado do .exe; em dev, na raiz do projeto ---
const dotenvPath = IS_PKG
  ? path.join(path.dirname(process.execPath), '.env')
  : path.resolve(__dirname, '../.env');

require('dotenv').config({ path: dotenvPath });

// --- Diretório raiz (ao lado do .exe em produção, raiz do projeto em dev) ---
const ROOT_DIR = IS_PKG
  ? path.dirname(process.execPath)
  : path.resolve(__dirname, '..');

/**
 * Resolve um caminho: prioriza variável de ambiente,
 * se não definida usa caminho relativo ao projeto.
 */
function resolvePath(envVar, defaultRelative) {
  return process.env[envVar]
    ? path.resolve(process.env[envVar])
    : path.join(ROOT_DIR, defaultRelative);
}

// ============================================================
// LISTA DE MÓDULOS DO DISCO VIRTUAL MEMORY
// Cada módulo mapeia o nome exibido no site para um slug local
// ============================================================
const MODULES = [
  {
    name: 'Folha de Pagamento',
    slug: 'FolhaPagamento',
    folderName: 'Folha de Pagamento',   // nome exato da pasta no site
  },
  {
    name: 'Contabilidade Pública',
    slug: 'ContabilidadePublica',
    folderName: 'Contabilidade Pública',
  },
  {
    name: 'Controle Frotas',
    slug: 'ControleFrotas',
    folderName: 'Controle Frotas',
  },
  {
    name: 'Tributação',
    slug: 'Tributacao',
    folderName: 'Tributação',
  },
  {
    name: 'Almoxarifado',
    slug: 'Almoxarifado',
    folderName: 'Almoxarifado',
  },
  {
    name: 'Compras',
    slug: 'Compras',
    folderName: 'Compras',
  },
  {
    name: 'Login',
    slug: 'Login',
    folderName: 'Login',
  },
  {
    name: 'Controle Interno',
    slug: 'ControleInterno',
    folderName: 'Controle Interno',
  },
  {
    name: 'Patrimônio Público',
    slug: 'PatrimonioPublico',
    folderName: 'Patrimônio Público',
  },
];

// ============================================================
// OBJETO DE CONFIGURAÇÃO PRINCIPAL
// ============================================================
const config = Object.freeze({

  // --- Credenciais (nunca logar estas!) ---
  credentials: {
    user: process.env.MEMORY_USER || '',
    password: process.env.MEMORY_PASSWORD || '',
  },

  // --- URLs do site ---
  urls: {
    login: process.env.LOGIN_URL || 'https://www.memory.com.br/area-restrita',
    discoVirtual: process.env.BASE_URL || 'https://www.memory.com.br/area-restrita/disco-virtual',
  },

  // --- Configurações do navegador ---
  browser: {
    headless: process.env.HEADLESS !== 'false', // default: true
    defaultViewport: { width: 1280, height: 800 },
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',   // necessário em alguns ambientes Windows
      '--disable-gpu',
      '--window-size=1280,800',
    ],
    timeout: parseInt(process.env.TIMEOUT, 10) || 60000,
  },

  // --- Caminhos do sistema ---
  paths: {
    root: ROOT_DIR,
    // C:\downloads  (um subdiretório por módulo dentro desta pasta)
    downloads: resolvePath('DOWNLOAD_BASE_PATH', 'C:\\downloads'),
    // C:\atualizador  (onde os instaladores são executados / sistemas instalados)
    install: resolvePath('INSTALL_BASE_PATH', 'C:\\atualizador'),
    logs: resolvePath('LOGS_PATH', 'C:\\atualizador\\logs'),
    controlFile: resolvePath('CONTROL_FILE_PATH', 'C:\\atualizador\\update-control.json'),
    lockFile: path.join(
      resolvePath('INSTALL_BASE_PATH', 'C:\\atualizador'),
      '.lock'
    ),
  },

  // --- Configurações de retry ---
  retry: {
    limit: parseInt(process.env.RETRY_LIMIT, 10) || 3,
    delay: parseInt(process.env.RETRY_DELAY, 10) || 5000, // ms entre tentativas
  },

  // --- Timeouts ---
  timeouts: {
    general: parseInt(process.env.TIMEOUT, 10) || 60000,
    download: parseInt(process.env.DOWNLOAD_TIMEOUT, 10) || 300000,
    navigation: 45000,
    waitForSelector: 15000,
    afterInstall: parseInt(process.env.INSTALL_TIMEOUT, 10) || 300000,  // 5 min default
  },

  // --- Modo debug ---
  debug: process.env.DEBUG === 'true',

  // --- Limpeza automática ---
  cleanup: {
    enabled: parseInt(process.env.CLEANUP_DAYS, 10) > 0,
    daysToKeep: parseInt(process.env.CLEANUP_DAYS, 10) || 30,
  },

  // --- Módulos a serem atualizados ---
  modules: MODULES,

  // --- Agendamento automático ---
  schedule: {
    // true = modo daemon (roda continuamente e verifica no horário configurado)
    enabled: process.env.SCHEDULE_ENABLED === 'true',

    // Horário da verificação diária de atualizações (formato HH:MM)
    updateTime: process.env.SCHEDULE_TIME || '08:00',

    // Dia da semana para re-download forçado (0=Dom, 1=Seg, ..., 5=Sex, 6=Sáb)
    forceDay: parseInt(process.env.FORCE_DAY_OF_WEEK, 10) >= 0
      ? parseInt(process.env.FORCE_DAY_OF_WEEK, 10)
      : 5, // sexta-feira

    // Horário do re-download forçado (formato HH:MM)
    forceTime: process.env.FORCE_TIME || '18:00',
  },

  // --- Extensão dos instaladores da Memory (somente .exe) ---
  installerExtensions: ['.exe'],

  // --- Formato de data usado como nome de pasta no site ---
  // Detectado dinamicamente, mas pode ter padrões como:
  // "2026-03-01", "01-03-2026", "20260301"
  datePatterns: [
    /^\d{4}-\d{2}-\d{2}$/,      // 2026-03-01
    /^\d{2}-\d{2}-\d{4}$/,      // 01-03-2026
    /^\d{8}$/,                   // 20260301
    /^\d{2}\/\d{2}\/\d{4}$/,   // 01/03/2026
  ],
});

// --- Validação básica das configurações críticas ---
function validateConfig() {
  const errors = [];

  if (!config.credentials.user) {
    errors.push('MEMORY_USER não definido no .env');
  }
  if (!config.credentials.password) {
    errors.push('MEMORY_PASSWORD não definido no .env');
  }

  if (errors.length > 0) {
    throw new Error(`Configuração inválida:\n  - ${errors.join('\n  - ')}`);
  }
}

module.exports = { config, validateConfig };
