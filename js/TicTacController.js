//IFFE
(function(){

// creates controller
angular
	.module('TicTacToe')
	.controller('TicTacController', TicTacController);

// injects scope, firebaseObject and firebaseArray
TicTacController.$inject = ['$scope', '$firebaseObject', '$firebaseArray'];

// main controller
function TicTacController($scope, $firebaseObject, $firebaseArray) {
	//Capture variable
	var self = this;
	self.checkWinner = checkWinner;
	self.addMove = addMove;
	self.xQuantum = xQuantum;
	self.oQuantum = oQuantum;
	self.reset = reset;
	var ref = new Firebase("https://quantumttt.firebaseio.com/game");
	self.game = $firebaseObject(ref);
	console.log(self.game);



	// Called when a box on the board is clicked.
	// If the game is not over, checks to see if it is playerOne's turn.
	// If so, and the box being clicked is currently set to null,
	// changes the state of the clicked box to X and flips the playerOneTurn
	// variable to false.
	// If not playerOne's turn, changes the state of the box to O,
	// then makes the playerOneTurn variable equal to true.
	// Incriments moves by 1.
	// Calls checkWinner() to see if the move created a win condition
	function addMove(clickedBox) {
		if (self.game.stats.gameOver === false) {
			if(self.game.stats.playerOneTurn===true && clickedBox.state === "") {
				clickedBox.state = 'x';
				self.game.stats.playerOneTurn = false;
				self.game.stats.moves += 1;
				self.game.$save();
			}
			else if (self.game.stats.playerOneTurn === false && clickedBox.state === ""){
				clickedBox.state = 'o';
				self.game.stats.playerOneTurn = true;
				self.game.stats.moves += 1;
				self.game.$save();
			}
			checkWinner();
			self.game.stats.quantumUsed = false;
			self.game.$save();
		}
	}

	// loops through boxes and pushes the array into the cells array
	// checks first to see if moves = 9, if so tie game
	// checks for each win condition
	// if win condition is met, calls declareWinner(winner)
	function checkWinner() {
		var cells = [];

		for (var i = 0 ; i < self.game.squares.length ; i++) {
			cells.push(self.game.squares[i].state);
		}
		if (self.game.stats.moves === 9){
			declareWinner("No One");
		}

		if (cells[0] == 'x' && cells[1] == 'x' && cells[2] == 'x') {
			declareWinner("X");
		}
		if (cells[3] == 'x' && cells[4] == 'x' && cells[5] == 'x') {
			declareWinner("X");
		}
		if (cells[6] == 'x' && cells[7] == 'x' && cells[8] == 'x') {
			declareWinner("X");
		}
		if (cells[0] == 'x' && cells[3] == 'x' && cells[6] == 'x') {
			declareWinner("X");
		}
		if (cells[1] == 'x' && cells[4] == 'x' && cells[7] == 'x') {
			declareWinner("X");
		}
		if (cells[2] == 'x' && cells[5] == 'x' && cells[8] == 'x') {
			declareWinner("X");
		}
		if (cells[0] == 'x' && cells[4] == 'x' && cells[8] == 'x') {
			declareWinner("X");
		}
		if (cells[6] == 'x' && cells[4] == 'x' && cells[2] == 'x') {
			declareWinner("X");
		}
		if (cells[0] == 'o' && cells[1] == 'o' && cells[2] == 'o') {
			declareWinner("O");
		}
		if (cells[3] == 'o' && cells[4] == 'o' && cells[5] == 'o') {
			declareWinner("O");
		}
		if (cells[6] == 'o' && cells[7] == 'o' && cells[8] == 'o') {
			declareWinner("O");
		}
		if (cells[0] == 'o' && cells[3] == 'o' && cells[6] == 'o') {
			declareWinner("O");
		}
		if (cells[1] == 'o' && cells[4] == 'o' && cells[7] == 'o') {
			declareWinner("O");
		}
		if (cells[2] == 'o' && cells[5] == 'o' && cells[8] == 'o') {
			declareWinner("O");
		}
		if (cells[0] == 'o' && cells[4] == 'o' && cells[8] == 'o') {
			declareWinner("O");
		}
		if (cells[6] == 'o' && cells[4] == 'o' && cells[2] == 'o') {
			declareWinner("O");
		}
	}

	// Set's the winner statement to passed in string
	// incriments playerOneScore or playerTwoScore by 1
	// depending on who was winner.
	// Set's gameOver to true so game does not continue
	function declareWinner(winner) {
		self.game.stats.winnerStatement = winner + " Wins!";
		if (winner === "X") {
			self.game.stats.playerOneScore += 1;
		}
		if (winner === "O") {
			self.game.stats.playerTwoScore += 1;
		}
		self.game.stats.gameOver = true;
	}

	// loops through boxes and sets the state of each element of the
	// array to null, a.k.a. clears the game board.
	// Resets winnerStatement, moves, gameOver, xHasQuantum
	// oHasQuantum, and quantumUsed to false.
	// changes playerOneTurn to opposite of whatever boolan value
	// the game started with.  Makes sure X doesn't always go first.
	function reset() {
		for (var i = 0 ; i < self.game.squares.length ; i++) {
			self.game.squares[i].state= "";
		}
		self.winnerStatement = "Game in Progress";
		self.game.stats.moves = 0;
		self.game.stats.playerOneTurn = !self.game.stats.playerOneTurn;
		self.game.stats.gameOver= false;
		self.game.stats.xHasQuantum = true;
		self.game.stats.oHasQuantum = true;
		self.game.stats.quantumUsed = false;
		self.game.$save();
	}

	// If xHasQuantum is true and it is X's turn
	// pushes the states of the boxes array into
	// a new array, cells. Calls shuffle on cells.
	// loops back through boxes and pushes the
	// new shuffled values back to boxes.
	// Sets xHasQuatum to false so it cannot be called again.
	// Sets quantumUsed to true to trigger the spin animation.
	// Calls checkWinner() to see if the randomization caused a win.
	function xQuantum() {
		if (self.game.stats.xHasQuantum === true && self.game.stats.playerOneTurn === true) {
			var cells = [];
			for (var i = 0 ; i < self.game.squares.length ; i++) {
				cells.push(self.game.squares[i].state);
			}
			console.log(cells);
			cells = shuffle(cells);
			console.log(cells);
			for (var i = 0 ;  i < self.game.squares.length ; i++){
				self.game.squares[i].state = cells[i];
			}
			self.game.stats.xHasQuantum = false;
			self.game.stats.quantumUsed = true;
			self.game.$save();
		}
		checkWinner();
	}

	// Same as xQuantum but for O
	function oQuantum() {
		if (self.game.stats.oHasQuantum === true  && self.game.stats.playerOneTurn === false) {
			var cells = [];
			for (var i = 0 ; i < self.game.squares.length ; i++) {
				cells.push(self.game.squares[i].state);
			}
			console.log(cells);
			cells = shuffle(cells);
			console.log(cells);
			for (var i = 0 ;  i <  self.game.squares.length ; i++){
				self.game.squares[i].state = cells[i];
			}
			self.game.stats.oHasQuantum = false;
			self.game.stats.quantumUsed = true;
			self.game.$save();
		}
		checkWinner();
	}

	// Shuffles an array, in this case cells
	function shuffle(array) {
			var m = array.length, t, i;

			 // While there remain elements to shuffle…
				 while (m) {

		    // Pick a remaining element…
				 i = Math.floor(Math.random() * m--);

		    // And swap it with the current element.
		      t = array[m];
			  array[m] = array[i];
			  array[i] = t;
			}

					 return array;
	}

}

})();