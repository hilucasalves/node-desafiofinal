import VendaRepository from '../repositories/venda.repository.js';

async function createVenda(venda) {
  return await VendaRepository.createVenda(venda);
}

async function updateVenda(venda) {
  return await VendaRepository.updateVenda(venda);
}

async function deleteVenda(id) {
  await VendaRepository.deleteVenda(id);
}

async function getVendas(get) {
  if (get.cliente_id) {
    return await VendaRepository.getVendasByClienteId(get.cliente_id);
  } else if (get.livro_id) {
    return await VendaRepository.getVendasByLivroId(get.livro_id);
  } else if (get.autor_id) {
    return await VendaRepository.getVendasByAutorId(get.autor_id);
  }

  return await VendaRepository.getVendas();
}

async function getVenda(id) {
  return await VendaRepository.getVenda(id);
}

export default {
  createVenda,
  updateVenda,
  deleteVenda,
  getVendas,
  getVenda,
};
