import { createServer } from "http";
import { Router } from "./router.mjs";
import { customRequest } from "./customRequest.mjs";
import { customResponse } from "./customResponse.mjs";
import {
  listarAutores,
  criarAutor,
  criarLivro,
  pegarAutor,
} from "./database.mjs";

const router = new Router();

router.post("/autores", (req, res) => {
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

router.post("/livros", (req, res) => {
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

router.get("/autores", (req, res) => {
  const todosAutores = listarAutores();

  if (todosAutores) {
    res.status(200).json(todosAutores);
  } else {
    res.status(404).json("Erro ao listar autores. Verifique se autores existe");
  }
});

router.get("/autor", (req, res) => {
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

const server = createServer(async (request, response) => {
  const req = await customRequest(request);
  const res = customResponse(response);

  console.log(req.method);
  console.log(req.pathname);

  const handler = router.find(req.method, req.pathname);
  console.log(handler);

  if (handler) {
    handler(req, res);
  } else {
    res.status(404).json("Erro ao se comunicar com o handler");
  }
});

server.listen(3000, () => {
  console.log("Server: http://localhost:3000");
});
