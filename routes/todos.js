/**
 * Created by root on 2/11/17.
 */
/**
 * Created by root on 2/11/17.
 */
var express = require('express');
var router = express.Router();
var mysql = require('mysql');

//MySql Connection
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'jeremiah29:11',
    database: 'ionic2'
});

connection.connect();

//Get Todos
router.get('/todos', function (req, res, next) {
    connection.query('SELECT * FROM users', function (err, rows, fields) {
        if (err) {
            res.send(err);
        } else {
            res.json(rows);
        }
    })
});

//Get Single Todos
router.get('/todo/:id', function (req, res, next) {
    connection.query('SELECT * FROM users WHERE user_id=' + req.params.id, function (err, row, fields) {
        if (err) {
            res.send(err);
        } else {
            res.json(row);
        }
    })
});

//Set Todos
router.post('/todo', function (req, res, next) {
    var todo = req.body;
    if (!todo.text || (todo.isCompleted + '')) {
        res.status(400);
        res.json({
            'error': "Invalid Data"
        });
    } else {
        connection.query('INSERT INTO users SET ?', todo, function (err, res) {
            if (err) {
                res.send(err);
            } else {
                res.json(res);
            }
        })
    }
});

//Update Todos
router.put('/todo/:id', function (req, res, next) {
    var todo = req.body;
    var updObj = {};

    if (todo.isCompleted) {
        updObj.isCompleted = todo.isCompleted;
    }

    if (todo.text) {
        updObj.text = todo.text;
    }

    if (!updObj) {
        res.status(400);
        res.json({
            'error': "Invalid Data"
        });
    }
    else {
        connection.query('UPDATE users SET user_name=?,password=? WHERE user_id=' + req.params.id, updObj, function (err, res) {
            if (err) {
                res.send(err);
            } else {
                res.json(res);
            }
        })
    }
});

//Delete Todos
router.delete('/todo/:id', function (req, res, next) {
    connection.query('DELETE FROM users  WHERE user_id=' + req.params.id, function (err, res) {
        if (err) {
            res.send(err);
        } else {
            res.json(res);
        }
    });
});

module.exports = router;

