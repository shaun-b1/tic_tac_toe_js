function PlayerFactory(name, symbol)  {

  this.name = name
  this.symbol = symbol

  function setName(name) {
    this.name = name;
  }
  return { name, symbol, setName };
}

const DOMController = (() => {
  const grid = document.querySelector("#grid");
  const nameContainer = document.querySelector("#player-names");
  const newPlayerForm = document.querySelector("#new-player-form")
  const startGameButton = document.querySelector("#start-game-button")

  function prevent() {
    newPlayerForm.addEventListener("submit", (e) => {
        e.preventDefault();
    })
  }

  function createCell() {
    cell = document.createElement("div");
    cell.classList.add("cell");
    cell.setAttribute("data-player", "");
    grid.appendChild(cell);
    return cell;
  }

  function playerNames(_player1, _player2) {
    for (const argument of arguments) {
      nameText = document.createElement("p");
      nameText.id = `${argument.name}`;
      nameText.textContent = `${argument.name}`;
      nameContainer.append(nameText);
    }
    playerTurn(_player2);
  }

  function playerTurn(player) {
    const names = nameContainer.children;
    for (const name of names) {
      player.name == name.id
        ? name.classList.remove("current-player")
        : name.classList.add("current-player");
    }
  }

  function createModal() {
    modal = document.createElement("div");
    modal.classList.add("modal");
    modalBox = document.createElement("div");
    modalBox.classList.add("modal-box");
    modal.appendChild(modalBox);
    return modal;
  }

  function createCloseModalButton() {
    closeModal = document.createElement("button");
    closeModal.classList.add("close-modal");
    closeModal.textContent = "close modal";
    closeModal.addEventListener("click", () => {
      closeModal.parentElement.parentElement.remove();
    });
    return closeModal;
  }

  function winModal(player) {
    let winModal = createModal();
    document.body.appendChild(winModal);

    let modalBox = document.querySelector(".modal-box");
    let closeModal = createCloseModalButton();
    winDescription = document.createElement("p");
    winDescription.textContent = `${player.name} has won the game`;

    modalBox.append(winDescription, closeModal);
  }

  function drawModal() {
    let drawModal = createModal();
    document.body.appendChild(drawModal);

    let modalBox = document.querySelector(".modal-box");
    let closeModal = createCloseModalButton();
    drawDescription = document.createElement("p");
    drawDescription.textContent = `The game is a draw, no one has won!`;

    modalBox.append(drawDescription, closeModal);
  }

  return { playerTurn, playerNames, winModal, drawModal, createCell, prevent, startGameButton };
})();

const GameBoard = (() => {
  let board = [];

  function init() {
    for (let i = 0; i < 9; i++) {
      let cell = DOMController.createCell();
      board.push(cell);
    }
  }

  function reset() {
    board.forEach((cell) => {
      cell.setAttribute("data-player", "");
      cell.textContent = "";
    });
  }

  return { board, init, reset };
})();

const GameController = (() => {
  let player1 = PlayerFactory("player 1", "X");
  let player2 = PlayerFactory("player 2", "O");
  let currentPlayer = player1;
  GameBoard.init();
  
  function play(e) {
    if (currentPlayer === player1) {
      turn(player1, player2, e);
    } else if (currentPlayer === player2) {
      turn(player2, player1, e);
    }
  }
  
  function turn(player, opponent, e) {
    DOMController.playerTurn(player);
    if (e.target.getAttribute("data-player") === "") {
      e.target.textContent = player.symbol;
      e.target.setAttribute("data-player", `${player.symbol}`);
      checkWin();
      checkDraw();
      currentPlayer = opponent;
    } else {
      return;
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
      [2, 4, 6],
    ];
    
    winPositions.forEach((win) => {
      if (
        GameBoard.board[win[0]].getAttribute("data-player") ===
        currentPlayer.symbol &&
        GameBoard.board[win[1]].getAttribute("data-player") ===
        currentPlayer.symbol &&
        GameBoard.board[win[2]].getAttribute("data-player") ===
        currentPlayer.symbol
        ) {
          DOMController.winModal(currentPlayer);
          GameBoard.reset();
        }
      });
    }
    
    function checkDraw() {
      if (
        GameBoard.board.every((cell) => cell.getAttribute("data-player") !== "")
        ) {
          DOMController.drawModal();
          GameBoard.reset();
        }
      }
      
  DOMController.startGameButton.addEventListener("click", () => {
    DOMController.prevent() 
    player1.setName(document.getElementById("player1").value)
    player2.setName(document.getElementById("player2").value)
    DOMController.playerNames(player1, player2);
    DOMController.startGameButton.parentElement.parentElement.parentElement.remove()
  })

  GameBoard.board.forEach((cell) => {
    cell.addEventListener("click", play);
  });

  return { player1, player2 };
})();
