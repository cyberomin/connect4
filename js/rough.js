/**
*game - object that holds details about the game, rows, colums and board.
*@property game
*@type object
*/
var game = {
    plain   : $("#board"),
    rows    : 6,
    columns : 7,
    board   : [ [ 0, 0, 0, 0, 0, 0, 0 ],[ 0, 0, 0, 0, 0, 0, 0 ],[ 0, 0, 0, 0, 0, 0, 0 ],[ 0, 0, 0, 0, 0, 0, 0 ],[ 0, 0, 0, 0, 0, 0, 0 ],[ 0, 0, 0, 0, 0, 0, 0 ] ]
}



/**
* Connect 4 class.
* @class Connect
* @constructor
*/
var Connect = function () {
    this.redBall        = "redBall";        //Red color ball
    this.blackBall      = "blackBall";      //Black color ball
    this.msgBox         = $(".alert");      //Alet box for game
    this.newGameBtn     = $(".btn");

    var table           = game.plain;
    var build_table     = this.buildTable();
    table.append(build_table);

    this.ballLocation   = $("table td");
}


/**
*builtTable creates the game board
*@method buildTable
*/
Connect.prototype.buildTable = function() {
    var table_builder = "<table><tbody>";
    var id = 1
    for(var i = 0; i < 6; i++) {

        table_builder += "<tr class='row' id='"+i+"'>";
        for (var j = 0; j < 7; j++) {
            
            table_builder += "<td width='80px' height='70px' id='"+id+"' data-row='"+i+"' data-column='"+j+"'></td>";
            id += 1;
        };
        table_builder += "</tr>";
    }
    table_builder += "</tbody></table>";
    return table_builder;
};


/**
*createBall creates circular shapes to represent balls.
*@createBall create's a new ball
*@param color color of the ball
*@param row - row upon which ball should be created
*@colum - column upon which ball the ball should be created.
*/
Connect.prototype.createBall = function(row, column, color) {
    var ball = "<div class='"+color+"'></div>";
    $('[data-row="'+(row-1)+'"][data-column="'+column+'"]').children('div').remove();
    $('[data-row="'+row+'"][data-column="'+column+'"]').append(ball);
    return true;
}


/**
*animateBall creates the animation effect for balls
*@animateBall create's animation
*@param color color of the ball
*@param data - an object holding colum and row for the current location
*/
Connect.prototype.animateBall = function(data, color) {
    var row = 0;
    var self = this;
    stopVal = setInterval(function() {
        if(row == data.row)
            clearInterval(stopVal);
        self.createBall(row, data.column, color);
        row++;
    }, 50);
    return true;
};


/**
*@method msgBoxAlert alert to check who wins.
*@param player - name of the winning player
*/
Connect.prototype.msgBoxAlert = function(player) {
    if (player !== undefined) {
        this.msgBox.html("<strong>Game over!!!  "+player+" Player Wins</stong>").fadeIn();
        this.newGameBtn.text("New Game");
        return true;
    } else {
        return false;
    }
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
    if (board !== undefined) {
        for (var i = 0; i < board.length; i++) {
            $(board[i]).removeAttr('class').empty();
        }
        this.msgBox.empty().hide();         //Clear message.
        $(".turns").removeClass("blackPlayer").removeClass("redPlayer").addClass("redPlayer");
        this.newGameBtn.text("Reset Game");
        game.board = [ [ 0, 0, 0, 0, 0, 0, 0 ],[ 0, 0, 0, 0, 0, 0, 0 ],[ 0, 0, 0, 0, 0, 0, 0 ],[ 0, 0, 0, 0, 0, 0, 0 ],[ 0, 0, 0, 0, 0, 0, 0 ],[ 0, 0, 0, 0, 0, 0, 0 ] ];
        return true;
    } else {
        return false;
    }
}


/**
*@method disableBoard - make cells unclickable after a win.
*/
Connect.prototype.disableBoard = function() {
    var board = this.ballLocation;
    for (var i = 0; i < board.length; i++) {
        $(board[i]).attr('class','closed'); 
    }
    return true;
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
    var row     = position.row;
    var column  = position.column;
    var player  = game.board[row][column];

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
    var row     = position.row;
    var column  = position.column;
    var player  = game.board[row][column];
    
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
    var player  = game.board[position.row][position.column];  
    var row     = position.row - 1;
    var column  = position.column - 1;
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
    var player  = game.board[position.row][position.column];
    var row     = position.row + 1;
    var column  = position.column - 1;
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

    return true;

}




/**
*init create's the game entry point
*@method init
*/
Connect.prototype.init = function() {
    var player      = 1;
    var resetBtn    = $("#reset-game");
    var self        = this;


    $("table").on('click', 'td', function(){
        var current_location    = $(this).attr("id");
        var index               = current_location - 1;
        var location_above_id   = current_location - 7;
        var location_above      = $(this).parent().prev().find("#" + location_above_id);

        var clicked_location = {
            row: $(this).data('row'),
            column: $(this).data('column')
        }

        if ( $(this).attr('class') !== "closed" && current_location > 35 || $(this).hasClass('open') ) {
            $(this).attr('class', 'closed');
            location_above.attr('class', 'open');
            
            if (player === 1) {

                if ($(this).children("div").attr('class') !== self.redBall && 
                    $(this).children("div").attr('class') !== self.blackBall){
                    
                    self.animateBall(clicked_location, self.redBall);
                    $(".turns").removeClass("redPlayer").addClass("blackPlayer")
                    player  = 2;                                //Swap turns
                }
                

                game.board[clicked_location.row][clicked_location.column] = player;
                self.win(clicked_location, "Red");      //Check if there's a winner
                
            } else {
                
                
                if ($(this).children("div").attr('class') !== self.redBall && 
                    $(this).children("div").attr('class') !== self.blackBall){

                    self.animateBall(clicked_location, self.blackBall);
                    $(".turns").removeClass("blackPlayer").addClass("redPlayer")
                    player  = 1;                                //Swap tunrs
                }
                

                game.board[clicked_location.row][clicked_location.column] = player;
                self.win(clicked_location, "Black");        //Check if there's a winner
                
            }
        }
        
    });

    resetBtn.click(function() {
        self.resetGame(self.ballLocation);
        player = 1;
    });
    
};