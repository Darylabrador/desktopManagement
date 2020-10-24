/**
 * Controller for dashboard
 */

// Model import
const Client  = require('../models/client');
const Desktop = require('../models/desktop');
const Assign  = require('../models/assign');


/**
 * Get dashboard page with current date
 *
 * @function getDashboard
 */
exports.getDashboard = async (req, res, next) => {
    let date = new Date().toISOString().substr(0, 10);
    let startHours = 8;

    try {
        const desktopInfo = await Desktop.findAll();
        const assignInfo = await Assign.findAll({
            include: [Client, Desktop],
            where: { date }
        });

        res.render('dashboard', {
            errorMessage: null,
            hasError: false,
            validationErrors: [],
            startHours,
            desktopInfo,
            assignInfo
        });
    } catch (error) {
        const err = new Error(error);
        err.httpStatusCode = 500;
        return next(err);
    }
}


/**
 * Get dashboard page with specific date
 *
 * @function postDashboardDate
 */
exports.postDashboardDate = async (req, res, next) => {
    const { date } = req.body;
    let startHours = 8;

    try {
        const desktopInfo = await Desktop.findAll();
        const assignInfo = await Assign.findAll({
            include: [ Client, Desktop ],
            where: { date }
        });

        res.render('dashboard', {
            errorMessage: null,
            hasError: false,
            validationErrors: [],
            startHours,
            desktopInfo,
            assignInfo
        });
    } catch (error) {
        const err = new Error(error);
        err.httpStatusCode = 500;
        return next(err);
    }
}