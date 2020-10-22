/** Assign routes
 * @module routers/assign
 * @requires express express.Router()
 */

const router = require('express').Router();

// Package import
const { body } = require('express-validator');

// Controller import 
const assignController = require('../controllers/assignController')

/**
 * Handling assign's add
 * @name addAssign POST
 * @function 
 * @memberof module:routers/assign
 * @param {string} '/dashboard/assign/add' - uri
 * @param {function} assignController.addAssign
 */
router.post(
    '/assign/add',
    [
        body('client', 'Obligatoire : identité client')
            .not()
            .isEmpty()
    ],
    assignController.addAssign
);


/**
 * Handling assign's delete (cancel)
 * @name deleteAssign POST
 * @function 
 * @memberof module:routers/assign
 * @param {string} '/dashboard/assign/delete' - uri
 * @param {function} assignController.deleteAssign
 */
router.post( '/assign/delete', assignController.deleteAssign);


module.exports = router;