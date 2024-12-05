document.addEventListener('DOMContentLoaded', () => {
    // Variables pour stocker les valeurs et l'opérateur
    let num1 = '';
    let num2 = '';
    let operator = '';
    let resultDisplayed = false;
    let expression = '';

    const screen = document.getElementById('resultat');

    // Fonction pour mettre à jour l'affichage
    const updateScreen = () => {
        screen.value = expression;
    }

    // Fonction pour effectuer le calcul
    const calculate = () => {
        let res;
        const n1 = parseFloat(num1);
        const n2 = parseFloat(num2);

        // Vérification de la division par zéro
        if (operator === '/' && n2 === 0) {
            res = 'Erreur';
        } else {
            switch (operator) {
                case '+':
                    res = n1 + n2;
                    break;
                case '-':
                    res = n1 - n2;
                    break;
                case 'x':
                    res = n1 * n2;
                    break;
                case '/':
                    res = n1 / n2;
                    break;
                default:
                    return;
            }
        }

        
        expression = res.toString();
        updateScreen();
        num1 = expression;
        num2 = '';
        operator = '';
        resultDisplayed = true;
    }

    // Récupérer les boutons chiffres
    const numButtons = document.querySelectorAll('.num');
    numButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            // Si un résultat a été affiché, recommencer une nouvelle expression
            if (resultDisplayed) {
                num1 = e.target.innerText;
                num2 = '';
                operator = '';
                expression = num1;
                resultDisplayed = false;
            } else {
                //
                if (operator === '') {
                    num1 += e.target.innerText;
                    expression += e.target.innerText;
                } else {
                    num2 += e.target.innerText;
                    expression += e.target.innerText;
                }
            }
            updateScreen();
        });
    });

    // Récupérer le bouton de la virgule
const decimalButton = document.getElementById('virgule');
decimalButton.addEventListener('click', (e) => {
    // Si un résultat a été affiché, recommencer une nouvelle expression
    if (resultDisplayed) {
        num1 = '0.';
        num2 = '';
        operator = '';
        expression = num1;
        resultDisplayed = false;
    } else {
        // Vérifier si la virgule est déjà présente dans le nombre
        if (operator === '') {
            if (!num1.includes('.')) {
                num1 += '.';
                expression += '.';
            }
        } else {
            if (!num2.includes('.')) {
                num2 += '.';
                expression += '.';
            }
        }
    }
    updateScreen();
});

    // Récupérer les boutons opérateurs
    const operatorButtons = document.querySelectorAll('.operator');
    operatorButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            // Si num1 est vide, ne rien faire
            if (num1 === '') return;

            // Si un opérateur existe déjà, on effectue le calcul avant d'en rajouter un autre
            if (operator !== '' && num2 !== '') {
                calculate();
            }

            operator = e.target.innerText;
            expression += ` ${operator} `;
            updateScreen();
        });
    });

    const equalButton = document.getElementById('egal');
    equalButton.addEventListener('click', () => {
        if (num1 && num2 && operator) {
            calculate();
        } else if (num1 && operator && num2 === '') {
            // Si on a un opérateur mais pas de num2 (ex: 5 +)
            num2 = num1;
            calculate();
        }
    });

    // Bouton effacer
    const clearButton = document.querySelector('.effacer');
    clearButton.addEventListener('click', () => {
        num1 = '';
        num2 = '';
        operator = '';
        expression = '';
        updateScreen();
    });

    // Bouton pour effacer le dernier caractère (CE)
    const clearLastButton = document.querySelector('.effacer-der');
    clearLastButton.addEventListener('click', () => {
        expression = expression.slice(0, -1);
        if (operator === '' && num1.length > 0) {
            num1 = num1.slice(0, -1);
        } else if (operator !== '') {
            num2 = num2.slice(0, -1);
        }
        updateScreen();
    });

    // Bouton pour changer le signe (+/-)
    const changeSignButton = document.querySelector('[aria-label="Changer le signe"]');
    changeSignButton.addEventListener('click', () => {
        if (num1) {
            num1 = (parseFloat(num1) * -1).toString();
            expression = expression.slice(0, -num1.length) + num1;
        }
    });

    // Bouton pour le pourcentage
    const percentageButton = document.getElementById('pourcentage');
    percentageButton.addEventListener('click', () => {
        if (num1) {
            num1 = (parseFloat(num1) / 100).toString();
            expression = expression.slice(0, -num1.length) + num1; // Mettre à jour l'expression
            updateScreen();
        }
    });

    // Bouton pour inverse (1/x)
    const inverseButton = document.getElementById('inverse');
    inverseButton.addEventListener('click', () => {
        if (num1) {
            num1 = (1 / parseFloat(num1)).toString();
            expression = expression.slice(0, -num1.length) + num1; // Mettre à jour l'expression
            updateScreen();
        }
    });

    // Bouton pour carré (x²)
    const squareButton = document.getElementById('carre');
    squareButton.addEventListener('click', () => {
        if (num1) {
            num1 = (Math.pow(parseFloat(num1), 2)).toString();
            expression = expression.slice(0, -num1.length) + num1; // Mettre à jour l'expression
            updateScreen();
        }
    });

    // Bouton pour racine carrée
    const squareRootButton = document.getElementById('racine-carree');
    squareRootButton.addEventListener('click', () => {
        if (num1) {
            num1 = (Math.sqrt(parseFloat(num1))).toString();
            expression = expression.slice(0, -num1.length) + num1; // Mettre à jour l'expression
            updateScreen();
        }
    });
});
