/**
 * Desktop model
 */

const { Sequelize, Model, DataTypes } = require("sequelize");

const sequelize = require('../config/database');

const Desktop = sequelize.define('desktop', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, { timestamps: false });

module.exports = Desktop;