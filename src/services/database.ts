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
        coletada INTEGER NOT NULL DEFAULT 0,
        favorite INTEGER NOT NULL DEFAULT 0,
        collected_at DATETIME,
        tipo TEXT DEFAULT 'Comum'
    );`);

    await db.execute(`CREATE TABLE IF NOT EXISTS conquistas (
        id TEXT PRIMARY KEY,
        titulo TEXT NOT NULL,
        descricao TEXT NOT NULL,
        categoria TEXT NOT NULL,
        meta INTEGER NOT NULL,
        icone TEXT,
        desbloqueada INTEGER NOT NULL DEFAULT 0,
        desbloqueada_em DATETIME
    );`);

    await seedFigurinhas();
    await seedConquistas();

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
            `INSERT OR IGNORE INTO figurinhas (id, nome, img, coletada, favorite, collected_at, tipo) VALUES (?, ?, ?, ?, ?, ?, ?);`,
            [
                figura.id,
                figura.nome,
                figura.img,
                figura.coletada === 'Coletada' ? 1 : 0,
                0, // Default favorite to 0
                null, // Default collected_at to null
                figura.tipo || 'Comum' // Default tipo to 'Comum'
            ]
        );
    }
}

// Catálogo fixo de conquistas. "meta" é interpretado de acordo com a categoria:
// - total / raras / brilhantes: quantidade de figurinhas coletadas
// - percentual: percentual (0-100) de conclusão do álbum
// - colecao: não é usado (o desbloqueio depende de a coleção do "tipo" indicado em `tipoColecao` estar 100% completa)
export interface ConquistaDef {
    id: string;
    titulo: string;
    descricao: string;
    categoria: 'total' | 'raras' | 'brilhantes' | 'percentual' | 'colecao';
    meta: number;
    icone: string;
    tipoColecao?: string;
}

export const CONQUISTAS_CATALOGO: ConquistaDef[] = [
    // Quantidade total de figurinhas coletadas
    { id: 'total_1', titulo: 'Primeiros Passos', descricao: 'Colete sua primeira figurinha.', categoria: 'total', meta: 1, icone: 'ribbon' },
    { id: 'total_5', titulo: 'Colecionador Iniciante', descricao: 'Colete 5 figurinhas.', categoria: 'total', meta: 5, icone: 'albums' },
    { id: 'total_15', titulo: 'Colecionador Dedicado', descricao: 'Colete 15 figurinhas.', categoria: 'total', meta: 15, icone: 'file-tray-full' },
    { id: 'total_30', titulo: 'Mestre Colecionador', descricao: 'Colete 30 figurinhas.', categoria: 'total', meta: 30, icone: 'trophy' },

    // Figurinhas raras
    { id: 'raras_1', titulo: 'Caçador de Raridades', descricao: 'Colete 1 figurinha rara.', categoria: 'raras', meta: 1, icone: 'diamond' },
    { id: 'raras_5', titulo: 'Especialista em Raras', descricao: 'Colete 5 figurinhas raras.', categoria: 'raras', meta: 5, icone: 'diamond' },
    { id: 'raras_10', titulo: 'Lenda das Raras', descricao: 'Colete 10 figurinhas raras.', categoria: 'raras', meta: 10, icone: 'diamond' },

    // Figurinhas brilhantes
    { id: 'brilhantes_1', titulo: 'Brilho Inicial', descricao: 'Colete 1 figurinha brilhante.', categoria: 'brilhantes', meta: 1, icone: 'sparkles' },
    { id: 'brilhantes_3', titulo: 'Coleção Brilhante', descricao: 'Colete 3 figurinhas brilhantes.', categoria: 'brilhantes', meta: 3, icone: 'sparkles' },
    { id: 'brilhantes_5', titulo: 'Resplendor Total', descricao: 'Colete 5 figurinhas brilhantes.', categoria: 'brilhantes', meta: 5, icone: 'sparkles' },

    // Percentual de conclusão do álbum
    { id: 'percentual_25', titulo: 'Um Quarto do Caminho', descricao: 'Complete 25% do álbum.', categoria: 'percentual', meta: 25, icone: 'pie-chart' },
    { id: 'percentual_50', titulo: 'Metade do Álbum', descricao: 'Complete 50% do álbum.', categoria: 'percentual', meta: 50, icone: 'pie-chart' },
    { id: 'percentual_75', titulo: 'Quase Lá', descricao: 'Complete 75% do álbum.', categoria: 'percentual', meta: 75, icone: 'pie-chart' },
    { id: 'percentual_100', titulo: 'Álbum Completo!', descricao: 'Complete 100% do álbum.', categoria: 'percentual', meta: 100, icone: 'trophy' },

    // Conclusão de coleções específicas (por tipo de figurinha)
    { id: 'colecao_comum', titulo: 'Coleção Comum Completa', descricao: 'Colete todas as figurinhas do tipo Comum.', categoria: 'colecao', meta: 100, icone: 'checkmark-done', tipoColecao: 'Comum' },
    { id: 'colecao_rara', titulo: 'Coleção Rara Completa', descricao: 'Colete todas as figurinhas do tipo Rara.', categoria: 'colecao', meta: 100, icone: 'checkmark-done', tipoColecao: 'Rara' },
    { id: 'colecao_brilhante', titulo: 'Coleção Brilhante Completa', descricao: 'Colete todas as figurinhas do tipo Brilhante.', categoria: 'colecao', meta: 100, icone: 'checkmark-done', tipoColecao: 'Brilhante' },
];

async function seedConquistas() {
    if (!db) return;

    for (const conquista of CONQUISTAS_CATALOGO) {
        await db.run(
            `INSERT OR IGNORE INTO conquistas (id, titulo, descricao, categoria, meta, icone, desbloqueada, desbloqueada_em) VALUES (?, ?, ?, ?, ?, ?, 0, NULL);`,
            [conquista.id, conquista.titulo, conquista.descricao, conquista.categoria, conquista.meta, conquista.icone]
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
    const db = getDB();
    const collectedAt = coletada === 1 ? new Date().toISOString() : null;
    await db.run(
        `UPDATE figurinhas SET coletada = ?, collected_at = ? WHERE id = ?;`,
        [coletada, collectedAt, id]
    )

    // Toda vez que o status de uma figurinha mudar, recalculamos as conquistas
    await recalcularConquistas();
}


export async function toggleFavorite(id: number, favorite: number) {
    await ensureDatabase();
    await getDB().run(
        `UPDATE figurinhas SET favorite = ? WHERE id = ?;`,
        [favorite, id]
    );
}

export async function listarFigurinhasFavoritas() {
    await ensureDatabase();
    const resultado = await getDB().query(
        `SELECT * FROM figurinhas WHERE favorite = 1 ORDER BY id;`
    );
    return resultado.values ?? [];
}

export async function listarUltimasFigurinhasColetadas(limit: number = 10) {
    await ensureDatabase();
    const resultado = await getDB().query(
        `SELECT * FROM figurinhas WHERE coletada = 1 AND collected_at IS NOT NULL ORDER BY collected_at DESC LIMIT ?;`,
        [limit]
    );
    return resultado.values ?? [];
}

export async function listarFigurinhasColetadasOrdenadas(orderBy: string = 'collected_at', order: 'ASC' | 'DESC' = 'DESC') {
    await ensureDatabase();
    const resultado = await getDB().query(
        `SELECT * FROM figurinhas WHERE coletada = 1 ORDER BY ${orderBy} ${order};`
    );
    return resultado.values ?? [];
}

export async function getStatistics() {
    await ensureDatabase();
    const db = getDB();

    const totalFigurinhas = (await db.query(`SELECT COUNT(*) as count FROM figurinhas;`)).values?.[0]?.count ?? 0;
    const figurinhasColetadas = (await db.query(`SELECT COUNT(*) as count FROM figurinhas WHERE coletada = 1;`)).values?.[0]?.count ?? 0;
    const figurinhasFaltantes = totalFigurinhas - figurinhasColetadas;
    const figurinhasRarasColetadas = (await db.query(`SELECT COUNT(*) as count FROM figurinhas WHERE coletada = 1 AND tipo = 'Rara';`)).values?.[0]?.count ?? 0;
    const figurinhasBrilhantesColetadas = (await db.query(`SELECT COUNT(*) as count FROM figurinhas WHERE coletada = 1 AND tipo = 'Brilhante';`)).values?.[0]?.count ?? 0;
    const percentualConclusao = totalFigurinhas > 0 ? (figurinhasColetadas / totalFigurinhas) * 100 : 0;

    return {
        totalFigurinhas,
        figurinhasColetadas,
        figurinhasFaltantes,
        figurinhasRarasColetadas,
        figurinhasBrilhantesColetadas,
        percentualConclusao
    };
}

export async function getRankingScore() {
    await ensureDatabase();
    const db = getDB();

    const comumScore = (await db.query(`SELECT COUNT(*) as count FROM figurinhas WHERE coletada = 1 AND tipo = 'Comum';`)).values?.[0]?.count ?? 0;
    const raraScore = (await db.query(`SELECT COUNT(*) as count FROM figurinhas WHERE coletada = 1 AND tipo = 'Rara';`)).values?.[0]?.count ?? 0;
    const brilhanteScore = (await db.query(`SELECT COUNT(*) as count FROM figurinhas WHERE coletada = 1 AND tipo = 'Brilhante';`)).values?.[0]?.count ?? 0;

    const totalScore = (comumScore * 1) + (raraScore * 5) + (brilhanteScore * 10);

    return totalScore;
}

export interface Conquista {
    id: string;
    titulo: string;
    descricao: string;
    categoria: string;
    meta: number;
    icone: string;
    desbloqueada: number;
    desbloqueada_em: string | null;
    valorAtual: number;
}

// Recalcula todas as conquistas com base no estado atual do álbum e persiste
// no SQLite quaisquer novos desbloqueios. Uma conquista, uma vez desbloqueada,
// nunca volta a ficar bloqueada.
export async function recalcularConquistas(): Promise<Conquista[]> {
    await ensureDatabase();
    const db = getDB();

    const stats = await getStatistics();

    const tiposResultado = await db.query(
        `SELECT tipo, COUNT(*) as total, SUM(coletada) as coletadas FROM figurinhas GROUP BY tipo;`
    );
    const porTipo: Record<string, { total: number; coletadas: number }> = {};
    for (const linha of tiposResultado.values ?? []) {
        porTipo[linha.tipo] = { total: linha.total, coletadas: linha.coletadas ?? 0 };
    }

    const novasDesbloqueadas: Conquista[] = [];

    for (const def of CONQUISTAS_CATALOGO) {
        let atingida = false;
        let valorAtual = 0;

        switch (def.categoria) {
            case 'total':
                valorAtual = stats.figurinhasColetadas;
                atingida = valorAtual >= def.meta;
                break;
            case 'raras':
                valorAtual = stats.figurinhasRarasColetadas;
                atingida = valorAtual >= def.meta;
                break;
            case 'brilhantes':
                valorAtual = stats.figurinhasBrilhantesColetadas;
                atingida = valorAtual >= def.meta;
                break;
            case 'percentual':
                valorAtual = Math.round(stats.percentualConclusao);
                atingida = stats.percentualConclusao >= def.meta;
                break;
            case 'colecao': {
                const grupo = def.tipoColecao ? porTipo[def.tipoColecao] : undefined;
                if (grupo && grupo.total > 0) {
                    valorAtual = grupo.coletadas;
                    atingida = grupo.coletadas >= grupo.total;
                }
                break;
            }
        }

        if (atingida) {
            const jaDesbloqueada = await db.query(
                `SELECT desbloqueada FROM conquistas WHERE id = ?;`,
                [def.id]
            );
            const estavaDesbloqueada = jaDesbloqueada.values?.[0]?.desbloqueada === 1;

            if (!estavaDesbloqueada) {
                await db.run(
                    `UPDATE conquistas SET desbloqueada = 1, desbloqueada_em = ? WHERE id = ?;`,
                    [new Date().toISOString(), def.id]
                );
                novasDesbloqueadas.push({
                    ...def,
                    desbloqueada: 1,
                    desbloqueada_em: new Date().toISOString(),
                    valorAtual
                });
            }
        }
    }

    return novasDesbloqueadas;
}

// Lista todas as conquistas (desbloqueadas ou não) já com o progresso atual calculado,
// para exibição na tela de Conquistas.
export async function listarConquistas(): Promise<Conquista[]> {
    await ensureDatabase();
    const db = getDB();

    const stats = await getStatistics();
    const tiposResultado = await db.query(
        `SELECT tipo, COUNT(*) as total, SUM(coletada) as coletadas FROM figurinhas GROUP BY tipo;`
    );
    const porTipo: Record<string, { total: number; coletadas: number }> = {};
    for (const linha of tiposResultado.values ?? []) {
        porTipo[linha.tipo] = { total: linha.total, coletadas: linha.coletadas ?? 0 };
    }

    const resultado = await db.query(`SELECT * FROM conquistas;`);
    const linhas = resultado.values ?? [];

    return CONQUISTAS_CATALOGO.map(def => {
        const linha = linhas.find((l: any) => l.id === def.id);

        let valorAtual = 0;
        let metaExibida = def.meta;
        switch (def.categoria) {
            case 'total':
                valorAtual = stats.figurinhasColetadas;
                break;
            case 'raras':
                valorAtual = stats.figurinhasRarasColetadas;
                break;
            case 'brilhantes':
                valorAtual = stats.figurinhasBrilhantesColetadas;
                break;
            case 'percentual':
                valorAtual = Math.round(stats.percentualConclusao);
                break;
            case 'colecao': {
                const grupo = def.tipoColecao ? porTipo[def.tipoColecao] : undefined;
                valorAtual = grupo?.coletadas ?? 0;
                metaExibida = grupo?.total ?? def.meta;
                break;
            }
        }

        return {
            id: def.id,
            titulo: def.titulo,
            descricao: def.descricao,
            categoria: def.categoria,
            meta: metaExibida,
            icone: def.icone,
            desbloqueada: linha?.desbloqueada ?? 0,
            desbloqueada_em: linha?.desbloqueada_em ?? null,
            valorAtual
        };
    });
}
