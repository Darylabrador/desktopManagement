/**
 * Controller for authentication
 */

// Model import
const User = require('../models/desktop');

// Package imports
const { validationResult } = require('express-validator');
const bcrypt               = require('bcryptjs');


/**
 * Get login page
 * @returns index view or dashboard depending on session
 */
exports.getLogin = (req, res, next) => {
    if(!req.session.userId) {
        return res.redirect('/dashboard');
    }
    res.render('index',{
        errorMessage: null,
        hasError: false,
        validationErrors: [],
    });
}



/**
 * Handle post login
 * @param {String} mail
 * @param {String} password
 */
exports.postLogin = async (req, res, next) => {
    const { mail, password } = req.body;
    const errors = validationResult(req);

    // Handle input validation errors
    if(!errors.isEmpty()){
        console.log(errors)
        return res.status(422).render('index', {
            hasError: true,
            errorMessage: errors.array()[0].msg,
            validationErrors: errors.array(),
            oldInput: {
                email: email
            }
        })
    }

    try {
        const userExist = await User.findOne({ where: {mail}});

        if(!userExist){
            req.flash('error', 'Email ou mot de passe invalide');
            return res.redirect('/');
        }

        const isEqual = await bcrypt.compare(password, userExist.password);

        if(isEqual){
            req.session.userId = userExist.id;
            req.session.isLoggedIn = true;
            return req.session.save(err => {
                if(err){
                    console.log(err);
                }
                res.redirect('/dashboard');
            });
        }

        req.flash('error', 'Email ou mot de passe invalide');
        res.redirect('/');
    } catch (error) {
        const err = new Error(error);
        err.httpStatusCode = 500;
        return next(err);
    }
}



/**
 * Handle logout
 *
 * @function logout
 * @returns {VIEW} redirect to '/'
 */
exports.logout = (req, res, next) => {
    req.session.destroy((err) => {
        if (err) {
            console.log(err);
        }
        res.redirect('/');
    });
};