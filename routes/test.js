var express = require('express');
const dyttReptitle = require('dytt-reptitle-v2');

var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1',
    database: 'DATALIST'
});

connection.connect();

function UpdateDataBase() {
    var sql = `DELETE FROM dataList`;
    connection.query(sql, (error, results, fields) => {
        if (error)
            return console.error(error.message);

        console.log('clear data');

    });
}

module.exports = UpdateDataBase;