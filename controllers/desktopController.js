/**
 * Controller for desktop
 */

// Model import
const Desktop = require('../models/desktop');

// Middleware import 
const { validationResult } = require('express-validator');


/**
 * Handle post add desktop
 *
 * @function addDesktop
 * @param {String} name
 * @throws Will throw an error if one error occursed
 */
exports.addDesktop = async (req, res, next) => {
    const { name } = req.body;
    const errors = validationResult(req);

    // handle error from input validation
    if(!errors.isEmpty()) {
        return res.status(422).render('dashboard', {
            hasError: true,
            errorMessage: errors.array()[0].msg
        });
    }

    try {
        const newDesktop = new Desktop({name});
        await newDesktop.save();
        req.flash('success', 'Poste ajouté avec succès');
        res.redirect('/dashboard');
    } catch (error) {
        req.flash('error', 'Poste existe déjà');
        res.redirect('/dashboard');
    }
}