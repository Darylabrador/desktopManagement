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
        return res.status(200).json({
            success: false,
            message: errors.array()[0].msg
        });
    }

    try {
        const newDesktop = new Desktop({name});
        await newDesktop.save();
        res.status(200).json({
            success: true,
            message: 'Poste ajouté avec succès'
        })
    } catch (error) {
        return res.status(200).json({
            success: false,
            message: 'Poste existe déjà'
        })
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
        return res.status(200).json({
            success: false,
            message: errors.array()[0].msg
        });
    }

    try {
        const updateDesktop = await Desktop.findByPk(idDesktop);
        if (!updateDesktop) {
            return res.status(200).json({
                success: false,
                message: 'Poste introuvable'
            })
        }
        updateDesktop.name = name;
        await updateDesktop.save();
        res.status(200).json({
            success: true,
            message: 'Mise à jour réussi'
        })
    } catch (error) {
        return res.status(200).json({
            success: false,
            message: 'Une erreur est survenue'
        });
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
            return res.status(200).json({
                success: false,
                message: 'Poste introuvable'
            })
        }
        await deleteDesktop.destroy();
        res.status(200).json({
            success: true,
            message: 'Suppression effectuée'
        })
    } catch (error) {
        return res.status(200).json({
            success: false,
            message: 'Une erreur est survenue'
        });
    }
}