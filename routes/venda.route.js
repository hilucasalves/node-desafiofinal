import express from 'express';
import VendaController from '../controllers/venda.controller.js';
import AuthService from '../services/auth.service.js';

const router = express.Router();
const auth = AuthService;

router.post('/', auth.authorize('admin', 'user'), VendaController.createVenda);
router.put('/', auth.authorize('admin'), VendaController.updateVenda);
router.delete(
  '/:venda_id',
  auth.authorize('admin'),
  VendaController.deleteVenda
);
router.get('/', auth.authorize('admin', 'user'), VendaController.getVendas);
router.get('/:venda_id', auth.authorize('admin'), VendaController.getVenda);

export default router;

/*
  - Cadastrar uma venda (como se ele estivesse efetuando uma compra).
  - Consultar as vendas de um cliente em específico (no caso, somente os registros do seu 
  próprio usuário, sendo necessário bloquear os demais).
  É necessário verificar se o id do usuário passado neste último endpoint seja realmente 
  o mesmo usuário enviado na autenticação, evitando assim que um cliente consulte 
  vendas de outro
*/
