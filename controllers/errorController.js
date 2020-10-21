/**
 * Handling error 404
 *
 * Render the error page
 * @function getLogin
 * @returns {VIEW} error view
 */
exports.get404 = (req, res, next) => {
    res.status(404).render('error', {
        statusCode: '404'
    });
};