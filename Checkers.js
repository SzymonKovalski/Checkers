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
var living[2] ={12}//0 for you 1 for enemy

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

	console.log("enemy turn");
	console.table(the_Board);

	Catalogue_all_moves(turn);//either 0 for player or 1 for enemies



	turn = 0;
}
var possible_enemy_moves[N][N][4] = {0};//first 2 var are coordinates, third is list of moves
//8 move variations. if any slot != 0 can move
/*
5       6
  1   2
    0
  3   4
7       8
*/
function Catalogue_all_moves(faction){ // check if there is an exception
	possible_enemy_moves[N][N][4] = {0};
	let counter =0;
	for(let i=0; i<N;i++){
		for(let j=0; j<N;j++){
			let counter++
			if(the_Board[i][j]===faction+1){//peasants
				let k = 0;
				if(the_Board[i+1][j-1]===0){
					possible_enemy_moves[i][j][k] = 3;
					k++
				}
				if(the_Board[i+1][j+1]===0){
					possible_enemy_moves[i][j][k] = 4;
					k++
				}
				if((the_Board[i+1][j-1]===faction||faction+2)&&(the_Board[i+2][j-2]===0)){  //peasant code is only working for white. change numbers for black
					possible_enemy_moves[i][j][k] = 7;
					k++
				}
				if((the_Board[i+1][j-1]===faction||faction+2)&&(the_Board[i+2][j-2]===0)){
					possible_enemy_moves[i][j][k] = 8;
					k++
				}
			}
			if(the_Board[i][j]===faction+2){//kings
				let k = 0;
				if(the_Board[i-1][j-1]===0){
					possible_enemy_moves[i][j][k] = 1;
					k++;
				}
				if(the_Board[i-1][j+1]===0){
					possible_enemy_moves[i][j][k] = 2;
					k++;
				}
				if(the_Board[i+1][j-1]===0){
					possible_enemy_moves[i][j][k] = 3;
					k++;
				}
				if(the_Board[i+1][j+1]===0){
					possible_enemy_moves[i][j][k] = 4;
					k++;
				}
				if((the_Board[i-1][j-1]===faction||faction+2)&&(the_Board[i-2][j-2]===0)){
					possible_enemy_moves[i][j][k] = 5;
					k++;
				}
				if((the_Board[i-1][j+1]===faction||faction+2)&&(the_Board[i-2][j+2]===0)){
					possible_enemy_moves[i][j][k] = 6;
					k++;
				}
				if((the_Board[i+1][j-1]===faction||faction+2)&&(the_Board[i+2][j-2]===0)){
					possible_enemy_moves[i][j][k] = 7;
					k++;
				}
				if((the_Board[i+1][j+1]===faction||faction+2)&&(the_Board[i+2][j+2]===0)){
					possible_enemy_moves[i][j][k] = 8;
					k++;
				}
			}
		}
	}
	living[faction]=counter;
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

function Move_Peacefully(start_X, start_Y, end_X, end_Y){
	the_Board[end_X][end_Y] = the_Board[start_X][start_Y];
	the_Board[start_X][start_Y] = 0;
	if (turn === 0)turn = 1
	else turn = 0;
}
function Move_to_Kill(start_X, start_Y, end_X, end_Y){

}