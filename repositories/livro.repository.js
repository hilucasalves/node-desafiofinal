import Livro from '../models/livro.model.js';
import Autor from '../models/autor.model.js';

async function createLivro(livro) {
  try {
    return await Livro.create(livro);
  } catch (err) {
    throw err;
  }
}

async function updateLivro(livro) {
  try {
    await Livro.update(livro, {
      where: {
        livro_id: livro.livro_id,
      },
    });
    return await getLivro(livro.livro_id);
  } catch (err) {
    throw err;
  }
}

async function deleteLivro(id) {
  try {
    await Livro.destroy({
      where: {
        livro_id: id,
      },
    });
  } catch (err) {
    throw err;
  }
}

async function getLivros() {
  try {
    return await Livro.findAll();
  } catch (err) {
    throw err;
  }
}

async function getLivrosByAutorId(autor_id) {
  try {
    return await Livro.findAll({
      where: {
        autor_id: autor_id,
      },
    });
  } catch (err) {
    throw err;
  }
}

async function getLivro(id) {
  try {
    return await Livro.findByPk(id);
  } catch (err) {
    throw err;
  }
}

export default {
  createLivro,
  updateLivro,
  deleteLivro,
  getLivros,
  getLivrosByAutorId,
  getLivro,
};
