/**
 * Config file used to connect to database
 */

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(`${process.env.DB_NAME}`, `${process.env.DB_USER}`, `${process.env.DB_PASS}`, {
    host: process.env.DB_URL,
    dialect: 'mysql',
    logging: false
});

module.exports = sequelize;