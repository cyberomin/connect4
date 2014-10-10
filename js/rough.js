(function(){

	/**
	*game - object that holds details about the game, rows, colums and board.
	*@property game
	*@type object
	*/
	var game = {
		plain 	: $("#board"),
		rows 	: 6,
		columns : 7,
		board 	: [ [ 0, 0, 0, 0, 0, 0, 0 ],[ 0, 0, 0, 0, 0, 0, 0 ],[ 0, 0, 0, 0, 0, 0, 0 ],[ 0, 0, 0, 0, 0, 0, 0 ],[ 0, 0, 0, 0, 0, 0, 0 ],[ 0, 0, 0, 0, 0, 0, 0 ] ]
	}



	/**
	* Connect 4 class.
	* @class Connect
	* @constructor
	*/
	var Connect = function () {
		this.buildTable();
		this.redBall 		= "redBall"; 		//Red color ball
		this.blackBall		= "blackBall";		//Black color ball
		this.msgBox 		= $(".alert");		//Alet box for game
		this.ballLocation 	= $("table td");
		this.newGameBtn		= $(".btn");
	}


	/**
	*builtTable creates the game board
	*@method buildTable
	*/
	Connect.prototype.buildTable = function() {
		var table = game.plain.find("table");
		var table_builder;
		id = 1
		for(var i = 0; i < 6; i++) {

			table_builder += "<tr class='row' id='"+i+"'>";
			for (var j = 0; j < 7; j++) {
				
				table_builder += "<td width='80px' height='70px' id='"+id+"' data-row='"+i+"' data-column='"+j+"'></td>";
				id += 1;
			};

		}

		table.append(table_builder);
	};


	/**
	*createBall creates circular canvases to represent balls.
	*@createBall create's a new ball
	*@param color canvas/ball color
	*/
	Connect.prototype.createBall = function(ballColor) {	
		var ball = "<div class='"+ballColor+"'></div>";
		return ball;
	};


	/**
	*@method msgBoxAlert alert to check who wins.
	*@param player - name of the winning player
	*/
	Connect.prototype.msgBoxAlert = function(player) {
		this.msgBox.html("<strong>Game over!!!  "+player+" Player Wins</stong>").fadeIn();
		this.newGameBtn.text("New Game");
	}



	/**
	*resetGame is akin to "new game". It ends the current session 
	*and beings a fresh game.
	*@method resetGame
	*@param board, board upon which balls are places
	*@param msgBox, Alert box for game
	*@return boolean false. This prevents default propagation of the clicked button
	*/
	Connect.prototype.resetGame = function(board) {
		
		for (var i = 0; i < board.length; i++) {
			$(board[i]).empty();
		}
		this.msgBox.empty().hide(); 		//Clear message.
		$(".turns").removeClass("blackPlayer").removeClass("redPlayer").addClass("redPlayer");
		this.newGameBtn.text("Reset Game");
		game.board = [ [ 0, 0, 0, 0, 0, 0, 0 ],[ 0, 0, 0, 0, 0, 0, 0 ],[ 0, 0, 0, 0, 0, 0, 0 ],[ 0, 0, 0, 0, 0, 0, 0 ],[ 0, 0, 0, 0, 0, 0, 0 ],[ 0, 0, 0, 0, 0, 0, 0 ] ];
	}


	/**
	*@method disableBoard - make cells unclickable after a win.
	*/
	Connect.prototype.disableBoard = function() {
		var board = this.ballLocation;
		for (var i = 0; i < board.length; i++) {
			$(board[i]).attr('class','closed'); 
		}
	}



	/*
	*Winning strategy
	*Vertical Check
	*left diagonal Check
	*right diagonal Check
	*Horizontal Check
	*/
	
	//Vertical Win
	Connect.prototype.verticalCheck = function(position) {
	    var row 	= position.row;
	    var column 	= position.column;
	    var player 	= game.board[row][column];

	    if (row >= game.rows - 3){
	        return false;
	    }
	     
	    for (var i = row+1; i <= row + 3; i++){
	        if (game.board[i][column] != player){
	            return false;
	        }
	    }
	    return true;
	}

	//Horizontal Win
	Connect.prototype.horizontalCheck = function(position) {
	    var row 	= position.row;
	    var column 	= position.column;
	    var player 	= game.board[row][column];
	    
	    var counter = 1;
	             
	    for(var i = column-1; i>=0; i--){
	        if(game.board[row][i] != player){
	            break;
	        }
	        counter++;
	    }
	             
	    for(var j = column+1; j < game.columns; j++){
	        if(game.board[row][j] != player){
	            break;
	        }
	        counter++;
	    }
	             
	    if(counter >=4){
	        return true;
	    }
	    else{
	        return false;
	    }
	}

	//Left Diagonal Win
	Connect.prototype.leftDiagonalCheck = function(position) {
	    var player 	= game.board[position.row][position.column];  
	    var row 	= position.row - 1;
	    var column 	= position.column - 1;
	    var counter = 1;
	 
	    while (row >= 0 && column >= 0)
	    {
	        if (game.board[row][column] == player)
	        {
	            counter++;
	            row--;
	            column--;
	        }
	        else
	        {
	            break;           
	        }
	    }
	         
	    row = position.row + 1;
	    column = position.column + 1;
	         
	    while (row < game.rows && column < game.columns)
	    {           
	        if (game.board[row][column] == player)
	        {
	            counter++;
	            row++;
	            column++;
	        }
	        else
	        {
	            break;
	        }
	    }
	    if(counter >=4)
	    {
	        return true;
	    }
	    else
	    {
	        return false;
	    }
	}

	//Right diagonal Win
	Connect.prototype.rightDiagonalCheck = function(position){
	    var player 	= game.board[position.row][position.column];
	    var row 	= position.row + 1;
	    var column 	= position.column - 1;
	    var counter = 1;
	         
	    while (row < game.rows && column >= 0)
	    {
	        if (game.board[row][column] == player){
	            counter++;
	            row++;
	            column--;
	        } else {
	            break;           
	        }
	    }
	         
	    row = position.row - 1;
	    column = position.column + 1;
	 
	    while (row >= 0 && column < game.columns)
	    {           
	        if (game.board[row][column] == player)
	        {
	            counter++;
	            row--;
	            column++;
	        }
	        else
	        {
	            break;
	        }
	    }
	    if(counter >=4){
	        return true;
	    } else {
	        return false;
	    }
	}

	Connect.prototype.win = function(position, player) {

		if (this.verticalCheck(position)) {
			this.msgBoxAlert(player);
			this.disableBoard();
		}

		if (this.horizontalCheck(position)) {
			this.msgBoxAlert(player);
			this.disableBoard();
		}

		if (this.leftDiagonalCheck(position)) {
			this.msgBoxAlert(player);
			this.disableBoard();
		}

		if (this.rightDiagonalCheck(position)) {
			this.msgBoxAlert(player);
			this.disableBoard();
		}

	}




	/**
	*init create's the game entry point
	*@method init
	*/
	Connect.prototype.init = function() {
		
		
		var player 		= 1;
		var resetBtn 	= $("#reset-game");
		var red 		= this.red; 
		var black		= this.black;
		var self 		= this;

		var pointerBall = self.createBall("redBall");
		

		this.ballLocation.click(function(){

			var current_location 	= $(this).attr("id");
			var index 				= current_location - 1;
			var location_above_id	= current_location - 7;
			var location_above 		= $(this).parent().prev().find("#" + location_above_id);

			var clicked_location = {
				row: $(this).data('row'),
        		column: $(this).data('column')
			}
			var ball;

			

			if ( current_location > 35 || $(this).hasClass('open') && $(this).attr('class') != "closed") {
				$(this).attr('class', 'closed');
				location_above.attr('class', 'open');
				
				if (player === 1) {
					ball 	= self.createBall(self.redBall);

					if ($(this).children("div").attr('class') !== "redBall" && 
						$(this).children("div").attr('class') !== "blackBall"){

						$(this).append($(ball).fadeIn()); //Only append one ball per cell
						$(".turns").removeClass("redPlayer").addClass("blackPlayer")
						player 	= 2; 								//Swap turns
					}
					

					game.board[clicked_location.row][clicked_location.column] = player;
					self.win(clicked_location, "Red");		//Check if there's a winner
					
				} else {
					ball 	= self.createBall(self.blackBall);
					

					if ($(this).children("div").attr('class') !== "redBall" && 
						$(this).children("div").attr('class') !== "blackBall"){

						$(this).append($(ball).fadeIn()); //Only append one ball per cell
						$(".turns").removeClass("blackPlayer").addClass("redPlayer")
						player 	= 1; 								//Swap tunrs
					}
					

					game.board[clicked_location.row][clicked_location.column] = player;
					self.win(clicked_location, "Black");		//Check if there's a winner
					
				}
			}
			
		});

		resetBtn.click(function() {
			self.resetGame(self.ballLocation);
			player = 1;
		});
		
	};


	//Begin game.
	var play = new Connect();
	play.init();

})(jQuery);