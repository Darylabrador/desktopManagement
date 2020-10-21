/**
 * Controller for assignment
 */

// Model import
const Client  = require('../models/client');
const Desktop = require('../models/desktop');
const Assign  = require('../models/assign');


// Middleware import 
const { validationResult } = require('express-validator');