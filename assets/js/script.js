// Wait for the DOM to finish loading before running the game
// Get the button elements and add event listeners to them

document.addEventListener("DOMContentLoaded", function() {
    let buttons = document.getElementsByTagName("button");

    for (let button of buttons) {
        button.addEventListener("click", function() {
            if (this.getAttribute("data-type") === "submit") {
                checkAnswer();
            } else {
                let gameType = this.getAttribute("data-type");
                runGame(gameType);
            }
        });
    }
    document.getElementById('answer-box').addEventListener('keydown' , function(event){
        //keydown hört ob ein key gedrückt wurde
        if (event.key === 'Enter'){
            checkAnswer();
        }
    })

    runGame('addition');
});


/**
 * Dot string beschreibt function - Dadurch wird die Funktion beschrieben wenn sie woanders gecalled wird:
 * Mein Loop of the game > Called when the game loads and when the users answer is proceed
 */
function runGame(gameType) {
    document.getElementById('answer-box').value='';
    document.getElementById('answer-box').focus();
    //das erste lehrt die answerbox nach dem raten, das zweite bringt den curser immer automatisch in die box!

    // creates two random numbers between 1-25 
    let num1 = Math.floor(Math.random()*25)+1;
    let num2 = Math.floor(Math.random()*25)+1;

    if(gameType === 'addition'){
        displayAdditionQuestion(num1,num2);
    } else if(gameType === 'multiply'){
        displayMultiplyQuestion(num1,num2);
    } else if(gameType === 'subtract'){
        displaySubtractQuestion(num1,num2);
    } else if(gameType === 'division'){
        displayDivisionQuestion(num1,num2);
    } else {
            alert(`Unkown game type: ${gameType}`);
            throw `Unkown game type: ${gameType}. Aborting!`;
            // breaks the code and prints this message
        }
    }

    /**
     * checks if calculated answer (in array) matches the useres guess.
     * we retriev answer from the dom (html)
     */
function checkAnswer() {
    let userAnswer= parseInt(document.getElementById('answer-box').value);
    let calculatedAnswer = calculateCorrectAnswer();
    //returns an array
    let isCorrect = userAnswer ===calculatedAnswer[0];
    //returns true or false
    if (isCorrect) {
        alert('Hey! You got it right! :)');
        incrementScore();
    } else {
        alert(`Àwww... You answered ${userAnswer}. The correct answer was ${calculatedAnswer[0]}!`);
        incrementWrongAnswer();
    }

    runGame(calculatedAnswer[1]);
}

/**
 * parseInt macht das Gegenteil von vorher. (die daten wurden html geholt und definiert (als text))
 * jetzt werden die Variabeln wieder aus html zurückgeholt und richtig definiert. 
 * Die Nummern die vor her random erstellt wurden und der Operator werden jetzt in in den Variabeln gespeichert 
 * und in eine Liste[] gesteckt.
 * Gets numbers and operator directly from DOM! (Das ist in html!! We want to avoid global variabes!)
 * das ergebniss is in a list!
 */
function calculateCorrectAnswer() {
   let operand1 = parseInt(document.getElementById('operand1').innerText);
   let operand2 = parseInt(document.getElementById('operand2').innerText);
   let operator = document.getElementById('operator').innerText;

   if (operator === '+') {
        return[operand1 + operand2, 'addition'];//durch addition wird das nächste addiotion-Game gestartet bzw. die function gecalled
    } else if(operator === 'x') {
        return[operand1 * operand2, 'multiply'];
    } else if(operator === '-') {
        return[operand1 - operand2, 'subtract'];
    } else if(operator === '/') {
        return[operand1 / operand2, 'division'];
    } else {
        alert(`Unimplemented operator ${operator}`);
        throw `Unimplemented operator ${operator}. Aborting!`;
    }
}

/**
 * get the current score from the DOM and increments it by 1
 * innertext ist <..>innerText</..> innerContend ist meistens das gleiche
 * ++ before makes a difference. But the result is the same but nicer.
 */
function incrementScore() {
    let oldScore = parseInt(document.getElementById('score').innerText);
    //jetzt score upgeated
    document.getElementById('score').innerText = ++oldScore
}

/**
 * get the current score incorect answers from the DOM and increments it by 1
 */
function incrementWrongAnswer() {
    let oldScore = parseInt(document.getElementById('incorrect').innerText);
    document.getElementById('incorrect').innerText = ++oldScore
}

//text: 'operand1' wird ans html zurückgegeben
function displayAdditionQuestion(operand1, operand2) {
    document.getElementById('operand1').textContent = operand1;
    document.getElementById('operand2').textContent = operand2;
    document.getElementById('operator').textContent = '+';
}

function displaySubtractQuestion(operand1, operand2) {
    document.getElementById('operand1').textContent = operand1 > operand2 ? operand1 : operand2; 
    //if op1 is > than op2: give op1 else give op2
    document.getElementById('operand2').textContent = operand1 > operand2 ? operand2 : operand1;
    document.getElementById('operator').textContent = '-';
}

function displayMultiplyQuestion(operand1, operand2) {
    document.getElementById('operand1').textContent = operand1;
    document.getElementById('operand2').textContent = operand2;
    document.getElementById('operator').textContent = 'x';
}

function displayDivisionQuestion(operand1, operand2) {
    document.getElementById('operand1').textContent = operand1 > operand2 ? operand1 : operand2; 
    //if op1 is > than op2: give op1 else give op2
    document.getElementById('operand2').textContent = operand1 > operand2 ? operand2 : operand1;
    document.getElementById('operator').textContent = '/';
}