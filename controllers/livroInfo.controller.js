import LivroInfoService from '../services/livroInfo.service.js';

async function createLivroInfo(req, res, next) {
  try {
    let livroInfo = req.body;
    if (
      !livroInfo.livro_id ||
      !livroInfo.descricao ||
      !livroInfo.paginas ||
      !livroInfo.editora
    ) {
      throw new Error(
        'Livro ID, Descrição, Páginas e Editora são obrigatórios.'
      );
    }
    livroInfo = await LivroInfoService.createLivroInfo(livroInfo);
    res.send(livroInfo);
    logger.info(`POST /livroinfo - ${JSON.stringify(livroInfo)}`);
  } catch (err) {
    next(err);
  }
}

async function updateLivroInfo(req, res, next) {
  try {
    let livroInfo = req.body;
    if (
      !livroInfo.livro_id ||
      !livroInfo.descricao ||
      !livroInfo.paginas ||
      !livroInfo.editora
    ) {
      throw new Error(
        'Livro ID, Descrição, Páginas e Editora são obrigatórios.'
      );
    }
    livroInfo = await LivroInfoService.updateLivroInfo(livroInfo);
    res.send(livroInfo);
    logger.info(`PUT /livroinfo - ${JSON.stringify(livroInfo)}`);
  } catch (err) {
    next(err);
  }
}

async function deleteLivroInfo(req, res, next) {
  try {
    await LivroInfoService.deleteLivroInfo(req.params.livro_id);
    res.end();
    logger.info(`DELETE /livroinfo/${req.params.livro_id}`);
  } catch (err) {
    next(err);
  }
}

async function getLivroInfos(req, res, next) {
  try {
    res.send(await LivroInfoService.getLivroInfos());
    logger.info('GET /livroinfo');
  } catch (err) {
    next(err);
  }
}

async function getLivroInfo(req, res, next) {
  try {
    res.send(await LivroInfoService.getLivroInfo(req.params.livro_id));
    logger.info(`GET /livroinfo/${req.params.livro_id}`);
  } catch (err) {
    next(err);
  }
}

async function createAvaliacao(req, res, next) {
  try {
    let avaliacao = req.body;
    if (
      !avaliacao.livro_id ||
      !avaliacao.nome ||
      !avaliacao.nota ||
      !avaliacao.avaliacao
    ) {
      throw new Error(
        'Livro ID, Nome do Cliente, Nota e Descrição da Avaliação são obrigatórios.'
      );
    }
    let livro_id = avaliacao.livro_id;
    avaliacao = await LivroInfoService.createAvaliacao(
      {
        nome: avaliacao.nome,
        nota: avaliacao.nota,
        avaliacao: avaliacao.avaliacao,
      },
      livro_id
    );
    res.send(avaliacao);
    logger.info(`POST /livroinfo/avaliacao - ${JSON.stringify(avaliacao)}`);
  } catch (err) {
    next(err);
  }
}

async function deleteAvaliacao(req, res, next) {
  try {
    await LivroInfoService.deleteAvaliacao(
      req.params.livro_id,
      req.params.avaliacao_id
    );
    res.end();
    logger.info(
      `DELETE /livroinfo/${req.params.livro_id}/avaliacao/${req.params.avaliacao_id}`
    );
  } catch (err) {
    next(err);
  }
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
