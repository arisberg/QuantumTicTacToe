//IFFE
(function(){

angular
.module('TicTacToe')
.controller('TicTacController', TicTacController);

TicTacController.$inject = ['$scope', '$firebaseObject', '$firebaseArray'];

function TicTacController($scope, $firebaseObject, $firebaseArray) {
	//contains all the logic for TicTacConroller
	//Capture variable --- gives peace of mind so we know what we are referring to
	var self = this;
	self.checkWinner = checkWinner;
	self.playerOneTurn = true;
	self.addMove = addMove;
	self.xQuantum = xQuantum;
	self.oQuantum = oQuantum;
	self.playerOneScore = 0;
	self.playerTwoScore= 0;
	self.xHasQuantum = true;
	self.oHasQuantum = true;
	self.quantumUsed = false;
	self.gameOver = false;
	self.winnerStatement= "";
	self.reset = reset;
	self.moves = 0;
	var ref = new Firebase("https://quantumttt.firebaseio.com/boxes");
	self.boxes = $firebaseArray(ref);


	function addMove(clickedBox) {
		if (self.gameOver === false) {
			if(self.playerOneTurn===true && clickedBox.state == null) {
				clickedBox.state = 'x';
				self.playerOneTurn = false;
				self.moves += 1;
			}
			else if (self.playerOneTurn === false && clickedBox.state === null){
				clickedBox.state = 'o';
				self.playerOneTurn = true;
				self.moves += 1;
			}
			checkWinner();
			self.quantumUsed = false;
		}
	}

	function checkWinner() {
		var cells = [];

		for (var i = 0 ; i < self.boxes.length ; i++) {
			cells.push(self.boxes[i].state);
		}
		if (self.moves === 9){
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

	function declareWinner(winner) {
		self.winnerStatement = winner + " Wins!";
		if (winner === "X") {
			self.playerOneScore += 1;
		}
		if (winner === "O") {
			self.playerTwoScore += 1;
		}
		self.gameOver = true;
	}

	function reset() {
		for (var i = 0 ; i < self.boxes.length ; i++) {
			self.boxes[i].state = null;
		}
		self.winnerStatement = "Game in Progress";
		self.moves = 0;
		self.playerOneTurn = !self.playerOneTurn;
		self.gameOver= false;
		self.xHasQuantum = true;
		self.oHasQuantum = true;
		self.quantumUsed = false;
	}

	function xQuantum() {
		if (self.xHasQuantum === true && self.playerOneTurn === true) {
			var cells = [];
			for (var i = 0 ; i < self.boxes.length ; i++) {
				cells.push(self.boxes[i].state);
			}
			console.log(cells);
			cells = shuffle(cells);
			console.log(cells);
			for (var i = 0; i <  self.boxes.length ; i++){
				self.boxes[i].state = cells[i];
			}
			self.xHasQuantum = false;
			self.quantumUsed = true;
		}
		checkWinner();
	}

	function oQuantum() {
		if (self.oHasQuantum === true  && self.playerOneTurn === false) {
			var cells = [];
			for (var i = 0 ; i < self.boxes.length ; i++) {
				cells.push(self.boxes[i].state);
			}
			console.log(cells);
			cells = shuffle(cells);
			console.log(cells);
			for (var i = 0; i < self.boxes.length ; i++){
				self.boxes[i].state = cells[i];
			}
			self.oHasQuantum = false;
			self.quantumUsed = true;
		}
		checkWinner();
	}

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