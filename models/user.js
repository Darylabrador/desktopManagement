/**
 * User model
 */

const { Sequelize, Model, DataTypes } = require("sequelize");

const sequelize = require('../config/database');

const User = sequelize.define('user', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    mail: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.TEXT,
        allowNull: false,
    }
}, { timestamps: false });

module.exports = User;