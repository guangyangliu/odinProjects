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
            return subtract(firstNumber, secondNumber);
        case "*" :
            return multiply(firstNumber, secondNumber);
        case "/" :
            return divide(firstNumber, secondNumber);
        default:
            return undefined;  
    }
}

let displayDiv = document.querySelector("#display");

function display() {
    let buttons = document.querySelector("#buttons");
    buttons.addEventListener('click', (event)=> {
        let target = event.target;
        let buttonContent = target.textContent;
        let buttonClasslist = target.classList;
        if(buttonClasslist.contains("clear")) {
                firstNumber = undefined;
                secondNumber = undefined;
                operator = undefined;
                displayDiv.textContent = "0";
        }

        if(buttonClasslist.contains("eval")) {
            if(secondNumber !== undefined) {
                eval();
            } else {
                displayDiv.textContent = "Error!";
            }
        }

        if(buttonClasslist.contains("number")) {
            if(operator === undefined) {
                firstNumber = firstNumber?Number("0"+firstNumber+buttonContent):Number(buttonContent);
                displayDiv.textContent = firstNumber;
            } else {
                secondNumber = secondNumber?Number("0"+secondNumber+buttonContent):Number(buttonContent);
                displayDiv.textContent = secondNumber;
            }
            
        }

        if(buttonClasslist.contains("operator")) {
            if(secondNumber !== undefined) {
                eval();
            } else if(firstNumber !== undefined) {
                displayDiv.textContent = buttonContent;
            }
            operator = buttonContent;
        }
    });
}

function eval() {
    if(operator === "/" && secondNumber === 0) {
        displayDiv.textContent = "Can't divide by 0";
        return;
    }
    let result = operate(operator, firstNumber, secondNumber);
    result = Number(result.toFixed(8));
    firstNumber = result;
    secondNumber = undefined;
    operator = undefined;
    displayDiv.textContent = result;
}
display();