var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");
var listRouter = require('./routes/list');
var BaseRouter = require('./routes/getList');
var TestRouter = require('./routes/test');
var Upate = require('./routes/update');
const schedule = require('node-schedule');

var app = express();
Upate();
scheduleCronstyle();
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", '3.2.1')
    if (req.method == "OPTIONS") res.send(200); /*让options请求快速返回*/
    else next();
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/getList', listRouter);
app.use('/getBase', BaseRouter);
app.use('/test', TestRouter)

function scheduleCronstyle() {
    schedule.scheduleJob('* 1 * * * *', function() {
        Upate();
    });
}

module.exports = app;