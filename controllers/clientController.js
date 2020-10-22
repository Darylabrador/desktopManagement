/**
 * Controller for client
 */

// Sequelize import
const sequelize = require('sequelize');
const { Op } = require('sequelize');

// Model import
const Client = require('../models/client');

// package import 
const { validationResult } = require('express-validator');


/**
 * Handle get info about client for autocomplete
 *
 * @function clientInfo
 */
exports.clientInfo = async (req, res, next) => {
    const { clientInfoSearched } = req.body;

    try {
        const infoSearched = clientInfoSearched.toLowerCase();
        const userList = await Client.findAll({
            where: 
                [sequelize.where(
                    sequelize.fn('CONCAT', sequelize.col('surname'), ' ', sequelize.col('name')),
                    { [Op.substring]: infoSearched } 
                )]
        });
        res.status(200).json({
            'userList': userList
        });
    } catch (error) {
        console.log(error)
    }
}


/**
 * Handle POST create client
 *
 * @function createClient
 */
exports.createClient = async (req, res, next) => {
    const {name, surname} = req.body;
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(402).json({
            'message': errors.array()[0].msg,
            'success': false
        });
    }

    try {
        const nameToLowerCase = name.toLowerCase();
        const surnameToLowerCase = surname.toLowerCase();
        
        const newUser = new Client({
            name: nameToLowerCase, 
            surname: surnameToLowerCase
        });
        await newUser.save();
        res.status(200).json({
            'message': 'Ajout effectué',
            'success' : true
        })
    } catch (error) {
        console.log(error)
        res.status(200).json({
            'message': 'Une erreur est survenue',
            'success': false
        })
    }
}