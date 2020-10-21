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
 * @name addDesktop POST
 * @function
 * @memberof module:routers/desktop
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


/**
 * Handling desktop's edition
 * 
 * @name editDesktop POST
 * @function
 * @memberof module:routers/desktop
 * @param {string} '/dashboard/desktop/edit' - uri
 * @param {function} desktopController.editDesktop
 */
router.post(
    '/desktop/edit',
    [
        body('name', 'Obligatoire : Nom du poste')
            .not()
            .isEmpty(),
    ],
    desktopController.editDesktop
);


/**
 * Handling desktop's delete
 * 
 * @name deleteDesktop POST
 * @function
 * @memberof module:routers/desktop
 * @param {string} '/dashboard/desktop/delete' - uri
 * @param {function} desktopController.deleteDesktop
 */
router.post('/desktop/delete', desktopController.deleteDesktop);


module.exports = router;