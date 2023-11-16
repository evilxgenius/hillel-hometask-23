// Створити клас SuperMath.
// Додати до екземпляра метод - check(obj), параметр obj якого має властивості X, Y, znak.
// Метод повинен підтвердити у користувача, чи хоче він зробити дію znak c Х і У.
// Якщо хоче, зробити математичну дію znak (яка описана в прототипі),
// інакше - запитати введення нових даних через метод input() класу SuperMath.
//
// Приклад об'єкта: `obj = {X:12, Y:3, znak: “/”}`, можливі варіанти znak => `+ - / * %`.
// При введенні znak потрібно перевірити коректність введення на можливі математичні дії.
// p = new SuperMath();
// p.check(obj); // --> no p.input() -> 3 prompt -> рахує

class SuperMats {
    input() {
        let x, y, operation, result;

        x = this._numberInput('x');
        if (x === null) return;

        operation = this._mathOperationSignInput();
        if (operation === null) return;

        y = this._numberInput('y');
        if (y === null) return;

        result = this._mathOperation({X: x, znak: operation, Y: y});

        if(result) alert(`${x} + ${y} = ${result}`)
    }

    _numberInput(pos) {
        let number = NaN;

        while (isNaN(number)) {
            let answer = prompt(`enter ${pos}:`);

            // if the user clicks Cancel, the script will say 'Bye'
            if (answer === null)
                return null;
            // If the user inputs '' or NaN, the script ask the user to input a number again
            else if (answer.trim().length === 0 || Number.isNaN(+answer))
                alert(`Number #${pos}: You passed <${answer}>. Please pass a Number!`);
            else
                number = +answer;
        }

        return number;
    }

    _mathOperationSignInput() {
        while (true) {
            let answer = prompt('operation sign (+ - * / %):');

            if (answer === null)
                return null;
            else if (['+', '-', '*', '/', '%'].includes(answer.trim()))
                return answer;
            else
                alert(`Math operation sign: You passed <${answer}>. Possible signs -> + - * / %`);
        }
    }

    _mathOperation({X: x, znak: operation, Y: y}) {
        if(['/', '%'].includes(operation) && y === 0) {
            alert("You can't divide to zero!!!");
            return null;
        }

        switch (operation) {
            case '+': return x + y;
            case '-': return x - y;
            case '*': return x * y;
            case '/': return x / y;
            case '%': return x % y;
        }
    }
}

const calculator = new SuperMats();
const calculations = { X: 123, Y: 2, znak: '/' }

calculator.check = function(obj) {
    const message =
        `Use passed object? { X: ${obj['X']}, Y: ${obj['Y']},` +
        `znak: ${obj['znak']} } (If no, It will call manual inputs)`;

    if (!confirm(message)) {
        this.input();
        return;
    }

    if (!['+', '-', '*', '/', '%'].includes(obj['znak'].trim())) {
        alert("Object contains wrong 'znak'. You can pass only + - * / %");
        return;
    }

    if ((typeof obj['X'] === 'string' || typeof obj['Y'] === 'string') && obj['znak'] === '+') {
        alert("Operation '+': X or Y is string. It's usual concatenation!");
        return;
    } else if (isNaN(obj['X']) || isNaN(obj['Y'])) {
        alert('One of the passed "numbers" is not a Number. Check it please!');
        return;
    }

    const result = this._mathOperation(obj);

    if(result) alert(`${obj['X']} + ${obj['Y']} = ${result}`)
}

calculator.check(calculations);