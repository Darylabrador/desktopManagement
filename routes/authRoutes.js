/** Auth routes
 * @module routers/auth
 * @requires express express.Router()
 */

const router = require('express').Router();

// Package import
const { body } = require('express-validator');

// Controller import
const authController = require('../controllers/authController');


/**
 * Get index page
 * @name getIndex GET
 * @function 
 * @memberof module:routers/auth
 * @param {string} '/' - uri
 * @param {function} authController.getLogin
 */
router.get('/', authController.getLogin);


/**
 * Handling user's connection
 * 
 * @name postLogin POST
 * @function
 * @memberof module:routers/auth
 * @param {string} '/login' - uri
 * @param {function} authController.postLogin
 */
router.post(
    '/login',
    [
        body('mail', 'Obligatoire : adresse email')
            .not()
            .isEmpty(),
        body('password', 'Obligatoire : mot de passe')
            .not()
            .isEmpty()
    ],
    authController.postLogin
);



/**
 * Handle logout
 * @name logout GET
 * @function 
 * @memberof module:routers/auth
 * @param {string} '/logout' - uri
 * @param {function} authController.logout
 */
router.get('/logout', authController.logout);


module.exports = router;