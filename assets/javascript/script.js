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
    const grid = document.querySelector('#grid')
    const nameContainer = document.querySelector('#player-names')

    function playerTurn(player) {
        const names = nameContainer.children
        for (const name of names) {
            player.getName() == name.id ? name.classList.remove('current-player') : name.classList.add('current-player')
        }
    }

    function playerNames(player1, player2) {

        for (const argument of arguments) {
            nameText = document.createElement('p')
            nameText.id = `${argument.getName()}`
            nameText.textContent = `${argument.getName()}`
            nameContainer.append(nameText)
        }
        playerTurn(player2)
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

    return { grid, playerTurn, playerNames, winModal, createCell }
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
    let currentPlayer = player1
    GameBoard.init()
    board = GameBoard.board
    DOMController.playerNames(player1, player2)

    function play(e) {
        if(currentPlayer == player1) {
            turn(player1, player2, e)
        } else if(currentPlayer == player2) {
            turn(player2, player1, e)
        }
    }

    function turn(player, opponent, e) {
        DOMController.playerTurn(player)
        if (e.target.getAttribute("data-player") == "") {
            e.target.textContent = player.getSymbol()
            e.target.setAttribute("data-player", `${player.getSymbol()}`)
            checkWin()
            currentPlayer = opponent
        } else {
            return
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

    return{player1, player2}
})()