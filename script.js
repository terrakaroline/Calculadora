let runnigTotal = 0;
let buffer = "0";
let previousOperator = null;
const screen = document.querySelector('.screen');

document.querySelector('.buttons').addEventListener("click", function(event) {
    buttonClick(event.target.innerText);
})

console.log(screen)

function buttonClick(value) {
    if (isNaN(parseInt(value))) {
        handleSymbol(value);
    } else {
        handleNumber(value);
    }
    rerender();
}

function handleNumber(value) {
    if (buffer === "0") {
        buffer = value;
    } else {
        buffer += value;
    }
}

function handleSymbol(value) {
    switch(value) {
        case 'C':
            buffer = "0";
            runnigTotal = 0;
            previousOperator = null;
            break;
        case '=':
            if(previousOperator === null) {
                return;
            }
            flushOperation(parseInt(buffer));
            previousOperator = null;
            buffer = "" + runnigTotal;
            runnigTotal = 0;
            break;
        case '←':
            if (buffer.length === 1) {
                buffer = "0";
            } else {
                buffer = buffer.substring(0, buffer.length - 1); 
            }
            break;
        default:
            handleMath(value);
            break;
    }
}

function handleMath(value) {
    const intBuffer = parseInt(buffer);
    if (runnigTotal === 0) {
        runnigTotal = intBuffer;
    } else {
        flushOperation(intBuffer);
    }

    previousOperator = value;

    buffer = "0";
}

function flushOperation(intBuffer) {
    if(previousOperator === "+") {
        runnigTotal += intBuffer;
    } else if(previousOperator === "-") {
        runnigTotal -= intBuffer;
    } else if(previousOperator === "x") {
        runnigTotal *= intBuffer;
    } else {
        runnigTotal /= intBuffer;
    }
}

function rerender() {
    screen.innerText = buffer;
}