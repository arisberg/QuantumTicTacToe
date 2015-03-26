//IFFE
(function(){

	angular
		.module('TicTacToe')
		.controller('TicTacController', TicTacController);

		function TicTacController() {
			//contains all the logic for TicTacConroller
			//Capture variable --- gives peace of mind so we know what we are referring to
			var self = this;
			self.checkWinner = checkWinner;
			self.playerOneTurn = true;
			self.addMove = addMove;
			self.boxes = [
				{
					position: 1,
					state: null
				},
				{
					position: 2,
					state: null
				},
				{
					position: 3,
					state: null
				},
				{
					position: 4,
					state: null
				},
				{
					position: 5,
					state: null
				},
				{
					position: 6,
					state: null
				},
				{
					position: 7,
					state: null
				},
				{
					position: 8,
					state: null
				},
				{
					position: 9,
					state: null
				},
			];

			function addMove(which) {
				
				if(self.playerOneTurn==true) {
					which.state = 'x';
					self.playerOneTurn = false;
				}
				else {
					which.state = 'o';
					self.playerOneTurn = true;
				}
			}

			function checkWinner() {
				var cells = [];
				for (box in self.boxes) {
					cells.unshift(box.position);
				}
				console.log(cells);
			}

		}

})();