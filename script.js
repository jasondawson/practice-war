$(document).ready(function() {

	//what does this do?
	var convert_value_to_string = function(value) {
		if (value > 10) {
			switch (value) {
				case 11:
				return 'Jack';
				break;
				case 12:
				return 'Queen';
				break;
				case 13:
				return 'King';
				break;
			}
		}
		return value.toString();
	}

	//what does this do?
	var deck = [];
	var suits = ['hearts', 'diamonds', 'spades', 'clubs'];
	for (var i = 0; i<suits.length; i++) {
		var suit = suits[i];
		for (var j = 0; j<13; j++) {
			deck.push({number: j+1, suit: suit});
		}
	}
	
	//what does this do?
	var shuffle = function(array) { 
		var copy = [];
		var n = array.length; 
		var i; 
		while (n) { i = Math.floor(Math.random() * array.length);  
			if (i in array) { 
		 		copy.push(array[i]); 
		 		delete array[i]; 
		 		n--; 
		 	} 
		} 
		return copy; 
	}
	
	//Now call the shuffle function and save the result of what shuffle returns into your deck variable
	
	deck = shuffle(deck);

	var cards_player_1 = [];
	var cards_player_2 = [];
	// write a function called deal that will evently divide the deck up between the two players
	var deal = function(array) {
		cards_player_1 = deck.slice(0,26);
		cards_player_2 = deck.slice(26,52);
	};

	deal(deck);
	
	//create a function (algorithm) called "war" that takes two cards as parameters, compares them and returns a winner. A tie should return false.
	var war = function(card1, card2){
		if (card1.number === card2.number) {
			return false;
		}
		else if (card1.number > card2.number) {
			return 'Player 1';
		}
		else {
			return 'Player 2';
		}		
	};
	
	var advance = function(){
		//take the top two cards and display them
		if (cards_player_1.length && cards_player_2.length) {
			var card_1 = cards_player_1[0];
			var card_2 = cards_player_2[0];
			$("#opp-card").html(convert_value_to_string(card_1.number)+" "+card_1.suit);
			$("#opp-card-count").html(cards_player_1.length);
			$("#my-card").html(convert_value_to_string(card_2.number)+" "+card_2.suit);
			$("#my-card-count").html(cards_player_2.length);
			
		} else {
			if (cards_player_1.length) {
				var card_1 = cards_player_1[0];
				$("#opp-card").html('You win!');
				$("#opp-card-count").html(cards_player_1.length);
				$("#my-card").html('You lose!');
				$("#my-card-count").html(cards_player_2.length);
			} else {
				var card_2 = cards_player_2[0];
				$("#opp-card").html('You win!');
				$("#opp-card-count").html(cards_player_1.length);
				$("#my-card").html('You lose!');
				$("#my-card-count").html(cards_player_2.length);
			}

		}
	}
	
	//tie breaker handles ties including if there are fewer than 4 cards remaining in a player's hand, the compared card becomes the last card in that player's hand.
	var tie_breaker = function() {
		//alert('Tie');
		var stake1 = [];
		var stake2 = [];
		var full_stake = [];
		var card1;
		var card2;
		
		//alert(tie_winner + ' wins!');

		if (cards_player_1.length > 4) {
			//more than four cards
			card1 = cards_player_1[3];
			stake1.push(cards_player_1[0], cards_player_1[1], cards_player_1[2], cards_player_1[3]);
		} else { 
			//four or fewer cards
			card1 = cards_player_1[cards_player_1.length - 1];
			for (var i = 0; i < cards_player_1.length; i++) {
				stake1.push(cards_player_1[i]);
			}
		}

		if (cards_player_2.length > 4) {
			card2 = cards_player_2[3];
			stake2.push(cards_player_2[0], cards_player_2[1], cards_player_2[2], cards_player_2[3]);
		} else {
			card2 = cards_player_2[cards_player_2.length - 1];
			for (var i = 0; i < cards_player_2; i++) {
				stake2.push(cards_player_2[i]);
			}
		}
		full_stake = stake1.concat(stake2);
		var tie_winner = war(card1, card2);

		if (tie_winner) {
			if (tie_winner === 'Player 1') {
				for (var i = 0; i < full_stake.length; i++) {
					cards_player_1.push(full_stake[i]);
				}
			}
			else {
				for (var i = 0; i < full_stake.length; i++) {
					cards_player_2.push(full_stake[i]);
				}
			}

		} 
		else {
			//return cards to bottom of decks
			for (var i = 0; i < 4; i++) {
				cards_player_1.push(stake1[i]);
				cards_player_2.push(stake2[i]);
			}
		}
		cards_player_1.splice(0,4);
		cards_player_2.splice(0,4);
	};
	
	//create a play function
		//compare the cards
		//give the winner both cards (at end of deck)
	var play = function(){
		if (cards_player_1.length && cards_player_2.length) {
			var winner = war(cards_player_1[0], cards_player_2[0]);
			if (winner) {
				if (winner === 'Player 1') {
					cards_player_1.push(cards_player_2[0], cards_player_1[0]);
				}	
				else if (winner === 'Player 2') {
					cards_player_2.push(cards_player_1[0], cards_player_2[0]);
				};
			cards_player_1.shift();
			cards_player_2.shift();
			}

			//in case of tie
			else {
				tie_breaker();

			}
		} 
		else {
			if (cards_player_1.length) {
				alert('Player 1 WINS!!!');
			}
			else {
				alert('Player 2 WINS!!!');
			}
		}
	
		//this function (defined below) will continue to the next turn
		advance();
	}



	advance();
	
	$(".btn").click(function() {
		play();
	});
});
