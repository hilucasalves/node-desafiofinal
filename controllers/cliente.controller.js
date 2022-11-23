import ClienteService from '../services/cliente.service.js';
import VendaService from '../services/venda.service.js';

async function createCliente(req, res, next) {
  try {
    let cliente = req.body;
    if (
      !cliente.nome ||
      !cliente.email ||
      !cliente.senha ||
      !cliente.telefone ||
      !cliente.endereco
    ) {
      throw new Error(
        'Nome e Email, Senha, Telefone e Enedereço são obrigatórios.'
      );
    }
    cliente = await ClienteService.createCliente(cliente);
    cliente.senha = null;
    res.send(cliente);
    logger.info(`POST /cliente - ${JSON.stringify(cliente)}`);
  } catch (err) {
    next(err);
  }
}

async function updateCliente(req, res, next) {
  try {
    let cliente = req.body;
    if (
      !cliente.cliente_id ||
      !cliente.nome ||
      !cliente.email ||
      !cliente.senha ||
      !cliente.telefone ||
      !cliente.endereco
    ) {
      throw new Error(
        'Cliente ID, Nome e Email, Senha, Telefone e Enedereço são obrigatórios.'
      );
    }
    cliente = await ClienteService.updateCliente(cliente);
    res.send(cliente);
    logger.info(`PUT /cliente - ${JSON.stringify(cliente)}`);
  } catch (err) {
    next(err);
  }
}

async function deleteCliente(req, res, next) {
  try {
    let cliente = await ClienteService.getCliente(req.params.cliente_id);
    if (cliente) {
      cliente = { cliente_id: req.params.cliente_id };
      const venda = await VendaService.getVendas(cliente);
      if (venda.length === 0) {
        await ClienteService.deleteCliente(req.params.cliente_id);
        res.end();
        logger.info(`DELETE /cliente/${req.params.cliente_id}`);
      } else {
        throw new Error(
          'Não é possível excluir cliente. Existem vendas vinculadas.'
        );
      }
    } else {
      throw new Error(`Cliente ${req.params.cliente_id} não existe.`);
    }
  } catch (err) {
    next(err);
  }
}

async function getClientes(req, res, next) {
  try {
    res.send(await ClienteService.getClientes());
    logger.info('GET /cliente');
  } catch (err) {
    next(err);
  }
}

async function getCliente(req, res, next) {
  try {
    res.send(await ClienteService.getCliente(req.params.cliente_id));
    logger.info(`GET /cliente/${req.params.cliente_id}`);
  } catch (err) {
    next(err);
  }
}

export default {
  createCliente,
  updateCliente,
  deleteCliente,
  getClientes,
  getCliente,
};
