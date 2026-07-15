import {
  CapacitorSQLite,
  SQLiteConnection,
  SQLiteDBConnection,
} from "@capacitor-community/sqlite";

const dbName = "AlbumCopa";
let db: SQLiteDBConnection | null = null;
let initialized = false;

const sqliteConnection = new SQLiteConnection(CapacitorSQLite);

async function ensureDatabase() {
  if (initialized && db) return;

  if (!db) {
    db = await sqliteConnection.createConnection(
      dbName,
      false,
      "no-encryption",
      1,
      false
    );
  }

  await db.open();

  // TABELA USUARIOS
  await db.execute(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      login TEXT NOT NULL UNIQUE,
      senha TEXT NOT NULL
    );
  `);

  // TABELA JOGADORES
  await db.execute(`
    CREATE TABLE IF NOT EXISTS jogadores (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      selecao TEXT NOT NULL,
      foto TEXT NOT NULL,
      raridade TEXT NOT NULL,
      brilhante INTEGER DEFAULT 0
    );
  `);

  // TABELA ALBUM (RELACIONAMENTO USUARIO x JOGADOR)
  await db.execute(`
    CREATE TABLE IF NOT EXISTS album (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      usuario_id INTEGER NOT NULL,
      jogador_id INTEGER NOT NULL,
      coletada INTEGER NOT NULL DEFAULT 0,
      UNIQUE(usuario_id, jogador_id),
      FOREIGN KEY(usuario_id) REFERENCES usuarios(id),
      FOREIGN KEY(jogador_id) REFERENCES jogadores(id)
    );
  `);

  // TABELA ACHIEVEMENTS (CONQUISTAS DISPONÍVEIS)
  await db.execute(`
    CREATE TABLE IF NOT EXISTS achievements (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      descricao TEXT NOT NULL,
      icone TEXT NOT NULL,
      requisito TEXT NOT NULL,
      valor INTEGER NOT NULL
    );
  `);

  // TABELA USER_ACHIEVEMENTS (CONQUISTAS DESBLOQUEADAS PELO USUÁRIO)
  await db.execute(`
    CREATE TABLE IF NOT EXISTS user_achievements (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      achievement_id INTEGER NOT NULL,
      data_desbloqueio TEXT NOT NULL,
      FOREIGN KEY(user_id) REFERENCES usuarios(id),
      FOREIGN KEY(achievement_id) REFERENCES achievements(id)
    );
  `);

  await popularDadosIniciais();

  initialized = true;
}

function getDb() {
  if (!db) throw new Error("Banco de dados ainda não inicializado");
  return db;
}

export async function initDatabase() {
  try {
    await ensureDatabase();
  } catch (error) {
    console.error("Erro ao iniciar DB SQLite", error);
  }
}

async function popularDadosIniciais() {
  // POPULAR JOGADORES
  const resJogadores = await getDb().query("SELECT COUNT(*) as total FROM jogadores");
  if (resJogadores.values?.[0]?.total === 0) {
    const jogadores = [
      ["Neymar Jr", "Brasil", "https://img.a.transfermarkt.technology/portrait/big/68290-1697056482.jpg", "Lendária", 1],
      ["Lionel Messi", "Argentina", "https://img.a.transfermarkt.technology/portrait/big/28003-1710080339.jpg", "Lendária", 1],
      ["Cristiano Ronaldo", "Portugal", "https://img.a.transfermarkt.technology/portrait/big/8198-1694609670.jpg", "Lendária", 1],
      ["Vinicius Jr", "Brasil", "https://img.a.transfermarkt.technology/portrait/big/371998-1664869583.jpg", "Épica", 0],
      ["Kylian Mbappé", "França", "https://img.a.transfermarkt.technology/portrait/big/342229-1682683695.jpg", "Lendária", 0],
      ["Jude Bellingham", "Inglaterra", "https://img.a.transfermarkt.technology/portrait/big/581678-1693987944.jpg", "Lendária", 0],
      ["Lamine Yamal", "Espanha", "https://img.a.transfermarkt.technology/portrait/big/937958-1699476962.jpg", "Lendária", 1],
      ["Rodrygo", "Brasil", "https://img.a.transfermarkt.technology/portrait/big/412363-1697056493.jpg", "Rara", 0],
      ["Alisson", "Brasil", "https://img.a.transfermarkt.technology/portrait/big/105470-1668528909.jpg", "Rara", 0],
      ["Marquinhos", "Brasil", "https://img.a.transfermarkt.technology/portrait/big/181767-1668528947.jpg", "Comum", 0]
    ];
    for (const j of jogadores) {
      await getDb().run("INSERT INTO jogadores (nome, selecao, foto, raridade, brilhante) VALUES (?, ?, ?, ?, ?)", j);
    }
  }

  // POPULAR CONQUISTAS
  const resConquistas = await getDb().query("SELECT COUNT(*) as total FROM achievements");
  if (resConquistas.values?.[0]?.total === 0) {
    const conquistas = [
      ["Primeira Figurinha", "Desbloquear ao coletar a primeira figurinha.", "trophy-outline", "total", 1],
      ["Iniciante", "Coletar 5 figurinhas.", "star-outline", "total", 5],
      ["Colecionador", "Coletar 10 figurinhas.", "ribbon-outline", "total", 10],
      ["Caçador de Raras", "Coletar 3 figurinhas raras ou lendárias.", "diamond-outline", "raras", 3],
      ["Brilho Inicial", "Coletar 2 figurinhas brilhantes.", "flash-outline", "brilhantes", 2],
      ["Álbum em Construção", "Completar 50% do álbum.", "build-outline", "percentual", 50],
      ["Campeão da Copa", "Completar 100% do álbum.", "medal-outline", "percentual", 100]
    ];
    for (const c of conquistas) {
      await getDb().run("INSERT INTO achievements (nome, descricao, icone, requisito, valor) VALUES (?, ?, ?, ?, ?)", c);
    }
  }
}

// --- FUNÇÕES DE NEGÓCIO ---

export async function addUsuario(nome: string, login: string, senha: string) {
  await ensureDatabase();
  const loginNormalizado = login.trim().toLowerCase();
  await getDb().run("INSERT INTO usuarios (nome, login, senha) VALUES (?, ?, ?)", [nome, loginNormalizado, senha]);
}

export async function realizarLogin(login: string, senha: string) {
  await ensureDatabase();
  const loginNormalizado = login.trim().toLowerCase();
  const res = await getDb().query("SELECT * FROM usuarios WHERE login = ? AND senha = ?", [loginNormalizado, senha]);
  return res.values || [];
}

export async function listJogadores(usuarioId: number) {
  await ensureDatabase();
  const res = await getDb().query(`
    SELECT j.*, COALESCE(a.coletada, 0) as coletada
    FROM jogadores j
    LEFT JOIN album a ON a.jogador_id = j.id AND a.usuario_id = ?
  `, [usuarioId]);
  return res.values || [];
}

export async function toggleFigurinha(usuarioId: number, jogadorId: number) {
  await ensureDatabase();
  const res = await getDb().query("SELECT coletada FROM album WHERE usuario_id = ? AND jogador_id = ?", [usuarioId, jogadorId]);
  
  if (res.values && res.values.length > 0) {
    const novoStatus = res.values[0].coletada === 1 ? 0 : 1;
    await getDb().run("UPDATE album SET coletada = ? WHERE usuario_id = ? AND jogador_id = ?", [novoStatus, usuarioId, jogadorId]);
  } else {
    await getDb().run("INSERT INTO album (usuario_id, jogador_id, coletada) VALUES (?, ?, 1)", [usuarioId, jogadorId]);
  }
  
  await verificarConquistas(usuarioId);
  return true;
}

// --- SISTEMA DE CONQUISTAS (SQL PURO) ---

export async function listConquistasUsuario(usuarioId: number) {
  await ensureDatabase();
  const res = await getDb().query(`
    SELECT a.*, 
           CASE WHEN ua.id IS NOT NULL THEN 1 ELSE 0 END as desbloqueada,
           ua.data_desbloqueio
    FROM achievements a
    LEFT JOIN user_achievements ua ON ua.achievement_id = a.id AND ua.user_id = ?
  `, [usuarioId]);
  return res.values || [];
}

async function verificarConquistas(usuarioId: number) {
  const jogadores = await listJogadores(usuarioId);
  const totalColetadas = jogadores.filter(j => j.coletada === 1).length;
  const rarasColetadas = jogadores.filter(j => j.coletada === 1 && (j.raridade === 'Rara' || j.raridade === 'Épica' || j.raridade === 'Lendária')).length;
  const brilhantesColetadas = jogadores.filter(j => j.coletada === 1 && j.brilhante === 1).length;
  const percentual = (totalColetadas / jogadores.length) * 100;

  const res = await getDb().query("SELECT * FROM achievements");
  const conquistas = res.values || [];

  for (const c of conquistas) {
    // Verifica se o usuário já tem essa conquista
    const jaTem = await getDb().query("SELECT id FROM user_achievements WHERE user_id = ? AND achievement_id = ?", [usuarioId, c.id]);
    if (jaTem.values && jaTem.values.length > 0) continue;

    let desbloqueou = false;
    if (c.requisito === 'total' && totalColetadas >= c.valor) desbloqueou = true;
    if (c.requisito === 'raras' && rarasColetadas >= c.valor) desbloqueou = true;
    if (c.requisito === 'brilhantes' && brilhantesColetadas >= c.valor) desbloqueou = true;
    if (c.requisito === 'percentual' && percentual >= c.valor) desbloqueou = true;

    if (desbloqueou) {
      const data = new Date().toLocaleDateString('pt-BR');
      await getDb().run("INSERT INTO user_achievements (user_id, achievement_id, data_desbloqueio) VALUES (?, ?, ?)", [usuarioId, c.id, data]);
    }
  }
}

// --- CONTATOS (SQLite) ---

export async function addContato(nome: string, email: string, telefone: string) {
  await ensureDatabase();
  await getDb().run("INSERT INTO contatos (nome, email, telefone) VALUES (?, ?, ?)", [nome, email, telefone]);
}

export async function listContatos() {
  await ensureDatabase();
  const res = await getDb().query("SELECT * FROM contatos");
  return res.values || [];
}

export async function updateContato(id: number, nome: string, email: string, telefone: string) {
  await ensureDatabase();
  await getDb().run("UPDATE contatos SET nome = ?, email = ?, telefone = ? WHERE id = ?", [nome, email, telefone, id]);
}

export async function deleteContatoById(id: number) {
  await ensureDatabase();
  await getDb().run("DELETE FROM contatos WHERE id = ?", [id]);
}
