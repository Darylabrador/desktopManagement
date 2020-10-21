/**
 * Controller for authentication
 */

// Model import
const User = require('../models/desktop');

// Middleware import 
const { validationResult } = require('express-validator');


/**
 * Get login page
 */
exports.getLogin = (req, res, next) => {
    if(req.session.userId) {
        return res.redirect('/dashboard');
    }
    res.render('index');
}

/**
 * Handle post login
 */
exports.postLogin = async (req, res, next) => {
    const { mail, password } = req.body;

    try {
        
    } catch (error) {
        
    }
}