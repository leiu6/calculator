let outputString = '';
const display = document.querySelector(".displayArea");
let currentNumber = new String();
let altNumber = new String();
let mode = "deg";
let currentAction = undefined;
let allowsNumberInput = true;
let invToggle = false;
let globalAnswer = new String();

/* initialize buttons */
//initialize all of the numbers
const number0 = document.querySelector("#number0");
const number1 = document.querySelector("#number1");
const number2 = document.querySelector("#number2");
const number3 = document.querySelector("#number3");
const number4 = document.querySelector("#number4");
const number5 = document.querySelector("#number5");
const number6 = document.querySelector("#number6");
const number7 = document.querySelector("#number7");
const number8 = document.querySelector("#number8");
const number9 = document.querySelector("#number9");
const dot = document.querySelector("#dot");

//basic math operators
const divide = document.querySelector("#divide");
const multiply = document.querySelector("#multiply");
const subtract = document.querySelector("#subtract");
const add = document.querySelector("#add");
const equals = document.querySelector("#equals");
const clear = document.querySelector('#clear');

//other
const fact = document.querySelector("#fact");
const percent = document.querySelector("#percent");
const inv = document.querySelector("#inv");
const sin = document.querySelector("#sin");
const ln = document.querySelector("#ln");
const pi = document.querySelector("#pi");
const cos = document.querySelector("#cos");
const log = document.querySelector("#log");
const euler = document.querySelector("#euler");
const tan = document.querySelector("#tan");
const sqrt = document.querySelector("#sqrt");
const answer = document.querySelector("#answer");
const scientific = document.querySelector("#scientific");

//buttons
const deg = document.querySelector("#deg");
const rad = document.querySelector("#rad");
deg.classList.add("enabled");

/* process button input */
//process input from the numpad
number0.onclick = () => {processNumber(0);}
number1.onclick = () => {processNumber(1);}
number2.onclick = () => {processNumber(2);}
number3.onclick = () => {processNumber(3);}
number4.onclick = () => {processNumber(4);}
number5.onclick = () => {processNumber(5);}
number6.onclick = () => {processNumber(6);}
number7.onclick = () => {processNumber(7);}
number8.onclick = () => {processNumber(8);}
number9.onclick = () => {processNumber(9);}
dot.onclick = () => {processNumber('.');}

document.addEventListener('keydown', function(event) {
    if (event.keyCode >= 48 && event.keyCode <= 57) {
        processNumber(event.keyCode - 48);
    }
    else if (event.keyCode == 16) {
        if (event.keyCode == 187) {
            processAction('add');
        }
        else if (event.keyCode == 56) {
            processAction('multiply');
        }
    }
    else if (event.keyCode == 187) {
        completeAction;
    }
    else if (event.keyCode == 189) {
        processAction('subtract');
    }
    else if (event.keyCode == 191) {
        processAction('divide');
    }
    else if (event.keyCode == 67) {
        clearAll;
    }
});

//basic math operations processing
divide.onclick = () => {processAction('divide');}
multiply.onclick = () => {processAction('multiply');}
subtract.onclick = () => {processAction('subtract');}
add.onclick = () => {processAction('add');}
equals.onclick = completeAction;
clear.onclick = clearAll;

//other math operations
pi.onclick = inputPi;
euler.onclick = inputEuler;
fact.onclick = calculateFactorial;
scientific.onclick = scientificNumbers;
percent.onclick = () => {processAction('percent');}
inv.onclick = toggleInversion;
ln.onclick = naturalLog;
log.onclick = baseTenLog;
sqrt.onclick = squareRoot;
exponent.onclick = () => {processAction('exponent');}

//process input from other buttons
deg.onclick = toggleDeg;
rad.onclick = toggleRad;

//other
sin.onclick = () => {trig('sin');}
cos.onclick = () => {trig('cos');}
tan.onclick = () => {trig('tan');}
answer.onclick = answerKey;

function processNumber(number) {
    if (outputString.length > 35) {
        clearAll();
        outputString = 'ERROR!';
        updateDisplay();
    }

    if (allowsNumberInput) {
        outputString += number;
        currentNumber += number.toString();
        updateDisplay();
    }
}

function completeAction() {
    if (currentAction !== undefined) {
        let num1 = parseFloat(currentNumber);
        let num2 = parseFloat(altNumber);
        let answer;
        
        if (currentAction === 'add') {
            answer = num1 + num2;
        }
        else if (currentAction === 'subtract') {
            answer = num2 - num1;
        }
        else if (currentAction === 'multiply') {
            answer = num1*num2;
        }
        else if (currentAction === 'divide') {
            answer = num2 / num1;
        }
        else if (currentAction === 'percent') {
            answer = num2 * parseFloat(1 / 100);
        }
        else if (currentAction == 'exponent') {
            if (invToggle) {
                answer = Math.pow(num2, 1 / num1);
            }
            else {
                answer = Math.pow(num2, num1);
            }
        }

        currentAction = undefined;

        allowsNumberInput = false;
        outputString = answer;
        currentNumber = new String();
        currentNumber += answer;
        altNumber = new String();
        updateDisplay();
    }
}

function processAction(action) {
    allowsNumberInput = true;
    if (currentAction == undefined) {
        currentAction = action;

        altNumber = currentNumber;
        currentNumber = new String();

        if (action == 'add') {
            outputString += '+';
        }
        else if (action == "subtract") {
            outputString += "-";
        }
        else if (action == "divide") {
            outputString += "/";
        }
        else if (action == "multiply") {
            outputString += "*";
        }
        else if (action == "percent") {
            outputString += "%";
        }
        else if (action == "exponent") {
                if (invToggle) {
                    outputString += "<sup>1/y</sup>";
                }
                else {
                    outputString += "^";
                }
        }

        updateDisplay();

    }
}

function updateDisplay() {
    display.innerHTML = outputString;
}

function toggleDeg() {
    mode = "deg";
    deg.classList.add("enabled");
    rad.classList.remove("enabled");
}

function toggleRad() {
    mode = "rad";
    rad.classList.add("enabled");
    deg.classList.remove("enabled");
}

function clearAll() {
    globalAnswer = currentNumber;
    outputString = '';
    currentNumber = new String();
    altNumber = new String();
    currentAction = undefined;
    allowsNumberInput = true;
    updateDisplay();
}

function inputPi() {
    if (allowsNumberInput) {
        currentNumber = Math.PI;
        outputString += currentNumber;
        updateDisplay();
        allowsNumberInput = false;
    }
}

function inputEuler() {
    if (allowsNumberInput) {
        currentNumber = Math.E;
        outputString += currentNumber;
        updateDisplay();
        allowsNumberInput = false;
    }
}

function calculateFactorial() {
        let workingNumber = parseFloat(currentNumber);

        for (let i = parseFloat(currentNumber) - 1; i >= 1; i--) {
            workingNumber *= i;
        }

        outputString = workingNumber;
        updateDisplay();
}

function scientificNumbers() {
    if (currentNumber == '') {
        outputString += '';
    }
    else if (outputString[outputString.length - 1] == 'e') {
        outputString += '';
    }
    else if (allowsNumberInput) {
        outputString += 'e';
        currentNumber += 'e';
    }
    updateDisplay();
}

function toggleInversion() {
    if (invToggle == false) {
        invToggle = true;

        inv.classList.add('enabled');

        //set and remove ids
        answer.textContent = "Rand";
        sin.innerHTML = "sin<sup>-1</sup>";
        cos.innerHTML = "cos<sup>-1</sup>";
        tan.innerHTML = "tan<sup>-1</sup>";
        ln.innerHTML = "e<sup>x</sup>";
        log.innerHTML = "10<sup>x</sup>";
        sqrt.innerHTML = "x<sup>2</sup>";
        exponent.innerHTML = "x<sup>1/y</sup>";
    }
    else if (invToggle == true) {
        invToggle = false;

        inv.classList.remove('enabled');

        //set and remove ids
        answer.textContent = "Ans";
        sin.textContent = "sin";
        cos.textContent = "cos";
        tan.textContent = "tan";
        ln.textContent = "ln";
        log.textContent = "log";
        sqrt.innerHTML = "&Sqrt;";
        exponent.innerHTML = "x<sup>y</sup>";
    }
}

function trig(action) {

    let doConversion = false;

    if (action == 'sin') {
        if (invToggle) {
            currentNumber = Math.asin(currentNumber);
            doConversion = true;
        }
        else {
            if (mode == 'deg') {currentNumber = degToRad(currentNumber);}
            currentNumber = Math.sin(currentNumber);
        }
    }
    else if (action == 'cos') {
        if (invToggle) {
            currentNumber = Math.acos(currentNumber);
            doConversion = true;
        }
        else {
            if (mode == 'deg') {currentNumber = degToRad(currentNumber);}
            currentNumber = Math.cos(currentNumber);
        }
    }
    else if (action == 'tan') {
        if (invToggle) {
            currentNumber = Math.atan(currentNumber);
            doConversion = true;
        }
        else {
            if (mode == 'deg') {currentNumber = degToRad(currentNumber);}
            currentNumber = Math.tan(currentNumber);
        }
    }

    if (doConversion == true && mode == 'deg') {
        currentNumber = radToDeg(currentNumber);
        console.log(currentNumber);
    }

    outputString = currentNumber;
    updateDisplay();
}

function degToRad(deg) {
    return deg * Math.PI / 180;
}
function radToDeg(rad) {
    return rad  * 180 / Math.PI;
}

function answerKey() {
    if (allowsNumberInput) {
        if (invToggle) {
            currentNumber = Math.random();
            outputString += currentNumber;
            updateDisplay();
        }
        else {
            currentNumber = globalAnswer;
            outputString += currentNumber;
            updateDisplay();
        }
    }
}

function naturalLog() {
    if (allowsNumberInput) {
        if (invToggle) {
            currentNumber = Math.exp(currentNumber);
            outputString = currentNumber;
            updateDisplay();
        }
        else {
            currentNumber = Math.log(currentNumber);
            outputString = currentNumber;
            updateDisplay();
        }
    }
}

function baseTenLog() {
    if (allowsNumberInput) {
        if (invToggle) {
            currentNumber = Math.pow(10, currentNumber);
            outputString = currentNumber;
            updateDisplay();
        }
        else {
            currentNumber = Math.log10(currentNumber);
            outputString = currentNumber;
            updateDisplay();
        }
    }
}

function squareRoot() {
    if (allowsNumberInput) {
        if (invToggle) {
            currentNumber = currentNumber * currentNumber;
            outputString = currentNumber;
            updateDisplay();
        }
        else {
            currentNumber = Math.sqrt(currentNumber);
            outputString = currentNumber;
            updateDisplay();
        }
    }
}