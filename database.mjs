import { DatabaseSync } from "node:sqlite";

const db = new DatabaseSync("./biblioteca.sqlite");

db.exec(/* sql */ `


    PRAGMA foreign_keys = 1;
    PRAGMA journal_mode = WAL;
    PRAGMA synchronous = NORMAL;
    PRAGMA cache_size = 2000;
    PRAGMA busy_timeout = 5000;
    PRAGMA temp_store = MEMORY;



    CREATE TABLE IF NOT EXISTS "autores" (
        "id" INTEGER PRIMARY KEY,
        "slug" TEXT NOT NULL COLLATE NOCASE UNIQUE,
        "nome" TEXT NOT NULL,
        "nacionalidade" TEXT NOT NULL
    ) STRICT;

    CREATE TABLE IF NOT EXISTS "livros" (
        "id" INTEGER PRIMARY KEY,
        "autor_id" INTEGER NOT NULL,
        "slug" TEXT NOT NULL COLLATE NOCASE,
        "titulo" TEXT NOT NULL,
        "ano" INTEGER NOT NULL,
        FOREIGN KEY ("autor_id") REFERENCES "autores" ("id"),
        UNIQUE ("autor_id", "slug")
    ) STRICT;
    `);


export function criarAutor({ slug, nome, nacionalidade }) {
  try {
    const result = db
      .prepare(`INSERT OR IGNORE INTO "autores" ("slug", "nome", "nacionalidade") VALUES (?,?,?)`)
      .run(slug, nome, nacionalidade);

    return result.changes > 0;
  } catch (err) {
    console.log("Não foi possivel criar o autor:", err);
    return false;
  }
}


export function criarLivro({autorSlug, slug, titulo, ano}) {
  try {
    const result = db
      .prepare(/* sql */`INSERT OR IGNORE INTO "livros" ("autor_id", "slug", "titulo", "ano")
      VALUES ((SELECT "id" FROM "autores" WHERE "slug" = ?), ?,?,?)
      `).run(autorSlug, slug, titulo, ano)

    return result.changes > 0;
  } catch (err) {
    console.log("Não foi possivel criar o autor:", err.message);
    return false;
  }
}


export function listarAutores() {
  try {
    return db.prepare(/* sql */`
      
        SELECT * FROM "autores" 
      
      `).all()
  } catch (err) {

    console.log('Erro ao listar autores:', err )
    return null

  }
}
 

export function pegarAutor(slug) {

  try {
   return db.prepare(/* sql */`
      
      SELECT * FROM "autores" WHERE "slug" = ?

      `).get(slug)
  } catch (err) {
    console.log('Erro ao encontrar autor:', err)
  }

}


 db.exec(/* sql */`
  
  DELETE FROM "autores" WHERE "slug" = 'joao'
  `) 