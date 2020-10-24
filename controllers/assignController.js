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
 * @param {Date} currentDate
 * @param {String} hours
 * @param {Number} desktopId
 * @param {String} client
 * @throws Will throw an error if one error occursed
 */
exports.addAssign = async (req, res, next) => {
    const { currentDate, hours, desktopId, client} = req.body;
    const clientId = client.split(' - ')[0];
    let startHours = 8;
    const errors = validationResult(req);

    // handle error from input validation
    if (!errors.isEmpty()) {
        return res.status(200).json({
            success: false,
            message: errors.array()[0].msg
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
            return res.status(200).json({
                success: true,
                message: 'Attribution effectuée'
            });
        }

        // if the line already exist, assign directly
        assignExist.clientId = clientId;
        await assignExist.save();
        res.status(200).json({
            success: true,
            message: 'Attribution effectuée'
        })
    } catch (error) {
        return res.status(200).json({
            success: false,
            message: 'Une erreur est survenue'
        });
    }
}


/**
 * Handle post delete assign
 *
 * @function deleteAssign
 * @param {Number} idAssign
 * @throws Will throw an error if one error occursed
 */
exports.deleteAssign = async (req, res, next) => {
    const { idAssign } = req.body;

    try {
        const assignExist = await Assign.findByPk(idAssign);
        if (!assignExist) {
            return res.status(200).json({
                success: false,
                message: 'Créneau introuvable'
            })
        }
        assignExist.clientId = null;
        await assignExist.save();
        res.status(200).json({
            success: true,
            message: 'Suppression effectuée'
        })
    } catch (error) {
        return res.status(200).json({
            success: false,
            message: 'Une erreur est survenue'
        });
    }
}