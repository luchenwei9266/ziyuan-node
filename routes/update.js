var express = require('express');
const dyttReptitle = require('dytt-reptitle');

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
    connection.query(sql, 1, (error, results, fields) => {
        if (error)
            return console.error(error.message);

        console.log('清除数据');

        var config = {
            page: 1,
            skip: 0,
            include: ['title', 'imgUrl', 'desc', 'downloadLink', 'descPageLink']
        };

        dyttReptitle(config).then(result => {
            var addSql = 'INSERT INTO dataList(title,imgUrl,`desc`,downloadLink,descPageLink) VALUES ?';
            var values = dealData(result);
            connection.query(addSql, [values], function(err, result) {
                if (err) throw err;
                console.log('重置数据');
            });
        });

    });
}

function dealData(data) {
    var result = [];
    data.forEach(item => {
        result.push(Object.values(item));
    });
    return result;
}

module.exports = UpdateDataBase;
