let turn = true;
let movesArray = new Array(9).fill(null);
const juega = document.querySelector('.turnDisplayer');
let x=0, o=0;



function newGame(){
    turn = true;
    isOver = false;
    const table = document.querySelector('.table');
    table.innerHTML = '<div id="1" class="box"></div><div id="2" class="box"></div><div id="3" class="box"></div><div id="4" class="box"></div><div id="5" class="box"></div><div id="6" class="box"></div><div id="7" class="box"></div><div id="8" class="box"></div><div id="9" class="box"></div>'
    const boxlist = document.querySelectorAll('.table .box');

    if (!turn){
        juega.innerText = 'Juega O';
    }else{
        juega.innerText = 'Juega X';
    }

    table.addEventListener('click', (event)=>{
        if (isOver){
            return;
        }
        const box = event.target;
        const index = box.id;
        console.log(index);

        if (index>9 && index<1){
            return;
        }

        if (movesArray[index-1] == null){
            if (turn){
                box.classList.add('mark-x');
                juega.innerText = 'Juega O'
            }else{
                box.classList.add('mark-o')
                juega.innerText = 'Juega X'
            }
            movesArray[index-1] = turn;
            turn = !turn;
        }else{
            void(0);
        }
        console.log(movesArray);
        console.log(turn);

        const mayWinner = numberWin();
        if (mayWinner){
            const lineWinner = document.createElement('div');
            lineWinner.classList.add('line');
            lineWinner.classList.add('line-winner-'+mayWinner);
            document.querySelector('.table').append(lineWinner);
            if (!turn) x++
            else o++;
            isOver = true;
        }

        document.querySelector('#x').innerText = x
        document.querySelector('#o').innerText = o

    });
}
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

document.querySelector('#restart').addEventListener('click', () => {
    movesArray = new Array(9).fill(null);
    newGame();
})



newGame();