import env from 'dotenv';

env.config();
const Sequelize = require('sequelize');
const sequelize = new Sequelize(
    process.env.DB_DATABASE,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
        host: 'localhost',
        dialect: 'mysql',
    }
);

export default sequelize;