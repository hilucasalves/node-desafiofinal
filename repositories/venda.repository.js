import Venda from '../models/venda.model.js';
import Cliente from '../models/cliente.model.js';
import Livro from '../models/livro.model.js';

async function createVenda(venda) {
  try {
    return await Venda.create(venda);
  } catch (err) {
    throw err;
  }
}

async function updateVenda(venda) {
  try {
    await Venda.update(venda, {
      where: {
        venda_id: venda.venda_id,
      },
    });
    return await getVenda(venda.venda_id);
  } catch (err) {
    throw err;
  }
}

async function deleteVenda(id) {
  try {
    await Venda.destroy({
      where: {
        venda_id: id,
      },
    });
  } catch (err) {
    throw err;
  }
}

async function getVendas() {
  try {
    return await Venda.findAll();
  } catch (err) {
    throw err;
  }
}

async function getVendasByClienteId(cliente_id) {
  try {
    return await Venda.findAll({
      where: {
        cliente_id: cliente_id,
      },
    });
  } catch (err) {
    throw err;
  }
}

async function getVendasByLivroId(livro_id) {
  try {
    return await Venda.findAll({
      where: {
        livro_id: livro_id,
      },
    });
  } catch (err) {
    throw err;
  }
}

async function getVendasByAutorId(autor_id) {
  try {
    return await Venda.findAll({
      include: [
        {
          model: Livro,
          where: {
            autor_id,
          },
        },
      ],
    });
  } catch (err) {
    throw err;
  }
}

async function getVenda(id) {
  try {
    return await Venda.findByPk(id);
  } catch (err) {
    throw err;
  }
}

export default {
  createVenda,
  updateVenda,
  deleteVenda,
  getVendas,
  getVendasByClienteId,
  getVendasByLivroId,
  getVendasByAutorId,
  getVenda,
};
