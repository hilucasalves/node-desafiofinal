import Sequelize from 'sequelize';
import db from '../repositories/db.js';
import Cliente from './cliente.model.js';
import Livro from './livro.model.js';

const Venda = db.define(
  'vendas',
  {
    venda_id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    valor: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
    data: {
      type: Sequelize.DATEONLY,
      allowNull: false,
    },
  },
  { underscored: true, timestamps: false }
);

Venda.belongsTo(Cliente, { foreignKey: 'cliente_id' });
Venda.belongsTo(Livro, { foreignKey: 'livro_id' });
export default Venda;
