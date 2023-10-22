const express = require('express')
const app = express()


//req.body获取前端发来的json格式的数据
const bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))


var mysql = require('mysql');
var conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345678',
    database: 'calculator'
});

conn.connect();

//跨域请求
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Authorization,X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method')
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PATCH, PUT, DELETE')
    res.header('Allow', 'GET, POST, PATCH, OPTIONS, PUT, DELETE')
    next();
});

app.post('/insert', function (req, res) {
    
    var sql = "insert into cal(cal_time,cal_express,cal_result) values(?,?,?)";
    console.log(req.body);
    var params = req.body;
    var paramsArr = [];
    for (var obj in params){
        paramsArr.push(params[obj]);
    }

    conn.query(sql, paramsArr, function (err, result) {
        if (err) {
            console.log('insert error:', err.message);
            return;
        }
        console.log('insert success');
        
    })
   
});


app.get('/clear', function (req, res) {
    var sql = 'truncate table cal';
    conn.query(sql, function (err, result) {
        if (err) {
            console.log("clear error:", err.message);
            return;
        }
        res.send('clear success!');
        console.log("clear table");
    }) 

});


app.get('/ans', function (req, res) {
    var sql = 'select cal_time,cal_express,cal_result,cal_id from cal order by cal_id desc limit 10';
    conn.query(sql, function (err, result) {
        if (err) {
            console.log('select error:', err.message);
            return;
        }
       console.log("select success");
        if (result.length == 0) {
            res.send("");
            return console.log('数据为空'); 
        }

        //返回数据
        var dataObj = {
            "msg": "数据获取成功",
            "data": result
        };
        var dataStr = JSON.stringify(dataObj);
        res.send(dataStr);
        
    })
});







//监听8080端口
app.listen(3006, () => {
    console.log('3002端口正在监听中...');
});


// var mysql = require('mysql');
// var conn = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '123456',
//     database: 'calculator'
// });
// conn.connect();
// var values = ["123456", "8+2", "10"];
// var sql = 'insert into cal(cal_time,cal_express,cal_result) values (?,?,?)';

// conn.query(sql, values, function (err, rows, field) {
//     if (err) {
//         console.log('insert error:',err.message);
//         return;
//     }
//     console.log('insert success');

// });



