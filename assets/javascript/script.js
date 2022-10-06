function playerFactory(name, symbol) {

    return {
        getName() {
            return name
        },
        getSymbol() {
            return symbol
        },
        setName(name) {
            this.name = name
        }
    };
}

const DOMController = (() => {
    const header = document.querySelector("#header")
    const grid = document.querySelector("#grid")

    function playerTurn() {
        const playerTurnDisplay = document.createElement('div');
        playerTurnDisplay.classList.add('player-turn')

        // const playerTurnText = document.createElement('p');
        // playerTurnText.textContent = `Fred's turn`

        // playerTurnDisplay.appendChild(playerTurnText);
        header.appendChild(playerTurnDisplay)
    }

    function winModal(player) {
        winModal = document.createElement('div');
        winModal.classList.add('modal');
        winModal.id = 'winner-modal';

        modalBox = document.createElement('div')

        winDescription = document.createElement('p')
        winDescription.textContent = `${player.getName()} has won the game`

        closeWinModal = document.createElement('button');
        closeWinModal.classList.add('close-modal')
        closeWinModal.textContent = 'close modal'
        closeWinModal.addEventListener('click', () => {
            closeWinModal.parentElement.parentElement.remove()
        })

        modalBox.append(winDescription, closeWinModal);
        winModal.appendChild(modalBox);
        document.body.appendChild(winModal)

    }

    function createCell() {
        cell = document.createElement("div")
        cell.classList.add('cell')
        cell.setAttribute("data-player", "")
        grid.appendChild(cell)
        return cell
    }

    return { grid, playerTurn, winModal, createCell }
})()

const GameBoard = (() => {
    let board = []

    function init() {
        for (let i = 0; i < 9; i++) {
            cell = DOMController.createCell()
            board.push(cell)
        }
    }

    function reset() {
        board.forEach(cell => {
            cell.setAttribute('data-player', '')
            cell.textContent = ''
        })
    }

    return { board, init, reset }
})()

const GameController = (() => {
    const player1 = playerFactory("player 1", "X")
    const player2 = playerFactory("player 2", "O")
    let turncount = 1
    let currentPlayer = player1
    GameBoard.init()
    board = GameBoard.board

    function play(e) {

        switch (currentPlayer) {
            case player1:
                if (e.target.getAttribute("data-player") == "") {
                    e.target.textContent = currentPlayer.getSymbol()
                    e.target.setAttribute("data-player", `${currentPlayer.getSymbol()}`)
                    checkWin()
                    currentPlayer = player2
                    turncount++
                } else {
                    return
                }
                break;

            case player2:
                if (e.target.getAttribute("data-player") == "") {
                    e.target.textContent = currentPlayer.getSymbol()
                    e.target.setAttribute("data-player", `${currentPlayer.getSymbol()}`)
                    checkWin()
                    currentPlayer = player1
                    turncount++
                } else {
                    return
                }
                break;
        }
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

        winPositions.forEach(win => {
            if (board[win[0]].getAttribute("data-player") === currentPlayer.getSymbol() &&
                board[win[1]].getAttribute("data-player") === currentPlayer.getSymbol() &&
                board[win[2]].getAttribute("data-player") === currentPlayer.getSymbol()) {
                DOMController.winModal(currentPlayer)
                reset()
            }
        })

    }

    board.forEach((cell) => {
        cell.addEventListener("click", play)
    })

    function reset() {
        turncount = 1
        GameBoard.reset()
    }

})()