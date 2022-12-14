const boxlist = document.querySelectorAll('.table .box');
let turn = true;
const movesArray = new Array(9).fill(null);

function winner(i, j, k){
    if  (movesArray[i] == movesArray[j] &&
        movesArray[j] == movesArray[k] &&
        movesArray[i] != null) 
        return true;
        return false;
}

function numberWin(){
    if (winner(0, 1, 2)){
        return 1;
    }
    if (winner(3, 4, 5)){
        return 2;
    }
    if (winner(6, 7, 8)){
        return 3;
    }
    if (winner(0, 3, 6)){
        return 4;
    }
    if (winner(1, 4, 7)){
        return 5;
    }
    if (winner(2, 5, 8)){
        return 6;
    }
    if (winner(0, 4, 8)){
        return 7;
    }
    if (winner(2, 4, 6)){
        return 8;
    }
    return null;
}

boxlist.forEach( (box, index) => {
    box.addEventListener('click', () =>{
        if (turn){
            box.classList.add('mark-x');
        }else{
            box.classList.add('mark-o')
        }
        movesArray[index] = turn;
        const mayWinner = numberWin();
        if (mayWinner){
            const lineWinner = document.createElement('div');
            lineWinner.classList.add('line');
            lineWinner.classList.add('line-winner-'+mayWinner);
            document.querySelector('.table').append(lineWinner);
        }
        turn = !turn
    }, {once: true})
})