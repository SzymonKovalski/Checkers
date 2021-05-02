// 0 - empty
// 1 - black
// 2 - white


// ||x
// \/ y-> 
var the_Board = [
  [0,2,0,2,0,2,0,2],
  [2,0,2,0,2,0,2,0],
  [0,2,0,2,0,2,0,2],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [1,0,1,0,1,0,1,0],
  [0,1,0,1,0,1,0,1],
  [1,0,1,0,1,0,1,0]
];


//console.log(the_Board[7][0]); // = 1

//black go first
var turn = 0;

//turn system
while (true){
	if (turn === 0){
		Black_Turn();
	}else{
		White_Turn();
	}
}





//player turn version
function Black_Turn(){

	console.log("your turn");
	console.table(the_Board);

	var input_start_X = prompt("Enter X pos of your token",[0]); // this can be done better
	var input_start_Y = prompt("Enter Y pos of your token",[0]);
	if (the_Board[input_start_X][input_start_Y] === 1){ // only if you enter your token coordinates you move
		//put where you can move to here
		var input_end_X = prompt("Enter X pos of where to move");
		var input_end_Y = prompt("Enter Y pos of where to move");
		//check if you can move there by the rules	
			Move_This_To_That(input_start_X, input_start_Y, input_end_X, input_end_Y);
	}
}
//white turn version. do AI with this one
function White_Turn(){

	console.log("enemy turn");
	console.table(the_Board);

	// AI selects token
	var input_end_X = 0;
	var input_end_Y = 0; 
	for(var i=0; i<8; i++){ //picks the closest to enemy side, most to the right
		
			for(var j = 0; j < 8; j++){
				if (the_Board[i][j]===2 || the_Board[i][j]===4){
					var input_start_X = i;
					var input_start_Y = j; // to do: give it some randomness


					if(the_Board[input_start_X][input_start_Y]===2){//normies
						var aggressive =0;
						if(the_Board[input_start_Y+1][input_start_X+1] === 0){ //exception.
							var input_end_Y =input_start_Y+1;
							var input_end_X = input_start_X+1;
							Move_Peacefully(input_start_X,input_start_Y,input_end_X,input_end_Y);
							turn = 0;
						}
						else if(the_Board[input_start_Y-1][input_start_X+1] === 0){
							var input_end_Y =input_start_Y-1;
							var input_end_X = input_start_X+1;
							Move_Peacefully(input_start_X,input_start_Y,input_end_X,input_end_Y);
							turn = 0;
						} 
						else if((the_Board[input_start_Y+1][input_start_X+1] === 1||the_Board[input_start_Y+1][input_start_X+1] === 3)&&(the_Board[input_start_Y+2][input_start_X+2] === 0)){
							var input_end_Y = input_start_Y+2;
							var input_end_X = input_start_X+2;
							var aggressive = 1;
						}
						else if((the_Board[input_start_Y+1][input_start_X+1] === 1||the_Board[input_start_Y+1][input_start_X+1] === 3)&&(the_Board[input_start_Y-2][input_start_X+2] === 0)){
							var input_end_Y = input_start_Y-2;
							var input_end_X = input_start_X+2;
							var aggressive = 1;
						}
					}
					//kings
				} 
			}
		
	}
}

//functiom moves piece
function Move_This_To_That(start_X, start_Y, end_X, end_Y){//swaps positions of 2 tokens
	//base movement only if not killing
	var temp = the_Board[start_X][start_Y];
	
	if(the_Board[end_X][end_Y] === 0){
		the_Board[start_X][start_Y] = the_Board[end_X][end_Y];
	}
	else{
		the_Board[start_X][start_Y] = 0;
	}
	
	the_Board[end_X][end_Y] = temp;
	if (turn === 0){
		turn = 1
	}else{
		turn = 0;
	}
}

function Move_Peacefully(start_X, start_Y, end_X, end_Y){
	the_Board[end_X][end_Y] = the_Board[start_X][start_Y];
	the_Board[start_X][start_Y] = 0;
	if (turn === 0)turn = 1
	else turn = 0;
}
function Move_to_Kill(start_X, start_Y, end_X, end_Y){

}