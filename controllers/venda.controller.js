import VendaService from '../services/venda.service.js';
import LivroService from '../services/livro.service.js';

async function createVenda(req, res, next) {
  try {
    let venda = req.body;
    if (!venda.data || !venda.cliente_id || !venda.livro_id) {
      throw new Error('Valor, Data, Cliente ID e Livro ID são obrigatórios.');
    }
    let livro = await LivroService.getLivro(venda.livro_id);
    if (livro) {
      venda.valor = livro.valor;
      if (livro.estoque > 0) {
        livro.estoque = livro.estoque - 1;
        livro = { livro_id: livro.livro_id, estoque: livro.estoque };
        await LivroService.updateLivro(livro);
        venda = await VendaService.createVenda(venda);
        res.send(venda);
        logger.info(`POST /venda - ${JSON.stringify(venda)}`);
      } else {
        throw new Error(
          `Livro ${venda.livro_id} não possui estoque suficiente.`
        );
      }
    } else {
      throw new Error(`Livro ${venda.livro_id} não existe.`);
    }
  } catch (err) {
    next(err);
  }
}

async function updateVenda(req, res, next) {
  try {
    let venda = req.body;
    if (
      !venda.venda_id ||
      !venda.valor ||
      !venda.data ||
      !venda.cliente_id ||
      !venda.livro_id
    ) {
      throw new Error(
        'Venda ID, Valor, Data, Cliente ID e Livro ID são obrigatórios.'
      );
    }
    venda = await VendaService.updateVenda(venda);
    res.send(venda);
    logger.info(`PUT /venda - ${JSON.stringify(venda)}`);
  } catch (err) {
    next(err);
  }
}

async function deleteVenda(req, res, next) {
  try {
    await VendaService.deleteVenda(req.params.venda_id);
    res.end();
    logger.info('DELETE /venda');
  } catch (err) {
    next(err);
  }
}

async function getVendas(req, res, next) {
  try {
    res.send(await VendaService.getVendas(req.query));
    logger.info('GET /venda');
  } catch (err) {
    next(err);
  }
}

async function getVenda(req, res, next) {
  try {
    res.send(await VendaService.getVenda(req.params.venda_id));
    logger.info('GET /venda');
  } catch (err) {
    next(err);
  }
}

export default {
  createVenda,
  updateVenda,
  deleteVenda,
  getVendas,
  getVenda,
};
