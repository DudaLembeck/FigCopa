import { CapacitorSQLite, SQLiteDBConnection, SQLiteConnection } from "@capacitor-community/sqlite";
import data from "../data/data.json";

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
        id INTEGER PRIMARY KEY,
        nome TEXT NOT NULL,
        img TEXT,
        coletada INTEGER NOT NULL DEFAULT 0
    );`);

    await seedFigurinhas();

    initialized = true;
}



async function seedFigurinhas() {
    if (!db) return;

    const resultado = await db.query('SELECT COUNT(*) as total FROM figurinhas;');
    const total = resultado.values?.[0]?.total ?? 0;

    if (total > 0) {
        return;
    }

    for (const figura of data.figuras) {
        await db.run(
            `INSERT OR IGNORE INTO figurinhas (id, nome, img, coletada) VALUES (?, ?, ?, ?);`,
            [
                figura.id,
                figura.nome,
                figura.img,
                figura.coletada === 'Coletada' ? 1 : 0
            ]
        );
    }
}

function getDB() {
    if (!db) {
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

export async function addUsuario(nome: string, email: string, senha: string) {
    await ensureDatabase()
    const query = 'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?);'
    await getDB().run(query, [nome, email, senha])
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

export async function listarFigurinhas() {
    await ensureDatabase()
    const resultado = await getDB().query('SELECT * FROM figurinhas ORDER BY id;')
    return resultado.values ?? []
}


export async function atualizarStatusFigurinha(id: number, coletada: number) {
    await ensureDatabase()
    await getDB().run(
        `UPDATE figurinhas SET coletada = ? WHERE id = ?;`,
        [coletada, id]
    )
}

