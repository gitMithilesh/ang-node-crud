var express = require('express');
var cors = require('cors');
var app = express();

var mysql = require('mysql');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var os = require('os');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "node"
});

console.log(os.userInfo());

app.use(cors());
// app.use(bodyParser);
app.use(jsonParser);

app.get('/', function (req, res) {
    res.send('Node JS Api');
 })
 
 app.get('/users', function (req, res) {
    con.query("SELECT * FROM users", function (err, result, fields) {
        if (err) throw err;
        // console.log(result);
        res.json(result);
    }); 
 })

 app.post('/add-user', function (req, res) {
     console.log(req.body);
     var id = req.body.id, uname = req.body.username;
     console.log(id, uname);
    var sql = "INSERT INTO users SET ? ";
    console.log(sql);
    con.query(sql, req.body, function (err, result) {
        if (err){
            return res.status(400).json({
                success : false,
                message : "There was an error inserting row.",
                err : err
            });
        }else{
            return res.status(200).json({
                success : true,
                message : "1 record inserted",
                data : result
            });
        }
    });
});

app.post('/delete-user', function (req, res) {
    console.log(req.body);
    var id = req.body.userId;
    console.log(id);
    var sql = "DELETE FROM users WHERE id = "+ id ;
    console.log(sql);
    con.query(sql, req.body, function (err, result) {
        if (err){
            return res.status(400).json({
                success : false,
                message : "There was an error deleting row.",
                err : err
            });
        }else{
            return res.status(200).json({
                success : true,
                message : "1 record deleted",
                data : result
            });
        }
    });
});

app.post('/update-user', function (req, res) {
    console.log(req.body);
    var sql = "UPDATE users SET name ='" + req.body.name + "', username ='" + req.body.username + "', password ='" + req.body.password + "', mobile ='" + req.body.mobile + "' WHERE id = "+ req.body.id ;
    // var sql = "UPDATE users SET ? ";

    console.log(sql);
    con.query(sql, req.body, function (err, result) {
        if (err){
            return res.status(400).json({
                success : false,
                message : "There was an error updating row.",
                err : err
            });
        }else{
            return res.status(200).json({
                success : true,
                message : "1 record updated.",
                data : result
            });
        }
    });
});
// con.end();
 var server = app.listen(1200, function () {
    var host = server.address().address
    var port = server.address().port
    
    console.log("Example app listening at http://%s:%s", host, port)
 })