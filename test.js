const display = document.querySelector('#display');
const buttons = document.querySelectorAll('button');
const overdisplay = document.querySelector('#overdisplay');


function jg(num) {
    // console.log(parseFloat(num.toFixed(7)));
    if ((num | 0) == num) return num;
    return parseFloat(num.toFixed(9));
} 

function start() {


    buttons.forEach((item) => {
        item.onclick = () => {
            if (item.id == 'clear') {
                display.innerText = '';
                overdisplay.innerText = '';
            }

            else if (item.id == 'backspace') {

                var str = display.innerText.toString();
                display.innerText = str.substr(0, str.length - 1);
            }
                
            else if (display.innerText != '' && item.id == 'equal') {
                var str = display.innerText;
                str = str.replace(/ln/g, 'Math.log').replace(/√/g, 'Math.sqrt').replace(/sin/g, 'Math.sin').replace(/\^/g, '**').replace(/cos/g, 'Math.cos').replace(/tan/g, 'Math.tan');
                overdisplay.innerText = display.innerText + "=";
                var ans = eval(str);
                // console.log(ans);
                display.innerText = jg(ans);

                display.innerText = display.innerText.replace('Infinity','Error');


            }
                
            else if (display.innerText == '' && item.id == 'equal') {
                display.innerText = '';
            }
                
            else if (display.innerText != '' && item.id == 'reverse') {
                if (display.innerText != '0') {
                    display.innerText = eval(display.innerText * -1);
                }
            }
                
            else if (item.id >= '0' && item.id <= '9') {
                if (display.innerText == '0') {
                    display.innerText = item.id;
                }
                else {
                    display.innerText += item.id;
                }
            }
                
            else if (item.className == 'btn-operator base') {

                if (display.innerText == '') {
                    if (item.id == '-')
                        display.innerText = item.id;
                }
                else {
                    str = display.innerText;
                    if (str[str.length - 1] >= '0' && str[str.length - 1] <= '9')
                        display.innerText += item.id;
                }
            }
                
            else if (item.id == '.') {
                str = display.innerText;
                if (str[str.length - 1] >= '0' && str[str.length - 1] <= '9') {
                    display.innerText += item.id;
                }
            }
                
            else if (item.id == '(' || item.id == ')') {
                display.innerText += item.id;
            }
                
            else if (item.id == 'fun1') {              
                display.innerText = "1/" + display.innerText ;
            }
                
            else if (item.id == 'fun2') {
                display.innerText = display.innerText + "^";
                
            }
                
            else if (item.id == 'fun3') {
                
                display.innerText += "√(";

            }

            else if (item.id == 'sin') {
                display.innerText += "sin(";
            }

            else if (item.id == 'cos') {
                display.innerText += "cos(";
            }

            else if (item.id == 'tan') {
                display.innerText += "tan(";
            }

            
        }
    })
}

start();



    

