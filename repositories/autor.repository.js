import Autor from '../models/autor.model.js';

async function createAutor(autor) {
  try {
    return await Autor.create(autor);
  } catch (err) {
    throw err;
  }
}

async function updateAutor(autor) {
  try {
    await Autor.update(autor, {
      where: {
        autor_id: autor.autor_id,
      },
    });
    return await getAutor(autor.autor_id);
  } catch (err) {
    throw err;
  }
}

async function deleteAutor(id) {
  try {
    await Autor.destroy({
      where: {
        autor_id: id,
      },
    });
  } catch (err) {
    throw err;
  }
}

async function getAutores() {
  try {
    return await Autor.findAll();
  } catch (err) {
    throw err;
  }
}

async function getAutor(id) {
  try {
    return await Autor.findByPk(id);
  } catch (err) {
    throw err;
  }
}

export default {
  createAutor,
  updateAutor,
  deleteAutor,
  getAutores,
  getAutor,
};
