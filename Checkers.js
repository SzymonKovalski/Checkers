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

	let input_start_X = prompt("Enter X pos of your token",[0]); // this can be done better
	let input_start_Y = prompt("Enter Y pos of your token",[0]);
	if (the_Board[input_start_X][input_start_Y] === 1){ // only if you enter your token coordinates you move
		//put where you can move to here
		let input_end_X = prompt("Enter X pos of where to move");
		let input_end_Y = prompt("Enter Y pos of where to move");
		//check if you can move there by the rules	
			Move_This_To_That(input_start_X, input_start_Y, input_end_X, input_end_Y);
	}
}
//white turn version. do AI with this one
function White_Turn(){

	let input_start_X =0;
	let input_start_Y =0;

	let input_end_X =0; //can technically be removed, is here for ease of coding. FIX LATER
	let input_end_Y =0;

	console.log("enemy turn");
	console.table(the_Board);

	Catalogue_all_moves(turn);//either 0 for player or 1 for enemies

	//randomise 0 to number_possibilities
	let random_number = Math.floor((Math.random()*number_possibilities));

	let counter =0;
	let chosen_move =0;
	for(let i=0; i<8;i++){
		for(let j=0; j<8;j++){
			if(the_Board[i][j]===2||4){
				for(let k=0; k<4;k++)
				{
					if(possible_enemy_moves[i][j][k] != 0){
						if(counter < random_number){
							counter++;
						}
						input_start_X = i;
						input_start_Y = j;
						chosen_move = possible_enemy_moves[i][j][k];
					}
				}
			}
		}
	}
	//now we have coords and move
	let is_the_AI_retarded = true; //is ai trying to move to non existing places. delete all mention of after debugging. FIX LATER
	switch(chosen_move){
		case 1:
			if(the_board[input_start_X-1][input_start_Y-1]===0){
				let input_end_X =0;
				let input_end_Y =0;

				is_the_AI_retarded = false;
			}
		break;
		case 2:
			if(the_board[input_start_X-1][input_start_Y+1]===0){
				let input_end_X =0;
				let input_end_Y =0;

				is_the_AI_retarded = false;
			}
		break;
		case 3:
			if(the_board[input_start_X+1][input_start_Y-1]===0){
				let input_end_X =0;
				let input_end_Y =0;

				is_the_AI_retarded = false;
			}
		break;
		case 4:
			if(the_board[input_start_X+1][input_start_Y+1]===0){
				let input_end_X =0;
				let input_end_Y =0;

				is_the_AI_retarded = false;
			}
		break;

		case 5:
			if(the_board[input_start_X-1][input_start_Y-1]===0){
				let input_end_X =0;
				let input_end_Y =0;

				is_the_AI_retarded = false;
			}
		break;
		case 6:
			if(the_board[input_start_X-1][input_start_Y+1]===0){
				let input_end_X =0;
				let input_end_Y =0;

				is_the_AI_retarded = false;
			}
		break;
		case 7:
			if(the_board[input_start_X+1][input_start_Y-1]===0){
				let input_end_X =0;
				let input_end_Y =0;

				is_the_AI_retarded = false;
			}
		break;
		case 8:
			if(the_board[input_start_X+1][input_start_Y+1]===0){
				let input_end_X =0;
				let input_end_Y =0;

				is_the_AI_retarded = false;
			}
		break;
	}

	console.log("is_the_AI_retarded");
	console.log(is_the_AI_retarded);

	turn = 0;
}
var possible_enemy_moves = makeArray(8, 8, 4, 0);//first 2 var are coordinates, third is list of moves
//8 move variations. if any slot != 0 can move
/*
5       6
  1   2
    0
  3   4
7       8
*/
var number_possibilities = 0;
function Catalogue_all_moves(faction){ // check if there is an exception
	possible_enemy_moves = makeArray(8, 8, 4, 0);
	
	number_possibilities = 0;
	for(let i=0; i<8;i++){
		for(let j=0; j<8;j++){
			if(the_Board[i][j]===faction+1){//peasants
				let k = 0;
				
				if(the_Board[i+1][j-1]===0){
					possible_enemy_moves[i][j][k] = 3;
					k++;
					number_possibilities++;
				}
				if(the_Board[i+1][j+1]===0){
					possible_enemy_moves[i][j][k] = 4;
					k++;
					number_possibilities++;
				}
				if((the_Board[i+1][j-1]===faction||faction+2)&&(the_Board[i+2][j-2]===0)){  //peasant code is only working for white. change numbers for black
					possible_enemy_moves[i][j][k] = 7;
					k++;
					number_possibilities++;
				}
				if((the_Board[i+1][j-1]===faction||faction+2)&&(the_Board[i+2][j-2]===0)){
					possible_enemy_moves[i][j][k] = 8;
					k++;
					number_possibilities++;
				}
			}
			if(the_Board[i][j]===faction+2){//kings
				let k = 0;
				
				if(the_Board[i-1][j-1]===0){
					possible_enemy_moves[i][j][k] = 1;
					k++;
					number_possibilities++;
				}
				if(the_Board[i-1][j+1]===0){
					possible_enemy_moves[i][j][k] = 2;
					k++;
					number_possibilities++;
				}
				if(the_Board[i+1][j-1]===0){
					possible_enemy_moves[i][j][k] = 3;
					k++;
					number_possibilities++;
				}
				if(the_Board[i+1][j+1]===0){
					possible_enemy_moves[i][j][k] = 4;
					k++;
					number_possibilities++;
				}
				if((the_Board[i-1][j-1]===faction||faction+2)&&(the_Board[i-2][j-2]===0)){
					possible_enemy_moves[i][j][k] = 5;
					k++;
					number_possibilities++;
				}
				if((the_Board[i-1][j+1]===faction||faction+2)&&(the_Board[i-2][j+2]===0)){
					possible_enemy_moves[i][j][k] = 6;
					k++;
					number_possibilities++;
				}
				if((the_Board[i+1][j-1]===faction||faction+2)&&(the_Board[i+2][j-2]===0)){
					possible_enemy_moves[i][j][k] = 7;
					k++;
					number_possibilities++;
				}
				if((the_Board[i+1][j+1]===faction||faction+2)&&(the_Board[i+2][j+2]===0)){
					possible_enemy_moves[i][j][k] = 8;
					k++;
					number_possibilities++;
				}
			}
		}
	}
	
	//maybe do a structure instead of a matrix
}
//functiom moves piece
function Move_This_To_That(start_X, start_Y, end_X, end_Y){//swaps positions of 2 tokens
	//base movement only if not killing
	let temp = the_Board[start_X][start_Y];
	
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

function makeArray(w, h, d, val) {
    var arr = [];
    for(let i = 0; i < h; i++) {
        arr[i] = [];
        for(let j = 0; j < w; j++) {
        	arr[i][j] = [];
        	for(let k = 0; k < d; k++) {
            	arr[i][j][k] = val;
            }
        }
    }
    return arr;
}