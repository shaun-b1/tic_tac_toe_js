const Player = (name, symbol) => {
    const getName = () => name;
    const getSymbol = () => symbol;

    return { getName, getSymbol };
}

// const modal = (() => {// put all the game creation logic in here (just ask for player names)})

const GameBoard = (() => {
    const board = []
    const grid = document.querySelector("#grid")

    function init() {
        for (let i = 0; i < 9; i++) {
            cell = document.createElement("div")
            cell.classList.add('cell')
            cell.setAttribute("data-player", "")
            board.push(cell)
            grid.appendChild(cell)
        }
    }

    function reset() {
        board = []
        while (grid.firstChild) {
            grid.removeChild(grid.lastChild);
        }
        init()
    }

    return { board, grid, init, reset }
})()

const GameController = (() => {
    const player1 = Player("player 1", "X")
    const player2 = Player("player 2", "O")
    let turncount = 1
    let currentPlayer = player1
    GameBoard.init(player1, player2)
    board = GameBoard.board

    function play(e) {
        if (turncount % 2 == 0) {
            currentPlayer = player2
        } else if (turncount % 2 != 0) {
            currentPlayer = player1
        }

        e.target.textContent = currentPlayer.getSymbol()
        e.target.setAttribute("data-player", `${currentPlayer.getSymbol()}`)
        checkWin()
        console.log(turncount)
        turncount++
    }

    function checkWin() {
        const winPositions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ]

        winPositions.forEach((win, index) => {
            if (board[win[0]].getAttribute("data-player") === currentPlayer.getSymbol() &&
                board[win[1]].getAttribute("data-player") === currentPlayer.getSymbol() &&
                board[win[2]].getAttribute("data-player") === currentPlayer.getSymbol()) {
                alert(`${currentPlayer.getName()} has won!`)
            }
        })

    }

    board.forEach((cell) => {
        cell.addEventListener("click", play)
    })

    // a reset game function that resets turn count and calls the reset board function 
})()