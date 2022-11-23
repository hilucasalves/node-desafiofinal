import LivroRepository from '../repositories/livro.repository.js';

async function createLivro(livro) {
  return await LivroRepository.createLivro(livro);
}

async function updateLivro(livro) {
  return await LivroRepository.updateLivro(livro);
}

async function deleteLivro(id) {
  await LivroRepository.deleteLivro(id);
}

async function getLivros(autor_id) {
  if (autor_id) {
    return await LivroRepository.getLivrosByAutorId(autor_id);
  }
  return await LivroRepository.getLivros();
}

async function getLivro(id) {
  return await LivroRepository.getLivro(id);
}

export default {
  createLivro,
  updateLivro,
  deleteLivro,
  getLivros,
  getLivro,
};
