//Wait for DOM to load before running the game
//Get the button elements and add eventlisteners to them

window.addEventListener('DOMContentLoaded', function(){
	let buttons = document.getElementsByTagName('button');

	for (let button of buttons){
		button.addEventListener('click', function(){
			if (this.getAttribute('data-type') === 'submit') {
				checkAnswer();
			} else {
				let gameType = this.getAttribute('data-type');
				runGame(gameType);
			}
		});
	}

	document.getElementById('answer-box').addEventListener('keydown', function(myEvent) {  //'myEvent' is the parameter we're naming here to use in the if statement.
		if (myEvent.key === 'Enter') {   //here we're checking the 'key' property of 'myEvent'
			checkAnswer();
		}
	})

	runGame('addition');
});



function runGame(gameType){
	
	//Generate two random no's between 1 and 25, Math.floor rounds down to whole numbers
	// the '+1' is to compensate for the cases where we round down to zero

	document.getElementById('answer-box').value = '';
	document.getElementById('answer-box').focus();

	let num1 = Math.floor(Math.random() * 25) + 1;	 
	let num2 = Math.floor(Math.random() * 25) + 1;

	if (gameType === 'addition') {
		displayAdditionQuestion(num1, num2);
	} else if (gameType === 'multiply') {
		displayMultiplyQuestion(num1, num2);
	} else if (gameType === 'subtract') {
		displaySubtractQuestion(num1, num2);
	} else if (gameType === 'division') {
		displayDivideQuestion(num1, num2);
	}
		else {
		alert(`Unknown game type ${gameType}`);
		throw `Unknown game type ${gameType}, aborting`;
	}

}

function checkAnswer(){
	//checks the answer against the fist element in the returned
	//calculateCorrectAnswer function

	let userAnswer = parseInt(document.getElementById('answer-box').value);
	let calculatedAnswer = calculateCorrectAnswer();
	let isCorrect = userAnswer === calculatedAnswer[0];

	if (isCorrect){
		alert('Hey! You got it right! :D');
		incrementScore();
	} else {
		alert(`Awww...you answered ${userAnswer}. The correct answer was ${calculatedAnswer[0]}!`);
		incrementWrongAnswer();
	}

	runGame(calculatedAnswer[1]);

}

function calculateCorrectAnswer(){

	let operand1 = parseInt(document.getElementById('operand1').innerText); //parseInt makes sure we treat the data as a number instead of default (a string).
	let operand2 = parseInt(document.getElementById('operand2').innerText);
	let operator = document.getElementById('operator').innerText;

	if (operator ==='+') {
		return [operand1 + operand2, 'addition'];
	} else if (operator === 'x'){
		return [operand1 * operand2, 'multiply'];
	} else if (operator === '-'){
		return [operand1 - operand2, 'subtract'];
	} else if (operator === '/'){
		return [operand1 / operand2, 'division'];
	} else {
		alert(`Unimplemented operator ${operator}`);
		throw `Unimplemented operator ${operator}, aborting!`;
	}
}

function incrementScore(){

    let oldScore = parseInt(document.getElementById("score").innerText);
    document.getElementById("score").innerText = ++oldScore;

}

function incrementWrongAnswer(){

	let oldScore = parseInt(document.getElementById('incorrect').innerText);
	document.getElementById('incorrect').textContent = ++oldScore;

}

function displayAdditionQuestion(operand1, operand2){

	document.getElementById('operand1').textContent = operand1;
	document.getElementById('operand2').textContent = operand2;
	document.getElementById('operator').textContent = '+';		

}

function displaySubtractQuestion(operand1, operand2){

	document.getElementById('operand1').textContent = operand1 > operand2 ? operand1 : operand2;
	document.getElementById('operand2').textContent = operand1 > operand2 ? operand2 : operand1;
	document.getElementById('operator').textContent = '-';

}

function displayMultiplyQuestion(operand1, operand2){

	document.getElementById('operand1').textContent = operand1;
	document.getElementById('operand2').textContent = operand2;
	document.getElementById('operator').textContent = 'x';		

}


function displayDivideQuestion(operand1, operand2){
	
	//operand1 becomes the actual answer

	let lgAns = operand1 * operand2;
	document.getElementById('operand1').textContent = lgAns;
	document.getElementById('operand2').textContent = operand2;
	document.getElementById('operator').textContent = '/';

}
