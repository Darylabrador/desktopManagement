/** Desktop routes
 * @module routers/desktop
 * @requires express express.Router()
 */

const router = require('express').Router();

// Package import
const { body } = require('express-validator');


// Controller import
const desktopController = require('../controllers/desktopController')


/**
 * Handling desktop's creation
 * 
 * @name postLogin POST
 * @function
 * @memberof module:routers/auth
 * @param {string} '/dashboard/desktop/add' - uri
 * @param {function} desktopController.addDesktop
 */
router.post(
    '/desktop/add',
    [
        body('name', 'Obligatoire : Nom du poste')
            .not()
            .isEmpty(),
    ],
    desktopController.addDesktop
);


module.exports = router;