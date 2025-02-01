'use strict';


window.addEventListener("load", () => {
    document.querySelector(".welcome").classList.add("trans");
    setTimeout(function () {document.querySelector(".play-button-container").classList.add("show");}, 3000);
});

const createPlayer = function (name, score) {
    const playerName = name;
    const playerScore = score;
    return {playerName, playerScore};
}

const gameBoard = (function() {
    const grid = [[1, 1, 1],
                  [1, 1, 1],
                  [1, 1, 1]];
    const changeGrid = (pos1, pos2, sign) => {
        if (grid[pos1][pos2] !== 1)
            return 0;
        grid[pos1][pos2] = sign;
        return 1;
    };
    const checkWin = () => {
        if (grid[0][0] === 'X' && grid[0][1] === 'X' && grid[0][2] === 'X')
            return 'X';
        if (grid[0][0] === 'O' && grid[0][1] === 'O' && grid[0][2] === 'O')
            return 'O';
        if (grid[1][0] === 'X' && grid[1][1] === 'X' && grid[1][2] === 'X')
            return 'X';
        if (grid[1][0] === 'O' && grid[1][1] === 'O' && grid[1][2] === 'O')
            return 'O';
        if (grid[2][0] === 'X' && grid[2][1] === 'X' && grid[2][2] === 'X')
            return 'X';
        if (grid[2][0] === 'O' && grid[2][1] === 'O' && grid[2][2] === 'O')
            return 'O';
        if (grid[0][0] === 'X' && grid[1][1] === 'X' && grid[2][2] === 'X')
            return 'X';
        if (grid[0][0] === 'O' && grid[1][1] === 'O' && grid[2][2] === 'O')
            return 'O';
        if (grid[0][2] === 'X' && grid[1][1] === 'X' && grid[2][0] === 'X')
            return 'X';
        if (grid[0][2] === 'O' && grid[1][1] === 'O' && grid[2][0] === 'O')
            return 'O';
    };
    const checkDraw = () => {
        for (let i = 0; i < grid[1].length; i++)
            for (let j = 0; j < grid[1].length; j++)
                if (grid[i][j] === 1)
                    return 0;
        return 1;
    };
    return {checkWin, changeGrid, checkDraw};
})();


const displayControl = (function() {
    const playButton = document.querySelector(".play-button");
    const welcome = document.querySelector(".welcome");
    const gameGrid = document.querySelector(".game-and-buttons-container");
    const namesSubmitButton = document.querySelector(".names-submit-button");
    const namesInput = document.querySelector(".names-input");
    const gridGame = document.querySelector(".game");
    function inputNamesInitiate() {
        playButton.addEventListener("click", ()=>{
            welcome.style = "opacity:0; transition:opacity 3s;";
            playButton.classList.add("vanish");
            setTimeout(() => {
                welcome.style = "display: none";
                playButton.style = "display: none";
            }, 3000);
            setTimeout(() => {
                document.querySelector(".names-input").classList.remove("hide");
            }, 4000);
        });
    };
    function hideNameInput(){
        namesInput.style = "opacity:0; transition-duration:3s;";
        setTimeout(() => {
            namesInput.classList.add("hide");
            gameGrid.classList.remove("hide");
        }, 3000);
    }
    let turn = 'X';
    function makeGridPlayable () {
        gridGame.childNodes.forEach((el, i)=>{
            el.addEventListener("click", () => {
                let pos1, pos2;
                if (i === 0)
                    pos1 = 0, pos2 = 0;
                if (i === 1)
                    pos1 = 0, pos2 = 1;
                if (i === 2)
                    pos1 = 0, pos2 = 2;
                if (i === 3)
                    pos1 = 1, pos2 = 0;
                if (i === 4)
                    pos1 = 1, pos2 = 1;
                if (i === 5)
                    pos1 = 1, pos2 = 2;
                if (i === 6)
                    pos1 = 2, pos2 = 0;
                if (i === 7)
                    pos1 = 2, pos2 = 1;
                if (i === 8)
                    pos1 = 2, pos2 = 2;
                if (gameBoard.changeGrid(pos1, pos2) === 1){
                el.textContent = turn;
                if (turn === 'X')
                    turn = 'O';
                else
                    turn = 'X';
                }
            });
        });
    }
    return {inputNamesInitiate, namesSubmitButton, hideNameInput, makeGridPlayable};
})();





const game = (function() {
    function firstButton() {
        displayControl.inputNamesInitiate();
    }
    let player1, player2;
    function secondButton () {
        let first, second;
        displayControl.namesSubmitButton.addEventListener("click", () => {
            first = document.getElementById("player-1-name").value;
            second = document.getElementById("player-2-name").value;
            player1 = createPlayer(first, 0);
            player2 = createPlayer(second, 0);
            displayControl.hideNameInput();
        });
    }

    function play(){
        firstButton();
        secondButton();
        displayControl.makeGridPlayable();
    }
    return {play};
})();


game.play();
