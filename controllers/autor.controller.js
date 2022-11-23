import AutorService from '../services/autor.service.js';
import LivroService from '../services/livro.service.js';

async function createAutor(req, res, next) {
  try {
    let autor = req.body;
    if (!autor.nome || !autor.email || !autor.telefone) {
      throw new Error('Nome e Email Telefone são obrigatórios.');
    }
    autor = await AutorService.createAutor(autor);
    res.send(autor);
    logger.info(`POST /autor - ${JSON.stringify(autor)}`);
  } catch (err) {
    next(err);
  }
}

async function updateAutor(req, res, next) {
  try {
    let autor = req.body;
    if (!autor.autor_id || !autor.nome || !autor.email || !autor.telefone) {
      throw new Error('Autor ID, Nome e Email Telefone são obrigatórios.');
    }
    autor = await AutorService.updateAutor(autor);
    res.send(autor);
    logger.info(`PUT /autor - ${JSON.stringify(autor)}`);
  } catch (err) {
    next(err);
  }
}

async function deleteAutor(req, res, next) {
  try {
    let autor = await AutorService.getAutor(req.params.autor_id);
    if (autor) {
      autor = { autor_id: req.params.autor_id };
      const livro = await LivroService.getLivros(autor);
      if (livro.length === 0) {
        await AutorService.deleteAutor(req.params.autor_id);
        res.end();
        logger.info(`DELETE /autor/${req.params.autor_id}`);
      } else {
        throw new Error(
          'Não é possível excluir autor. Existem livros vinculados.'
        );
      }
    } else {
      throw new Error(`Autor ${req.params.autor_id} não existe.`);
    }
  } catch (err) {
    next(err);
  }
}

async function getAutores(req, res, next) {
  try {
    res.send(await AutorService.getAutores());
    logger.info('GET /autor');
  } catch (err) {
    next(err);
  }
}

async function getAutor(req, res, next) {
  try {
    res.send(await AutorService.getAutor(req.params.autor_id));
    logger.info(`GET /autor/${req.params.autor_id}`);
  } catch (err) {
    next(err);
  }
}

export default {
  createAutor,
  updateAutor,
  deleteAutor,
  getAutores,
  getAutor,
};
