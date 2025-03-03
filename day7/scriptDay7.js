document.addEventListener('DOMContentLoaded', function () {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.btn');

    let currentInput = '';
    let operator = null;
    let previousInput = '';

    buttons.forEach(button => {
        button.addEventListener('click', function () {
            const value = this.getAttribute('data-value');

            if (value === 'C') {
                currentInput = '';
                previousInput = '';
                operator = null;
                display.value = '';
            } else if (value === 'DEL') {
                currentInput = currentInput.slice(0, -1);
                display.value = currentInput;
            } else if (value === '=') {
                if (operator && previousInput !== '' && currentInput !== '') {
                    currentInput = calculate(previousInput, currentInput, operator);
                    display.value = currentInput;
                    previousInput = '';
                    operator = null;
                }
            } else if (['+', '-', '*', '/'].includes(value)) {
                if (currentInput !== '') {
                    if (previousInput === '') {
                        previousInput = currentInput;
                        currentInput = '';
                    } else {
                        previousInput = calculate(previousInput, currentInput, operator);
                        currentInput = '';
                    }
                    operator = value;
                }
            } else {
                currentInput += value;
                display.value = currentInput;
            }
        });
    });

    function calculate(num1, num2, operator) {
        num1 = parseFloat(num1);
        num2 = parseFloat(num2);

        switch (operator) {
            case '+':
                return (num1 + num2).toString();
            case '-':
                return (num1 - num2).toString();
            case '*':
                return (num1 * num2).toString();
            case '/':
                return (num1 / num2).toString();
            default:
                return '';
        }
    }
});