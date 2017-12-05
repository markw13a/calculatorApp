//Build a calculator web app. Most basic level need functions for add, subract, multiply divide
//Should push operations to a stack? Helps sort out potential issues with order or operations
//Could have button press return object containing token for op selected and number: {3, "PLUS"}, {2, "MINUS"}, {5, "END"} => 3 + 2 - 5
//By order of operations, division and multiplication should always be carried out first. Division > Multiplication > Addition > Subtraction
//Will need some way of sorting stack to ensure operations are executed in correct order
//2 - 6 / 3 => {2, "MINUS"}, {6, "DIVIDE"}, {3, END}
//Don't have brackets implemented. Is fine to just run through the division and multiplications operations first. 
//When user clicks enter, sort the array. Division goes on top, multiplication further down.

var operationStack = [];
var lastInt = ""; //The last integer to have been input by user. Updates everytime num key is clicked. Clicking an operation should clear this.
var displayString = "";
var displayDiv = document.querySelector("#display p");

/*Setting up event listeners*/
document.querySelector(".nine").addEventListener("click", function() {
	lastInt += 9; 
	displayString+="9";
	updateDisplay();});
document.querySelector(".eight").addEventListener("click", function() {
	lastInt += 8; 
	displayString+="8";
	updateDisplay();});
document.querySelector(".seven").addEventListener("click", function() {
	lastInt += 7;
	displayString+="7";
	updateDisplay();});
document.querySelector(".six").addEventListener("click", function() {
	lastInt += 6; 
	displayString+="6";
	updateDisplay();});
document.querySelector(".five").addEventListener("click", function() {
	lastInt += 5; 
	displayString+="5";
	updateDisplay();});
document.querySelector(".four").addEventListener("click", function() {
	lastInt += 4; 
	displayString+="4";
	updateDisplay();});
document.querySelector(".three").addEventListener("click", function() {
	lastInt += 3;
	displayString+="3";
	updateDisplay();});
document.querySelector(".two").addEventListener("click", function() {
	lastInt += 2; 
	displayString+="2";
	updateDisplay();});
document.querySelector(".one").addEventListener("click", function() {
	lastInt += 1; 
	displayString+="1";
	updateDisplay();});
document.querySelector(".zero").addEventListener("click", function() {
	lastInt += 0; 
	displayString+="0"; 
	console.log(operationStack);//DELETE ME
	updateDisplay();});
	
	
document.querySelector(".plus").addEventListener("click", function() {
	if (lastInt) {//Only makes sense to have an operator if user has first input a number
		add();
		displayString+=" + ";
		lastInt = "";
		updateDisplay();
	}
});
document.querySelector(".minus").addEventListener("click", function() {
		if (lastInt) {//Only makes sense to have an operator if user has first input a number
		subtract();
		displayString+=" - ";
		lastInt = "";
		updateDisplay();
	}
});
document.querySelector(".divide").addEventListener("click", function() {
		if (lastInt) {//Only makes sense to have an operator if user has first input a number
		divide();
		displayString+=" ÷ ";
		lastInt = "";
		updateDisplay();
	}
});
document.querySelector(".times").addEventListener("click", function() {
		if (lastInt) {//Only makes sense to have an operator if user has first input a number
		multiply();
		displayString+=" × ";
		lastInt = "";
		updateDisplay();
	}
});
document.querySelector(".equal").addEventListener("click", function() {
		//Does nothing if last input was an operator, or if user has only entered a number so far.
		if (lastInt && (typeof operationStack !== "undefined" && operationStack.length > 0)){
			equals(); 
			updateDisplay();
		} else{
			console.log("Invalid mathematical expression");
		}
	});
	
document.querySelector(".CLR").addEventListener("click", function() {clr();});
/*Display functions*/

function updateDisplay() {
	displayDiv.textContent = displayString;
}

/*Mathematical functions*/

function add(){
	operationStack.push({value: +lastInt, operation: "ADD"});
}

function subtract() {
	operationStack.push({value: +lastInt, operation: "SUBTRACT"});
}

//Will need to go to next item in array. Take next value as the divisor, perform operation, then replace value of the divisor with result of division
//Would also need to remove the entry for DIVIDE
function divide() {
	operationStack.push({value: +lastInt, operation: "DIVIDE"});
}

function multiply() {
	operationStack.push({value: +lastInt, operation: "MULTIPLY"});
}

function equals() {
	operationStack.push({value: +lastInt, operation: "END"});
	
	performDivide();
	performMultiplication();	
	console.log(operationStack);//DELETE ME
	//Not safe to use a for loop as performAddition() and performSubtraction() remove elements from the array.
	while (typeof operationStack !== "undefined" && operationStack.length > 0){
		if (operationStack[0].operation === "ADD"){
			performAddition();
		} else if (operationStack[0].operation === "SUBTRACT") {
			//Strictly speaking, an else{} would be fine. Just though this would be safer incase we decide to add more operations later
			performSubtraction();
		} else if (operationStack[0].operation === "END") {
			console.log(operationStack[0].value);
			displayString = operationStack[0].value;
			/*SCRIPT TO RESET CALCULATOR STATE*/
			operationStack = []; //DELETE ME
			console.log(operationStack);
		}
	}
}

//Clears the calculator display and any associated data. Fresh state
function clr(){
	displayString = "";
	updateDisplay();

	operationStack = [];
	lastInt = "";
}

//Add self onto the following value of the next operation. Delete self
//Assuming that division and multiplication operations have already been processed. From that point on, only need to work left to right.
function performAddition() {
	operationStack[1].value += (operationStack.shift().value);
}

function performSubtraction() {
	operationStack[1].value = operationStack[0].value - operationStack[1].value;
	operationStack.shift();
}

//Worried about potential for bugs with this function
function performDivide() {
	let i = -1;
	//Had it find the node again just to maintain consistency with other perform... functions. Shouldn't have any arguments
	//Bit wasteful, but user is unlikely to enter an overly long string of operations (x10^2 probably a decent order of mag. upper limit)
	while ((i = operationStack.findIndex(obj => obj.operation === "DIVIDE")) !== -1) {
		operationStack[i+1].value = operationStack[i].value / operationStack[i+1].value;
		operationStack.splice(i, 1);
	}
}

function performMultiplication() {
		let i = -1;
		while ((i  = operationStack.findIndex(obj => obj.operation === "MULTIPLY")) !== -1) {
			console.log((operationStack[i].value));
			operationStack[i+1].value *= (operationStack[i].value);
			operationStack.splice(i, 1);
		}
}

