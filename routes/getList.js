var express = require('express');
var router = express.Router();

var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1',
    database: 'DATALIST'
});

connection.connect();

/* GET users listing. */
router.get('/', function(req, res, next) {
    var sql = 'SELECT * FROM dataList';
    connection.query(sql, function(err, result) {
        if (err) throw err;
        res.send(result);
    });
});

module.exports = router;