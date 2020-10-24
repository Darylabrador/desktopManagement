/**
 * Controller for assignment
 */


// Model import
const Client  = require('../models/client');
const Desktop = require('../models/desktop');
const Assign  = require('../models/assign');


// package import
const { validationResult } = require('express-validator');


/**
 * Handle post add assign
 *
 * @function addAssign
 * @throws Will throw an error if one error occursed
 */
exports.addAssign = async (req, res, next) => {
    const { currentDate, hours, desktopId, client} = req.body;
    const clientId = client.split(' - ')[0];
    let startHours = 8;
    const errors = validationResult(req);

    // handle error from input validation
    if (!errors.isEmpty()) {
        return res.status(422).render('dashboard', {
            hasError: true,
            errorMessage: errors.array()[0].msg
        });
    }

    try {
        // search if it exist
        const assignExist = await Assign.findOne({
            where: {
                date: currentDate, 
                hours, desktopId
            }
        });

        // create all possible line        
        if (!assignExist) {
            for (let i = 0; i < 10; i++) {
                let hoursInfo = startHours + i;
                const assignDesktop = new Assign({
                    date: currentDate, 
                    hours: hoursInfo, 
                    desktopId
                });
                await assignDesktop.save();
            }
            
            // first assign
            const assignDesktop = await Assign.findOne({
                where: {
                    date: currentDate,
                    hours, desktopId
                }
            });

            assignDesktop.clientId = clientId;
            await assignDesktop.save();
            req.flash('success', 'Attribution effectuée');
            return res.redirect('/dashboard');
        }

        // if the line already exist, assign directly
        assignExist.clientId = clientId;
        await assignExist.save();
        req.flash('success', 'Attribution effectuée');
        return res.redirect('/dashboard');
        
    } catch (error) {
        const err = new Error(error);
        err.httpStatusCode = 500;
        return next(err)
    }
}


/**
 * Handle post delete assign
 *
 * @function deleteAssign
 * @throws Will throw an error if one error occursed
 */
exports.deleteAssign = async (req, res, next) => {
    const { idAssign } = req.body;

    try {
        const assignExist = await Assign.findByPk(idAssign);
        if (!assignExist) {
            req.flash('error', 'Créneau introuvable');
            return res.redirect('/dashboard');
        }
        assignExist.clientId = null;
        await assignExist.save();
        req.flash('success', 'Suppression effectuée');
        return res.redirect('/dashboard');
    } catch (error) {
        const err = new Error(error);
        err.httpStatusCode = 500;
        return next(err);
    }
}