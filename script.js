const GameInfo = document.querySelector(".game-info");
const Boxes = document.querySelectorAll(".box");
const newGame = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPosition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Initializing the game by creating a function

function initGame() {
    currentPlayer = "X";
    gameGrid = ["", "", "", "", "", "", "", "", ""];

    Boxes.forEach((box, index) => {
        box.innerText = "";
        Boxes[index].style.pointerEvents = "all";

        // initializing css for boxes again 
        box.classList = `box box${index + 1}`;

    })
    newGame.classList.remove("active");
    GameInfo.innerText = `Current Player - ${currentPlayer}`;
}

initGame();



function swapTurn() {
    if (currentPlayer === "X") {
        currentPlayer = "O";
    }
    else {
        currentPlayer = "X";
    }

    GameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function checkGameOver() {
    let answer = "";
    winningPosition.forEach((position) => {
        if ((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "")
            && (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]])) {

            // if x is winner 
            if (gameGrid[position[0]] === "X")
                answer = "X";
            else
                answer = "O";

            // after wiiner declared disable curser pointer events

            Boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            })

            // addded bg for winner X/O 

            Boxes[position[0]].classList.add("win");
            Boxes[position[1]].classList.add("win");
            Boxes[position[2]].classList.add("win");

        }

        // again we have a winner 

        if (answer !== "") {
            GameInfo.innerText = `Winner Player - ${answer}`;
            newGame.classList.add("active");
            return;
        }

        // for there is no winner 
        let fillCount = 0;
        gameGrid.forEach((box) => {
            if (box != "")
                fillCount++;
        });

        if (fillCount === 9) {
            GameInfo.innerText = "Game Tied !";
            newGame.classList.add("active");
        }

    })
}

function handleClick(index) {
    if (gameGrid[index] === "") {
        gameGrid[index] = currentPlayer;
        Boxes[index].innerText = currentPlayer;
        Boxes[index].style.pointerEvents = "none";
        // console.log(index);

        // Exhanging the player
        swapTurn();
        checkGameOver();

    }
}

Boxes.forEach((box, index) => {
    box.addEventListener('click', () => {
        handleClick(index);
        // console.log(box);
    })
})

newGame.addEventListener('click', initGame);