import { CapacitorSQLite, SQLiteDBConnection, SQLiteConnection } from "@capacitor-community/sqlite";
 
const dbName = 'appdatabase';
let db: SQLiteDBConnection | null = null;
let initialized = false;
const sqliteConnection = new SQLiteConnection(CapacitorSQLite);
 
 
 
async function ensureDatabase() {
    if (initialized && db) {
        return;
    }
    
 
    if (!db) {
        
            db = await sqliteConnection.createConnection(dbName, false, "no-encryption", 1, false);
        }
 
        await db.open();
        await db.execute(`CREATE TABLE IF NOT EXISTS usuarios (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            senha TEXT
        )`);

        await db.execute(`CREATE TABLE IF NOT EXISTS figurinhas (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            numero TEXT NOT NULL UNIQUE,
            nome TEXT NOT NULL,
            coletada INTEGER DEFAULT 0 
        );`);
 
        initialized = true;

 }

function getDB() {
    if(!db) {
        throw new Error('Banco de dados ainda não inicializado')
    }
    return db
}

export async function initDatabase() {
    try {
        await ensureDatabase()
    } catch (error) {
        console.error('Erro ao iniciar DB', error)
        throw error
    }
}

export async function addUsuario(nome: string,email: string,senha: string) {
  await ensureDatabase()
  const query ='INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?);'
  await getDB().run(query, [nome, email, senha])
}

export async function updateUsuario(id: number,nome: string, email: string, senha: string) {
  await ensureDatabase()
  const query = 'UPDATE usuarios SET nome = ?, email = ?, senha = ? WHERE id = ?;'
  await getDB().run(query, [nome, email, senha, id])
}

export async function listUsuarios() {
    await ensureDatabase()
    const result = await getDB().query(
    `SELECT id, nome, email FROM usuarios;`
    )
    return result.values || []
}

export async function loginUsuario(email: string, senha: string) {
  await ensureDatabase()
  const query = `
    SELECT * FROM usuarios
    WHERE email = ? AND senha = ?;
  `
  const result = await getDB().query(query, [email, senha])

  return result.values?.[0] || null
}

export async function findUsuarioById(id: number) {
    await ensureDatabase()
    const query = `SELECT id, nome, email FROM usuarios WHERE id = ?;`
    const result = await getDB().query(query, [id])
    return result.values?.[0] || null
}