/**
 * Controller for assignment
 */


// Model import
const Client  = require('../models/client');
const Desktop = require('../models/desktop');
const Assign  = require('../models/assign');


// package import
const { validationResult } = require('express-validator');


/**
 * Handle post add assign
 *
 * @function addAssign
 * @throws Will throw an error if one error occursed
 */
exports.addAssign = async (req, res, next) => {

    try {
        
    } catch (error) {
        const err = new Error(error);
        err.httpStatusCode = 500;
        return next(err);
    }
}


/**
 * Handle post delete assign
 *
 * @function deleteAssign
 * @throws Will throw an error if one error occursed
 */
exports.deleteAssign = async (req, res, next) => {
    const { idAssign } = req.body;

    try {
        const assignExist = await Assign.findByPk(idAssign);
        if (!assignExist) {
            req.flash('error', 'Créneau introuvable');
            return res.redirect('/dashboard');
        }
        await assignExist.destroy();
        req.flash('success', 'Suppression effectuée');
        return res.redirect('/dashboard');
    } catch (error) {
        const err = new Error(error);
        err.httpStatusCode = 500;
        return next(err);
    }
}