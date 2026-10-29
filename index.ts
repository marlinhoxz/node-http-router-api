import { Core } from "./core/core.ts";
import { criarAutor, criarLivro, listarAutores, pegarAutor, pegarLivro } from "./core/database.ts";


const core = new Core()

core.router.post("/autores", (req, res) => {
  const { slug, nome, nacionalidade } = req.body;

  if (!slug || !nome || !nacionalidade) {
    res.status(400).json("Preencha todos os campos para prosseguir");
    return;
  }

  const newAutor = criarAutor({ slug, nome, nacionalidade });

  if (newAutor) {
    res.status(201).json("Autor criado com sucesso!!");
  } else {
    res.status(404).json("Autor ja existe ou falta completar os campos ");
  }
});

core.router.post("/livros", (req, res) => {
  const { autorSlug, slug, titulo, ano } = req.body;
  const newLivro = criarLivro({ autorSlug, slug, titulo, ano });

  if (newLivro) {
    res.status(201).json("Livro adicionado com sucesso!");
  } else {
    res
      .status(404)
      .json(
        "Não foi possível adicionar o livro. Verifique se o autor existe, se os campos estão completos e se o livro já não foi cadastrado.",
      );
  }
});

core.router.get("/autores", (req, res) => {
  const todosAutores = listarAutores();

  if (todosAutores) {
    res.status(200).json(todosAutores);
  } else {
    res.status(404).json("Erro ao listar autores. Verifique se autores existe");
  }
});

core.router.get("/autor", (req, res) => {
  const getAutor = req.query.get("slug");
  const autor = pegarAutor(getAutor);

  if (autor) {
    res.status(200).json(autor);
  } else {
    res
      .status(404)
      .json("Erro ao encontrar autor. Verifique se o autor existe");
  }
});

core.router.get("/livro", (req, res) => {
  const autorSLug = req.query.get("autor");
  const livroSLug = req.query.get("livro");
  const livro = pegarLivro(autorSLug, livroSLug);

  if (livro) {
    res.status(200).json(livro);
  } else {
    res
      .status(404)
      .json(
        "Não foi possivel encontrar os Livros. Verifique se o mesmo existe.",
      );
  }
});


core.router.get('/', (req,res) => {
  res.status(200).end('Home')
})


core.init()