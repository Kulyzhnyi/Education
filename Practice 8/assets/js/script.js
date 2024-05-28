// Об'єкт для зберігання стану калькулятора
const calculator = {
    displayValue: '0',        // Поточне значення на дисплеї
    firstOperand: null,       // Перший операнд для операцій
    waitingForSecondOperand: false, // Чи очікуємо на другий операнд
    operator: null,           // Поточний оператор
};

// Функція для обробки введення цифр
function inputDigit(digit) {
    const { displayValue, waitingForSecondOperand } = calculator;

    // Якщо очікуємо другий операнд, оновлюємо дисплей новою цифрою
    if (waitingForSecondOperand === true) {
        calculator.displayValue = digit;
        calculator.waitingForSecondOperand = false;
    } else {
        // Якщо дисплей показує "0", замінюємо його на введену цифру, інакше додаємо цифру до поточного значення
        calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
    }
}

// Функція для обробки введення десяткової точки
function inputDecimal(dot) {
    // Якщо очікуємо другий операнд, не додаємо десяткову точку
    if (calculator.waitingForSecondOperand === true) return;

    // Якщо в поточному значенні на дисплеї вже є десяткова точка, не додаємо її вдруге
    if (!calculator.displayValue.includes(dot)) {
        calculator.displayValue += dot;
    }
}

// Функція для обробки операторів
function handleOperator(nextOperator) {
    const { firstOperand, displayValue, operator } = calculator;
    const inputValue = parseFloat(displayValue);

    // Якщо вже вибрано оператор і очікуємо другий операнд, замінюємо оператор
    if (operator && calculator.waitingForSecondOperand)  {
        calculator.operator = nextOperator;
        return;
    }

    // Якщо перший операнд не встановлено, зберігаємо введене значення як перший операнд
    if (firstOperand == null) {
        calculator.firstOperand = inputValue;
    } else if (operator) {
        // Якщо вже вибрано оператор, виконуємо обчислення з першим операндом і введеним значенням
        const result = performCalculation[operator](firstOperand, inputValue);

        // Оновлюємо дисплей і зберігаємо результат як перший операнд
        calculator.displayValue = `${parseFloat(result.toFixed(7))}`;
        calculator.firstOperand = result;
    }

    // Встановлюємо прапорець очікування другого операнда і зберігаємо оператор
    calculator.waitingForSecondOperand = true;
    calculator.operator = nextOperator;
}

// Об'єкт для обчислення операцій
const performCalculation = {
    '/': (firstOperand, secondOperand) => firstOperand / secondOperand,
    '*': (firstOperand, secondOperand) => firstOperand * secondOperand,
    '+': (firstOperand, secondOperand) => firstOperand + secondOperand,
    '-': (firstOperand, secondOperand) => firstOperand - secondOperand,
    '%': (firstOperand, secondOperand) => firstOperand * (secondOperand / 100), // Обчислення відсотків
    '=': (firstOperand, secondOperand) => secondOperand
};

// Функція для скидання калькулятора до початкового стану
function resetCalculator() {
    calculator.displayValue = '0';
    calculator.firstOperand = null;
    calculator.waitingForSecondOperand = false;
    calculator.operator = null;
}

// Функція для оновлення дисплея калькулятора
function updateDisplay() {
    const display = document.querySelector('.calculator-screen');
    display.value = calculator.displayValue;
}

updateDisplay(); // Початкове оновлення дисплея

// Обробка натискань на кнопки
const keys = document.querySelector('.calculator-keys');
keys.addEventListener('click', (event) => {
    const { target } = event;

    // Перевірка, чи натиснута кнопка
    if (!target.matches('button')) {
        return;
    }

    // Обробка операторів
    if (target.classList.contains('operator')) {
        handleOperator(target.value);
        updateDisplay();
        return;
    }

    // Обробка десяткової точки
    if (target.classList.contains('decimal')) {
        inputDecimal(target.value);
        updateDisplay();
        return;
    }

    // Обробка кнопки "AC" (скидання)
    if (target.classList.contains('all-clear')) {
        resetCalculator();
        updateDisplay();
        return;
    }

    // Обробка введення цифр
    inputDigit(target.value);
    updateDisplay();
});
