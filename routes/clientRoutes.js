/** Client routes
 * @module routers/client
 * @requires express express.Router()
 */

const router = require('express').Router();

// Package import
const { body } = require('express-validator');

// Controller import 
const clientController = require('../controllers/clientController');


/**
 * Get personne for autocomplete
 * @name clientInfo POST
 * @function 
 * @memberof module:routers/client
 * @param {string} '/dashboard/client' - uri
 * @param {function}  clientController.getClientInfo
 */
router.post('/client', clientController.clientInfo);


/**
 * Get personne for autocomplete
 * @name clientInfo POST
 * @function 
 * @memberof module:routers/client
 * @param {string} '/dashboard/client/add' - uri
 * @param {function}  clientController.getClientInfo
 */
router.post(
    '/client/add', 
    [
        body('name', 'Obligatoire : Prénom')
            .not()
            .isEmpty(),
        body('surname', 'Obligatoire : Nom de famille')
            .not()
            .isEmpty()
    ],
    clientController.createClient
);


module.exports = router;