var favicon = require('serve-favicon');

module.exports = function(app) {
    app.use(favicon("./Public/Images/logo.png"));
}