const Player = (name, symbol) => {
    const getName = () => name;
    const getSymbol = () => symbol;

    return { getName, getSymbol };
}

// const modal = (() => {// put all the game creation logic in here (just ask for player names)})

const GameBoard = (() => {
    const BOARD = []
    const grid = document.querySelector("#grid")

    function init() {
        for (let i = 0; i < 9; i++) {
            cell = document.createElement("div")
            cell.classList.add('cell')
            cell.setAttribute("data-player", "")
            BOARD.push(cell)
            grid.appendChild(cell)
        }
    }

    function reset() {
        BOARD = []
        while (grid.firstChild) {
            grid.removeChild(grid.lastChild);
        }
        init()
    }

    return { BOARD, grid: grid, init, reset }
})()

const GameController = (() => {
    const player1 = Player("player 1", "X")
    const player2 = Player("player 2", "O")
    let turncount = 1
    let currentPlayer = player1
    GameBoard.init(player1, player2)
    board = GameBoard.BOARD

    function play(e) {
        if (turncount % 2 == 0) {
            currentPlayer = player2
        } else if (turncount % 2 != 0) {
            currentPlayer = player1
        }

        e.target.textContent = currentPlayer.getSymbol()
        e.target.setAttribute("data-player", `${currentPlayer.getSymbol()}`)
        console.log(turncount)
        turncount++
    }


    board.forEach((cell) => {
        cell.addEventListener("click", play)
    })

    // a reset game function that resets turn count and calls the reset board function 
    // a winner function that checks if three in a row has been achieved. 
})()