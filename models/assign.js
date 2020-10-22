/**
 * Assign model
 */

const { Sequelize, Model, DataTypes } = require("sequelize");

const sequelize = require('../config/database');

const Assign = sequelize.define('assign', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    hours: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, { timestamps: false });

module.exports = Assign;