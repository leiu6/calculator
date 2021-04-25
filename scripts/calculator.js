let outputString = '';
const display = document.querySelector(".displayArea");
let currentNumber = new String();
let altNumber = new String();
let mode = "deg";

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

//basic math operators
const divide = document.querySelector("#divide");
const multiply = document.querySelector("#multiply");
const subtract = document.querySelector("#subtract");
const add = document.querySelector("#add");
const equals = document.querySelector("#equals");

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


//process input from other buttons
deg.onclick = toggleDeg;
rad.onclick = toggleRad;

function processNumber(number) {
    outputString += number;
    currentNumber += number.toString();
    console.log(currentNumber);
    updateDisplay();
}

function updateDisplay() {
    display.textContent = outputString;
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