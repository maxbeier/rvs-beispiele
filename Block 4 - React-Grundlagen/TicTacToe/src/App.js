import React from 'react';
import './App.css';

/* Aufgaben:
  1. Vervollständigen Sie den Code, so dass das Spiel lauffähig ist
  2. Implementieren Sie einen Undo-Button, der den jeweils letzten Schritt rückgängig macht
  3. Persistieren Sie den Spielzustand im LocalStorage, um nicht vollendete Partien später fortsetzen zu können
*/

function useLocalStorageState(key, initialState) {
  const [state, setState] = React.useState(
    () => JSON.parse(window.localStorage.getItem(key)) || initialState,
  );

  React.useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state));
  }, [state, key]);

  return [state, setState];
}

export default function TicTacToe() {
  const [history, setHistory] = useLocalStorageState('ttt-history', [
    Array(9).fill(null),
  ]);
  const pushToHistory = (stateArr) => setHistory([...history, stateArr]);
  const restart = () => setHistory([history[0]]);
  const undo = () => setHistory([...history.slice(0, -1)]);
  const lastState = history[history.length - 1];

  return (
    <div className="game">
      <Board squares={lastState} handleUpdate={pushToHistory} />
      <button onClick={restart}>restart</button>
      <button onClick={undo} disabled={history.length <= 1}>
        undo
      </button>
    </div>
  );
}

function Board({ squares, handleUpdate }) {
  const nextValue = getNextValue(squares);
  const winner = getWinner(squares);
  const status = getStatusMessage(winner, squares, nextValue);

  function updateSquare(squareIndex) {
    if (winner || squares[squareIndex]) return;
    // setSquares(
    //   squares.map((value, index) =>
    //     index === squareIndex ? nextValue : value,
    //   ),
    // );
    const squaresCopy = [...squares];
    squaresCopy[squareIndex] = nextValue;
    handleUpdate(squaresCopy);
  }

  return (
    <React.Fragment>
      <div className="status">{status}</div>
      <div className="squares">
        {squares.map((square, index) => (
          <button key={index} onClick={() => updateSquare(index)}>
            {square}
          </button>
        ))}
      </div>
    </React.Fragment>
  );
}

// -- Helper functions ---

function getNextValue(squares) {
  const xCount = squares.filter((r) => r === 'X').length;
  const oCount = squares.filter((r) => r === 'O').length;
  return xCount === oCount ? 'X' : 'O';
}

function getStatusMessage(winner, squares, nextPlayer) {
  if (winner) return `Gewinner: ${winner}`;
  if (squares.every(Boolean)) return 'Gleichstand';
  return `Nächster: ${nextPlayer}`;
}

function getWinner(squares) {
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
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
