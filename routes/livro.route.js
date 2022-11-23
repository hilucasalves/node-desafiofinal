import express from 'express';
import LivroController from '../controllers/livro.controller.js';
import AuthService from '../services/auth.service.js';

const router = express.Router();
const auth = AuthService;

router.post('/', auth.authorize('admin'), LivroController.createLivro);
router.put('/', auth.authorize('admin'), LivroController.updateLivro);
router.delete(
  '/:livro_id',
  auth.authorize('admin'),
  LivroController.deleteLivro
);
router.get('/', auth.authorize('admin', 'user'), LivroController.getLivros);
router.get(
  '/:livro_id',
  auth.authorize('admin', 'user'),
  LivroController.getLivro
);

export default router;

/*
  - Consultar os livros cadastrados.
  - Consultar um livro em específico.
  - Consultar os livros cadastrados de um autor em específico.
*/
