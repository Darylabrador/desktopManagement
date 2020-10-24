/**
 * Controller for dashboard
 */

// Model import
const Client  = require('../models/client');
const Desktop = require('../models/desktop');
const Assign  = require('../models/assign');

var ITEM_PER_PAGE = 3;

/**
 * Get dashboard page with current date
 *
 * @function getDashboard
 * @throws will redirect to error page if we got one
 */
exports.getDashboard = async (req, res, next) => {
    let date = new Date().toISOString().substr(0, 10);
    const page = +req.query.page || 1;
    let startHours = 8;

    try {
        const totalItem = await Desktop.findAndCountAll();
        const totalPage = Math.ceil(totalItem.count / ITEM_PER_PAGE)
        if (page > totalPage && totalItem.count != 0) {
            return res.redirect('/dashboard');
        }

        const desktopInfo = await Desktop.findAll({
            offset: (page - 1) * ITEM_PER_PAGE, 
            limit: ITEM_PER_PAGE
        });
        
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
            assignInfo,
            date,
            totalItem: totalItem.count,
            hasNextPage: ITEM_PER_PAGE * page < totalItem.count,
            hasPreviousPage: page > 1,
            nextPage: page + 1,
            previousPage: page - 1,
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
 * @throws will redirect to error page if we got one
 */
exports.postDashboardDate = async (req, res, next) => {
    const { date } = req.body;
    const page = +req.query.page || 1;
    let startHours = 8;

    try {
        const totalItem = await Desktop.findAndCountAll();
        const totalPage = Math.ceil(totalItem.count / ITEM_PER_PAGE);
        if (page > totalPage && totalItem.count != 0) {
            return res.redirect('/dashboard');
        }

        const desktopInfo = await Desktop.findAll({
            offset: (page - 1) * ITEM_PER_PAGE, 
            limit: ITEM_PER_PAGE
        });

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
            assignInfo,
            date,
            totalItem: totalItem.count,
            hasNextPage: ITEM_PER_PAGE * page < totalItem.count,
            hasPreviousPage: page > 1,
            nextPage: page + 1,
            previousPage: page - 1,
        });
    } catch (error) {
        const err = new Error(error);
        err.httpStatusCode = 500;
        return next(err);
    }
}