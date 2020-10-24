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



/**
 * Get dashboard page with specific date
 * @name getDashboard POST
 * @function 
 * @memberof module:routers/general
 * @param {string} '/dashboard' - uri
 * @param {function} generalController.getDashboard
 */
router.post('/dashboard', generalController.postDashboardDate);

module.exports = router;