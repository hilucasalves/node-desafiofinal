import express from 'express';
import LivroInfoController from '../controllers/livroinfo.controller.js';
import AuthService from '../services/auth.service.js';

const router = express.Router();
const auth = AuthService;

router.post('/', auth.authorize('admin'), LivroInfoController.createLivroInfo);
router.put('/', auth.authorize('admin'), LivroInfoController.updateLivroInfo);
router.delete(
  '/:livro_id',
  auth.authorize('admin'),
  LivroInfoController.deleteLivroInfo
);
router.get('/', auth.authorize('admin'), LivroInfoController.getLivroInfos);
router.get(
  '/:livro_id',
  auth.authorize('admin'),
  LivroInfoController.getLivroInfo
);
router.post(
  '/avaliacao',
  auth.authorize('admin', 'user'),
  LivroInfoController.createAvaliacao
);
router.delete(
  '/:livro_id/avaliacao/:avaliacao_id',
  auth.authorize('admin', 'user'),
  LivroInfoController.deleteAvaliacao
);

export default router;
/*
  - Cadastrar uma avaliação.
*/
