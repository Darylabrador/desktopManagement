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





/**
 * Handle post edit desktop
 *
 * @function editDesktop
 * @param {String} name
 * @param {Number} idDesktop
 * @throws Will throw an error if one error occursed
 */
exports.editDesktop = async (req, res, next) => {
    const { name, idDesktop } = req.body;
    const errors = validationResult(req);

    // handle error from input validation
    if (!errors.isEmpty()) {
        return res.status(422).render('dashboard', {
            hasError: true,
            errorMessage: errors.array()[0].msg
        });
    }

    try {
        const updateDesktop = await Desktop.findByPk(idDesktop);
        if (!updateDesktop) {
            req.flash('error', 'Poste introuvable');
            return res.redirect('/dashboard');
        }
        updateDesktop.name = name;
        await updateDesktop.save();
        req.flash('success', 'Mise à jour réussi');
        res.redirect('/dashboard');
    } catch (error) {
        const err = new Error(error);
        err.httpStatusCode = 500;
        return next(err)
    }
}



/**
 * Handle post delete desktop
 *
 * @function deleteDesktop
 * @param {Number} idDesktop
 * @throws Will throw an error if one error occursed
 */
exports.deleteDesktop = async (req, res, next) => {
    const { idDesktop } = req.body;
    try {
        const deleteDesktop = await Desktop.findByPk(idDesktop);
        if (!deleteDesktop){
            req.flash('error', 'Poste introuvable');
            return res.redirect('/dashboard');
        }
        await deleteDesktop.destroy();
        req.flash('success', 'Suppression effectué');
        res.redirect('/dashboard');
    } catch (error) {
        const err = new Error(error);
        err.httpStatusCode = 500;
        return next(err)
    }
}