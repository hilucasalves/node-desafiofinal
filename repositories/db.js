import Sequelize from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'mariadb',
  host: 'localhost',
  port: 3306,
  database: 'livraria',
  username: 'root',
  password: '',
  logging: false,
});

export default sequelize;
