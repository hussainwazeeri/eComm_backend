/**
 *  POST localhost:8000/ecomm/api/v1/auth/signup
 * 
 * I need to intercept this
 */
const authController = require('../controllers/auth.controller')
module.exports = (app) => {
    // app.post('/ecomm/api/v1/auth/signup', handover to the right controller)
    app.post('/ecomm/api/v1/auth/signup', authController.signup)
}