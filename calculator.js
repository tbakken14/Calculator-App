let result = document.getElementById("resultant");
let curr = document.getElementById("current")
let is_decimal = false;
let buttons = document.getElementsByTagName("button");
let operands = [];
let operators = [];


for (let i = 0; i < buttons.length; i++) {
    let button = buttons[i];
    button.addEventListener("click", buttonClickHandler, false);
}

function operate(val) {
    switch (val) {
        case ("+"):
        case ("-"):
            appendOperand();
            executeQueue();
            appendOperation(val);
            updateDisplay();
            break;
        case ("x"):
        case ("÷"):
            appendOperand();
            appendOperation(val);
            updateDisplay();
            break;
        case ("="):
            appendOperand();
            executeQueue();
            updateDisplay();
            break;
        default:
            break;
    }
};

function appendOperation(val) {
    if (operands.length > operators.length) {
        operators.push(val);
    }
    else if (operators.length == operands.length) {
        operators[operators.length - 1] = val;
    }
};

function appendOperand() { 
    if (curr.innerHTML != "") {
        if (operands.length > operators.length) {
            resetOpQueues();
        }
        operands.push(parseFloat(curr.innerHTML));
    }
};

function resetOpQueues() {
    operators = [];
    operands = [];
};

function executeQueue() {
    while (operands.length > 1) {
        switch(operators.pop()) {
            case ("+"):
                operands.push(operands.pop() + operands.pop());
                break;
            case ("-"):
                first = operands.pop();
                second = operands.pop();
                operands.push(second - first);
                break;
            case ("x"):
                operands.push(operands.pop() * operands.pop());
                break;
            case ("÷"):
                first = operands.pop();
                second = operands.pop();
                operands.push(second / first);
                break;
            case ("%"):
                first = operands.pop();
                second = operands.pop();
                operands.push(second % first);
            default:
                break;
        }
    }
};

function allClear() {
    operands = [];
    operators = [];
    updateDisplay();
};

function invertCurr() {
    if (curr.innerHTML != "") {
        if (curr.innerHTML[0] == '-') {
            curr.innerHTML = curr.innerHTML.slice(1);
        }
        else {
            curr.innerHTML = "-" + curr.innerHTML;
        }
    }
};

function updateDisplay() {
    setResult();
    resetCurr();
};

function setResult() {
    if (operands.length == 0) {
        result.innerHTML = "";
    }
    else {
        result.innerHTML = operands[0].toString();
        for (let i = 1; i < operands.length; i++) {
            result.innerHTML += " " + operators[i - 1];
            result.innerHTML += " " + operands[i].toString();
        }
        if (operands.length == operators.length) {
            result.innerHTML += " " + operators[operators.length - 1];
        }
    }
};

function resetCurr() {
    curr.innerHTML = "";
    is_decimal = false;
};

function appendDigit(val) { 
    curr.innerHTML = curr.innerHTML + val;
};

function appendDecimal() {
    if (!is_decimal) {
        is_decimal = true;
        curr.innerHTML = curr.innerHTML + ".";
    }
};

function funcSelect(val) {
    console.log(val);
    switch (val) {
        case ("AC"):
            allClear();
            break;
        case ("<sup>+</sup>/-"):
            console.log("hey");
            invertCurr();
            break;
        case ("%"):
            appendOperand();
            executeQueue();
            appendOperation(val);
            updateDisplay();
            break;
        default:
            break;
    }
};

function buttonClickHandler() {
    switch (this.classList[0]) {
        case ("digit"):
            appendDigit(this.innerHTML);
            break;
        case("decimal"):
            appendDecimal();
            break;
        case("func"):
            funcSelect(this.innerHTML);
            break;
        case("operator"):
            operate(this.innerHTML);
            break;
        default:
            break;
    }
    console.log(this.classList[0]);
    console.log(operands, operators);
};