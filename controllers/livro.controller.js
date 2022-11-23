import LivroService from '../services/livro.service.js';
import VendaService from '../services/venda.service.js';
import LivroInfo from '../services/livroInfo.service.js';

async function createLivro(req, res, next) {
  try {
    let livro = req.body;
    if (!livro.nome || !livro.valor || !livro.estoque || !livro.autor_id) {
      throw new Error('Nome, Valor, Estoque e Autor ID são obrigatórios.');
    }
    livro = await LivroService.createLivro(livro);
    res.send(livro);
    logger.info(`POST /livro - ${JSON.stringify(livro)}`);
  } catch (err) {
    next(err);
  }
}

async function updateLivro(req, res, next) {
  try {
    let livro = req.body;
    if (
      !livro.livro_id ||
      !livro.nome ||
      !livro.valor ||
      !livro.estoque ||
      !livro.autor_id
    ) {
      throw new Error(
        'Livro ID, Nome, Valor, Estoque e Autor ID são obrigatórios.'
      );
    }
    livro = await LivroService.updateLivro(livro);
    res.send(livro);
    logger.info(`PUT /livro - ${JSON.stringify(livro)}`);
  } catch (err) {
    next(err);
  }
}

async function deleteLivro(req, res, next) {
  try {
    let livro = await LivroService.getLivro(req.params.livro_id);
    if (livro) {
      livro = { livro_id: req.params.livro_id };
      const venda = await VendaService.getVendas(livro);
      if (venda.length === 0) {
        await LivroService.deleteLivro(req.params.livro_id);
        res.end();
        logger.info(`DELETE /livro/${req.params.livro_id}`);
      } else {
        throw new Error(
          'Não é possível excluir livro. Existem vendas vinculadas.'
        );
      }
    } else {
      throw new Error(`Livro ${req.params.livro_id} não existe.`);
    }
  } catch (err) {
    next(err);
  }
}

async function getLivros(req, res, next) {
  try {
    res.send(await LivroService.getLivros(req.query.autor_id));
    logger.info('GET /livro');
  } catch (err) {
    next(err);
  }
}

async function getLivro(req, res, next) {
  try {
    let livro = await LivroService.getLivro(req.params.livro_id);
    let livroInfo = await LivroInfo.getLivroInfo(req.params.livro_id);
    livro = {
      livro_id: livro.livro_id,
      nome: livro.nome,
      valor: livro.valor,
      estoque: livro.estoque,
      autor_id: livro.autor_id,
      descricao: livroInfo?.descricao,
      paginas: livroInfo?.paginas,
      editora: livroInfo?.editora,
      avaliacaoes: livroInfo?.avaliacoes,
    };
    res.send(livro);
    logger.info(`GET /livro/${req.params.livro_id}`);
  } catch (err) {
    next(err);
  }
}

export default {
  createLivro,
  updateLivro,
  deleteLivro,
  getLivros,
  getLivro,
};
