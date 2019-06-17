import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  const {className, onClick, value} = props;
  return (
    <button 
      className={"square " + className}
      onClick={onClick}
    >
      {value}
    </button>
  );
}

function Board(props) {
  const renderSquare = (i => {
    const {squares, onClick, highlight} = props;
    return (
    <Square 
      value={squares[i]}
      onClick={() => onClick(i)}
      className={highlight(i)}
    />
    );
  })

  return (
    <div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
}

function Game() {
  const [historys, setHistory] = useState([{
    squares: Array(9).fill(null)
  }]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);
  const [asc, setAsc] = useState(true);

  const handleClick = (i => {
    const history = historys.slice(0, stepNumber + 1);
    const current = history[history.length - 1]; 
    const squares = current.squares.slice();

    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = xIsNext ? 'X' : 'O';
    setHistory(history.concat([{squares: squares,}]));
    setStepNumber(history.length);
    setXIsNext(!xIsNext);
  });

  const jumpTo = (step => {
    setStepNumber(step);
    setXIsNext((step % 2) === 0);
  });

  const sortOrder = (() => {
    setAsc(!asc);
  });

  const sort = (() => {
    return(
    <button onClick={() => sortOrder()}>
      Sort order
    </button>
    )
  });

  const current = historys[stepNumber];
  const winner = calculateWinner(current.squares);
  const moves = historys.map((step, move) => {
    if(!asc) {
      move = historys.length - move - 1;
    }
    const bold = (stepNumber === move) ? 'bold' : 'unbold';
    const desc = move 
    ? 'Go to move #' + move 
    : 'Go to game start';
    return (
      <li key={move}>
        <button 
          className={bold} 
          onClick={() => jumpTo(move)}
        >
          {desc}
        </button>
      </li>
    );
  });

  function win(i) {
    if(winner) {
      const [a, b, c] = winner.number;
      if(i === a || i === b ||i === c) {
        return "highlight";
      }
    }
  }

  let status;
  if (winner) {
    status = 'Winner: ' + winner.mark;      
  } else {
    status = stepNumber < 9
    ? 'Next player: ' + (xIsNext ? 'X' : 'O')
    : "Draw";
  } 

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={current.squares}
          onClick={(i) => handleClick(i)}
          highlight={(i) => win(i)}
        />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <div>{sort()}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  let line = null;
  lines.forEach(i => {
    let [a, b, c] = i;
   [a, b, c] = [squares[a], squares[b], squares[c]];
    if (a && a === b && a === c) {
      line = { mark: a, number: i };
    }
  })
  return line;
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
