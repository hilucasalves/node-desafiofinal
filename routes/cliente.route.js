import express from 'express';
import ClienteController from '../controllers/cliente.controller.js';
import AuthService from '../services/auth.service.js';

const router = express.Router();
const auth = AuthService;

router.post('/', auth.authorize('admin'), ClienteController.createCliente);
router.put(
  '/',
  auth.authorize('admin', 'user'),
  ClienteController.updateCliente
);
router.delete(
  '/:cliente_id',
  auth.authorize('admin'),
  ClienteController.deleteCliente
);
router.get('/', auth.authorize('admin'), ClienteController.getClientes);
router.get(
  '/:cliente_id',
  auth.authorize('admin'),
  ClienteController.getCliente
);

export default router;

/*
  Ele deve ter permissão somente para os seguintes endpoints:
  - Atualização de um cliente (no caso seria uma atualização cadastral dos próprios dados 
  do usuário).
*/
