// 0 - empty
// 1 - black
// 2 - white


// ||x
// \/ y-> 
let the_Board = [
  [0,2,0,2,0,2,0,2],
  [2,0,2,0,2,0,2,0],
  [0,2,0,2,0,2,0,2],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [1,0,1,0,1,0,1,0],
  [0,1,0,1,0,1,0,1],
  [1,0,1,0,1,0,1,0]
];

var winner = 0;
//black go first
var turn = 0;
//turn system
while (winner === 0){
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
	display_Board();

	let input_start_X = prompt("Enter X pos of your token",[0]); // this can be done better
	let input_start_Y = prompt("Enter Y pos of your token",[0]);

	if (the_Board[input_start_X][input_start_Y] == 1||3){ // only if you enter your token coordinates you move
		//put where you can move to here
		
			let input_end_Y = prompt("do you want to move to the right?",[1]); // this can be done better
			let input_end_X = -1; //= prompt("do you want to move up??",[0]);
			if(the_Board[input_start_X - 1][input_start_Y + input_end_Y]===0){
				Move_This_To_That(input_start_X, input_start_Y, input_end_X, input_end_Y);
			}
		
	} else prompt("that is not your token")
}
//white turn version. do AI with this one
function White_Turn(){
	let input_start_X =0;
	let input_start_Y =0;

	console.log("enemy turn");
	console.table(the_Board);

	Catalogue_all_moves();//either 0 for player or 1 for enemies

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
							input_start_X = i;
							input_start_Y = j;
							chosen_move = possible_enemy_moves[i][j][k];
						}
						
					}
				}
			}
		}
	}

	//now we have coords and move
	console.log(input_start_X);
	console.log(input_start_Y);
	console.log(chosen_move);
	if(the_Board[input_start_X + chooseMoveX[chosen_move][input_start_Y + chooseMoveY[chosen_move] === 0){
		Move_This_To_That(input_start_X, input_start_Y, chooseMoveX[chosen_move], chooseMoveY[chosen_move]);
		console.log("AI is not retarded ",chosen_move) ;
	}
//
}
const chooseMoveX = {
	0: 0
	1: -1
	2: -1
	3: +1
	4: +1
	5: -1
	6: -1
	7: +1
	8: +1
}
const chooseMoveY = {
	0: 0
	1: -1
	2: +1
	3: -1
	4: +1
	5: -1
	6: +1
	7: -1
	8: +1
}
let possible_enemy_moves = makeArray(8, 8, 4, 0);//first 2 var are coordinates, third is list of moves
//8 move variations. if any slot != 0 can move
/*
5       6
  1   2
    0
  3   4
7       8
*/
let number_possibilities = 0;
function Catalogue_all_moves(){
	possible_enemy_moves = makeArray(8, 8, 4, 0);
	
	number_possibilities = 0;
	for(let i=0; i<8;i++){
		for(let j=0; j<8;j++){
			if(the_Board[i][j]===2){//peasants
				let k = 0;
				
				if(the_Board[i+1][j-1]===0 && i<7 && j>0){
					possible_enemy_moves[i][j][k] = 3;
					k++;
					number_possibilities++;
				}
				if(the_Board[i+1][j+1]===0 && i<7 && j<7){
					possible_enemy_moves[i][j][k] = 4;
					k++;
					number_possibilities++;
				}
				if((the_Board[i+1][j-1]===(1||3))&&(the_Board[i+2][j-2]===0) && i<6 && j>1){  //peasant code is only working for white. change numbers for black
					possible_enemy_moves[i][j][k] = 7;
					k++;
					number_possibilities++;
				}
				if((the_Board[i+1][j-1]===(1||3))&&(the_Board[i+2][j-2]===0) && i<6 && j<6){
					possible_enemy_moves[i][j][k] = 8;
					k++;
					number_possibilities++;
				}
			}
			if(the_Board[i][j]===4){//kings
				let k = 0;
				
				if(the_Board[i-1][j-1]===0 && i>0 && j>0){
					possible_enemy_moves[i][j][k] = 1;
					k++;
					number_possibilities++;
				}
				if(the_Board[i-1][j+1]===0 && i>0 && j<7){
					possible_enemy_moves[i][j][k] = 2;
					k++;
					number_possibilities++;
				}
				if(the_Board[i+1][j-1]===0 && i<7 && j>0){
					possible_enemy_moves[i][j][k] = 3;
					k++;
					number_possibilities++;
				}
				if(the_Board[i+1][j+1]===0 && i<7 && j<7){
					possible_enemy_moves[i][j][k] = 4;
					k++;
					number_possibilities++;
				}
				if((the_Board[i-1][j-1]===(1||3))&&(the_Board[i-2][j-2]===0) && i>1 && j>1){
					possible_enemy_moves[i][j][k] = 5;
					k++;
					number_possibilities++;
				}
				if((the_Board[i-1][j+1]===(1||3))&&(the_Board[i-2][j+2]===0) && i>1 && j<6){
					possible_enemy_moves[i][j][k] = 6;
					k++;
					number_possibilities++;
				}
				if((the_Board[i+1][j-1]===(faction||faction+2))&&(the_Board[i+2][j-2]===0) && i<6 && j>1){
					possible_enemy_moves[i][j][k] = 7;
					k++;
					number_possibilities++;
				}
				if((the_Board[i+1][j+1]===(faction||faction+2))&&(the_Board[i+2][j+2]===0) && i<6 && j<6){
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
function Move_This_To_That(start_X, start_Y, right, down){//right and down are +-1
	let end_X = start_X+right;
	let end_Y = start_Y+down;

	//base movement only if not killing
	let temp = the_Board[start_X][start_Y];	
	the_Board[start_X][start_Y] = 0;
	the_Board[end_X][end_Y] = temp;

	if (turn === 0){
		turn = 1;
	}else{
		turn = 0;
	}
	
}
function Move_This_To_That_Agressively(start_X, start_Y, right, down){//right and down are +-1
	
	let temp = the_Board[start_X][start_Y];	
	the_Board[start_X][start_Y] = 0;
	the_Board[start_X+right][start_Y+down] = 0;	
	the_Board[start_X+2*right][start_Y+2*down] = temp;
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
function displayClass(type){
	switch(type){
		case 1: return 'black-piece';	
		case 2: return 'red-piece';
		}
	return 'noPieceHere';

}
function display_Board (){
	let id = 0;

	for(let row = 0; row<8;row++){
		for(let square = 0; square<8;square++){
			const doc = document.getElementById(id);
			const { classname  } = doc

			doc.className = className.replace(displayClass(the_Board[row][square]));
			id++;
		}
	}
}

