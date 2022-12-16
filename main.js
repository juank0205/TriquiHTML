let x=0, o=0, boards = 0;
let templateGame = document.getElementById('template-card').content;
let game = document.getElementById('game');
let xPoints = document.querySelector('#x');
let oPoints = document.querySelector('#o');

//Create new board
document.querySelector('#add').addEventListener('click', () => {
    boards++;
    const clone = templateGame.cloneNode(true);
    clone.querySelector('.table').id = boards;
    game.appendChild(clone);
    newGame(boards);
});

//Add functionality to new board
function newGame(id){
    //Store the current board acording to the id given
    const clone = document.getElementById(id)
    let movesArray = new Array(9).fill(null);
    let turn = true;
    let isOver = false;

    //Add click listener to the board
    clone.addEventListener('click', (event)=>{
        //RETURN if board already has a winner
        if (isOver) return;

        //Store the box that was clicked and its id
        const box = event.target;
        if (box.classList.contains('table')) return;
        const index = box.classList[1].charAt(box.classList[1].length-1);
        if (index>9 && index<1) return;

        //Check if that box has already been played, if it hasnt been, set the class to mark-x or mark-o
        if (movesArray[index-1] == null){
            if (turn) box.classList.add('mark-x');
            else box.classList.add('mark-o');
            movesArray[index-1] = turn;
            turn = !turn;
        }

        //Check if there is a winner with the last move
        const mayWinner = numberWin(movesArray);
        if (mayWinner){
            printLine(clone, mayWinner);
            addPoint(turn);
            isOver = true;
        }
    });
}

//Functions to check winner and change score
const winner = (i, j, k, movesArray) => movesArray[i] == movesArray[j] && movesArray[j] == movesArray[k] && movesArray[i] != null ? true : false;
const numberWin = movesArray => winner(0, 1, 2, movesArray) ? 1 : winner(3, 4, 5, movesArray) ? 2 : winner(6, 7, 8, movesArray) ? 3 : winner(0, 3, 6, movesArray) ? 4 : winner(1, 4, 7, movesArray) ? 5 : winner(2, 5, 8, movesArray) ? 6 : winner(0, 4, 8, movesArray) ? 7 : winner(2, 4, 6, movesArray) ? 8 : null;
const addPoint = turn => {
    turn ? o++ : x++;
    xPoints.innerText = x;
    oPoints.innerText = o;
};

//Print the winning line
function printLine(clone, mayWinner){
    const lineWinner = document.createElement('div');
    lineWinner.classList.add('line-winner-'+ mayWinner, 'line');
    clone.append(lineWinner);
}