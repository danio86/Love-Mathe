// Wait for the DOM to finish loading before running the game
// Get the button elements and add event listeners to them

document.addEventListener("DOMContentLoaded", function() {
    let buttons = document.getElementsByTagName("button");

    for (let button of buttons) {
        button.addEventListener("click", function() {
            if (this.getAttribute("data-type") === "submit") {
                alert("You clicked Submit!");
            } else {
                let gameType = this.getAttribute("data-type");
                runGame(gameType);
            }
        });
    }
    runGame('addition');
});


/**
 * Dot string beschreibt function - Dadurch wird die Funktion beschrieben wenn sie woanders gecalled wird:
 * Mein Loop of the game > Called when the game loads and when the users answer is proceed
 */
function runGame(gameType) {
    // creates two random numbers between 1-25 
    let num1 = Math.floor(Math.random()*25)+1;
    let num2 = Math.floor(Math.random()*25)+1;

    if(gameType === 'addition'){
        displayAdditionQuestion(num1,num2);
    } else {
            alert(`Unkown game type: ${gameType}`);
            throw `Unkown game type: ${gameType}. Aborting!`;
            // breaks the code and prints this message
        }
    }

}

function checkAnswer() {

}

function calculateCorrectAnswer() {

}

function incrementScore() {

}

function incrementWrongAnswer() {

}

function displayAdditionQuestion(operand1, operand2) {
    document.getElementById('operand1').textContent = operand1;
    document.getElementById('operand2').textContent = operand2;
    document.getElementById('operator').textContent = '+';
}

function displaySubtractQuestion() {

}

function displayMultiplyQuestion() {
    
}