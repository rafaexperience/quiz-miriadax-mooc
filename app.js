var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// Módulo para HTML común
var partials = require('express-partials');

// Módulo para encapsular el método
var methodOverride = require('method-override');

// Guardar sesión de usuario
var session = require('express-session');

// Obtención de rutas
var routes = require('./routes/index');
//var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// FAVICON
app.use(favicon(__dirname + '/public/favicon.ico'));

app.use(logger('dev'));
app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded());

// Semilla añadida para crifrar cookie
app.use(cookieParser('Quiz 2015'));

app.use(express.static(path.join(__dirname, 'public')));

// Uso de express-partials
app.use(partials());

// Uso de method-override
app.use(methodOverride('_method'));

// Uso de express-session
app.use(session());

// Helpers dinámicos
app.use(function(req, res, next) {
    
    // Se gguarda la ruta de cada solicitud HTTP en la variable session.redir para poder
    // redireccionar a la vista anterior después de hacer login o logout.
    if (!req.path.match(/\/login|\/logout/)) {
        req.session.redir = req.path;
    }
    
    // Se copia la sesión que está accesible en req.session en res.locals.session para que
    // esté accesible en las vistas.
    res.locals.session = req.session;
    next();
});


// Rutas
app.use('/', routes);
//app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err,
            errors: []
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {},
        errors: []
    });
});


module.exports = app;
