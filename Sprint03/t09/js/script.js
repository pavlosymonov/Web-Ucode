const ticTacToeGame = new TicTacToeGame();
ticTacToeGame.start();

function TicTacToeGame() {
  const counter = document.getElementById('turns-count');
  const board = new Board();
  let turn = 0;

  this.start = function() {
    const area = document.querySelector('#game-area');
    const reloadBtn = document.querySelector('.play-btn');
    area.addEventListener('click', takeTurn);
    reloadBtn.addEventListener('click', () => location.reload());
  };

  function takeTurn(event) {
    if (turn % 2 === 0) {
      if (fillCell(event.target, 'x', 'player-two', 'player-one') === -1)
        return;
    } else {
      if (fillCell(event.target, 'o', 'player-one', 'player-two') === -1)
        return;
    }
    
    turn++;
    counter.innerText = turn;
    if (check(board.checkForWinner(), turn)) return;
  }

  function check(isWinner, turn) {
    if (isWinner || turn === 9) {
      event.currentTarget.removeEventListener('click', takeTurn);
      event.currentTarget.className += ' locked-area';
      removeTurnStatus(turn % 2 === 0 ? 'player-one' : 'player-two');
      if (turn === 9 && !isWinner) {
        document.querySelector('.sidebar').className += ' sidebar-yellow';
        document.querySelector('.result').innerText = "It's a draw!";
      }
      return true;
    }
    return false;
  }

  function fillCell(e, letter, turn, notTurn) {
    if (e.innerText === '') {
      e.innerText = letter;
      e.className += ' closed-cell';
    } else {
      return -1;
    }
    setTurnStatus(turn);
    removeTurnStatus(notTurn);
  }

  function setTurnStatus(playerTurn) {
    document.getElementById(playerTurn).classList.add('turn');
  }

  function removeTurnStatus(playerNotTurn) {
    document.getElementById(playerNotTurn).classList.remove('turn');
  }
}

function Board() {
  this.sections = Array.from(document.querySelectorAll('.game-area__section'));

  this.checkForWinner = function() {
    let winner = false;
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    const sections = this.sections;

    winningCombinations.forEach(winningCombo => {
      const pos0InnerText = sections[winningCombo[0]].innerText;
      const pos1InnerText = sections[winningCombo[1]].innerText;
      const pos2InnerText = sections[winningCombo[2]].innerText;
      const isWinningCombo = pos0InnerText !== '' &&
        pos0InnerText === pos1InnerText &&
        pos1InnerText === pos2InnerText;

      if (isWinningCombo) {
        winner = true;
        winningCombo.forEach(index => {
          sections[index].className += ' winner';
        });
        showResult(pos0InnerText);
      }
    });

    return winner;
  };

  function showResult(whoIsWinner) {
    const result = document.querySelector('.result');
    const sidebar = document.querySelector('.sidebar');
    if (whoIsWinner === 'x') {
      result.innerText = 'Player 1 won!';
      sidebar.className += ' sidebar-green';
    } else if (whoIsWinner === 'o') {
      result.innerText = 'Player 2 won!';
      sidebar.className += ' sidebar-green';
    }
  }
}
