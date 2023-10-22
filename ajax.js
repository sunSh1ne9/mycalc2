const btn = document.getElementById("equal");
const btnClear = document.getElementById("cleardb");
const btnAns = document.getElementById("ans");

const history = document.getElementById("history");
const lastAnsDisplay = document.getElementById("lastAnsDisplay");

const overdis = document.getElementById('overdisplay');
const dis = document.getElementById('display');

const olList = document.getElementsByTagName('ol');

const btnStorage = document.getElementById('storage');
const btnLoan = document.getElementById('loan');

var flag_btnStorage = 0;
var flag_btnLoan = 0;

var flag_btnLive = 0;
var flag_btnDir = 0;

const getMoney = document.getElementById('money');
const getMonth = document.getElementById('month');

const output = document.getElementById('output');

const getres = document.getElementById('getres');

const ansbtn = document.getElementById('ansbtn');

const slist = document.getElementsByClassName('std');
const llist = document.getElementsByClassName('ltd');

let stdArr = new Array(7);
let ltdArr = new Array(5);

let SmonthArr = [];
let SrateArr = [];

let LmonthArr = [];
let LrateArr = [];


//add
btn.addEventListener("click", () => {
    var xhr = new XMLHttpRequest();

    xhr.open("POST", "http://localhost:8080/insert");

    xhr.setRequestHeader("Content-Type", "application/JSON");
    const dataObj = {
        time: '1',
        expression: overdis.innerHTML,
        result: dis.innerHTML
    }
    dataStr = JSON.stringify(dataObj);
    xhr.send(dataStr);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {

            }
        }
    }
});


//clear
btnClear.addEventListener('click', () => {
    var xhr = new XMLHttpRequest();

    xhr.open('GET', 'http://localhost:8080/clear');
    xhr.send();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                alert('清除数据库完成！');
            }
        }
    }


});



//ans
btnAns.addEventListener('click', () => {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:8080/ans');
    xhr.send();




    //设置响应报文的类型为json
    xhr.responseType = 'json';


    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                //每次查询历史记录都 先将ol数组清空
                for (var i = 0; i < olList.length; i++) {
                    olList[i].innerHTML = "";
                }
                //将LastAns清空
                lastAnsDisplay.innerHTML = "";

                if (xhr.response == null) {
                    return;
                }

                console.log(xhr.response);


                //得到数据列表
                var resp = xhr.response.data;

                //获取数据库最新的cal_result
                var lastAns = resp[0].cal_result;
                lastAnsDisplay.innerHTML = lastAns;



                //遍历列表
                for (var i = 0; i < resp.length; i++) {
                    //获取每行数据的json对象
                    // console.log(resp[i]);
                    olList[i].innerHTML = resp[i].cal_express + resp[i].cal_result;
                }

            }
        }
    }
});




















