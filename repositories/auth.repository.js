import Cliente from '../models/cliente.model.js';

async function getClienteLogin(username, password) {
  try {
    return await Cliente.findOne({
      where: { email: username, senha: password },
    });
  } catch (err) {
    throw err;
  }
}

export default { getClienteLogin };
