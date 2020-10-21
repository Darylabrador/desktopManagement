/** Generale routes
 * @module routers/general
 * @requires express express.Router()
 */

const router = require('express').Router();

// Controller import
const generalController = require('../controllers/generalController');


/**
 * Get dashboard page
 * @name getDashboard GET
 * @function 
 * @memberof module:routers/general
 * @param {string} '/dashboard' - uri
 * @param {function} generalController.getDashboard
 */
router.get('/dashboard', generalController.getDashboard);


module.exports = router;