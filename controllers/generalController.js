/**
 * Controller for dashboard
 */

// Model import
const Client  = require('../models/client');
const Desktop = require('../models/desktop');
const Assign  = require('../models/assign');


/**
 * Get dashboard page
 *
 * @function getDashboard
 */
exports.getDashboard = async (req, res, next) => {
    try {
        res.render('dashboard', {
            errorMessage: null,
            hasError: false,
            validationErrors: [],
        });
        
    } catch (error) {
        const err = new Error(error);
        err.httpStatusCode = 500;
        return next(err);
    }
}