import LivroInfoRepository from '../repositories/livroInfo.repository.js';

async function createLivroInfo(livroinfo) {
  return await LivroInfoRepository.createLivroInfo(livroinfo);
}

async function updateLivroInfo(livroinfo) {
  return await LivroInfoRepository.updateLivroInfo(livroinfo);
}

async function deleteLivroInfo(id) {
  await LivroInfoRepository.deleteLivroInfo(id);
}

async function getLivroInfos() {
  return await LivroInfoRepository.getLivroInfos();
}

async function getLivroInfo(livro_id) {
  return await LivroInfoRepository.getLivroInfo(livro_id);
}

async function createAvaliacao(avaliacao, livro_id) {
  return await LivroInfoRepository.createAvaliacao(avaliacao, livro_id);
}

async function deleteAvaliacao(id, avaliacao_id) {
  await LivroInfoRepository.deleteAvaliacao(id, avaliacao_id);
}

export default {
  createLivroInfo,
  updateLivroInfo,
  deleteLivroInfo,
  getLivroInfos,
  getLivroInfo,
  createAvaliacao,
  deleteAvaliacao,
};
