/** Auth routes
 * @module routers/auth
 * @requires express express.Router()
 */

const router = require('express').Router();

// Middleware import
const { body } = require('express-validator');

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


router.post(
    '/login',
    [
        body('name', 'Obligatoire : Prénom')
            .not()
            .isEmpty(),
        body('surname', 'Obligatoire : Nom de famille')
            .not()
            .isEmpty()
    ],
    authController.postLogin
);


module.exports = router;