import Sequelize from 'sequelize';
import db from '../repositories/db.js';
import Autor from './autor.model.js';

const Livro = db.define(
  'livros',
  {
    livro_id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    nome: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    valor: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
    estoque: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
    },
  },
  { underscored: true, timestamps: false }
);

Livro.belongsTo(Autor, { foreignKey: 'autor_id' });
export default Livro;
