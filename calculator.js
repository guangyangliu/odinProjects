function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}
function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a/b;
}
let firstNumber;
let secondNumber;
let operator;

function operate(operator, firstNumber, secondNumber) {
    switch(operator) {
        case "+" :
            return add(firstNumber, secondNumber);
        case "-" :
            return multiply(firstNumber, secondNumber);
        case "*" :
            return divide(firstNumber, secondNumber);
        case "/" :
            return divide(firstNumber, secondNumber);
        default:
            return undefined;  
    }
}

function display() {
    let buttons = document.querySelector("#buttons");
    buttons.addEventListener('click', (event)=> {
        let target = event.target;
        let displayDiv = document.querySelector("#display");
        let buttonContent = target.textContent;
        if (buttonContent.length == 1) {
            if(buttonContent === "C") {
                displayDiv.textContent = "diplay area";
            } else if(buttonContent === "=") {
                displayDiv.textContent = "solution";
            } else {
                displayDiv.textContent = buttonContent;
            }
        }
    });
}
display();