/**
 * Client model
 */

const { Sequelize, Model, DataTypes } = require("sequelize");

const sequelize = require('../config/database');

const Client = sequelize.define('client', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    surname: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, { timestamps: false });

module.exports = Client;