import express from 'express';
import AutorController from '../controllers/autor.controller.js';
import AuthService from '../services/auth.service.js';

const router = express.Router();

const auth = AuthService;

router.post('/', auth.authorize('admin'), AutorController.createAutor);
router.put('/', auth.authorize('admin'), AutorController.updateAutor);
router.delete(
  '/:autor_id',
  auth.authorize('admin'),
  AutorController.deleteAutor
);
router.get('/', auth.authorize('admin'), AutorController.getAutores);
router.get('/:autor_id', auth.authorize('admin'), AutorController.getAutor);

export default router;
