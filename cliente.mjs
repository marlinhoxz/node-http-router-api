const base = "http://localhost:3000";

const criarAutor = await fetch(base + "/autores", {
  method: "POST",
  headers: {
    "content-type": "application/json",
  },
  body: JSON.stringify({
    slug: "flavio",
    nome: "Flavio",
    nacionalidade: "Brasileiro",
  }),
});

const respAutor = await criarAutor.json();
console.log(respAutor);

const criarLivro = await fetch(base + "/livros", {
  method: "POST",
  headers: {
    "content-type": "application/json",
  },
  body: JSON.stringify({
    autorSlug: "Picasso",
    slug: "contos-de-marlinho",
    titulo: "Contos de marlinho",
    ano: 2000,
  }),
});

const livroResp = await criarLivro.json();
/* console.log(livroResp) */

const listaAutores = await fetch(base + "/autores");

const todosAutores = await listaAutores.json();

/* console.log("Autores:", todosAutores) */

const getAutor = await fetch(base + "/autor?slug=picasso");
const resAutor = await getAutor.json();
/* console.log(resAutor) */
