import React from 'react';
import './App.css';

/* Aufgaben:
  1. Vervollständigen Sie den Code, so dass das Spiel lauffähig ist
  2. Implementieren Sie einen Undo-Button, der den jeweils letzten Schritt rückgängig macht
  3. Persistieren Sie den Spielzustand im LocalStorage, um nicht vollendete Partien später fortsetzen zu können
*/

export default function TicTacToe() {
  // INFO unsere neun Felder, anfänglich sind alle `null`
  const [squares, setSquares] = React.useState(Array(9).fill(null));

  const nextValue = getNextValue(squares);
  const winner = getWinner(squares);
  const status = getStatusMessage(winner, squares, nextValue);

  function updateSquare(squareIndex) {
    // TODO Felder mit neuem Wert aktualisieren, sofern angebracht
  }

  function restart() {
    // TODO Zustand des Spiels zurücksetzen
  }

  return (
    <div className="game">
      <div className="status">{status}</div>

      <div className="squares">
        {squares.map((square, index) => (
          <button key={index} onClick={() => updateSquare(index)}>
            {square}
          </button>
        ))}
      </div>

      <button className="restart" onClick={restart}>
        restart
      </button>
    </div>
  );
}

// -- Helper functions ---

function getNextValue(squares) {
  // TODO durch Auswertung der Felder herausfinden, wer als nächstes am Zug ist
}

function getStatusMessage(winner, squares, nextPlayer) {
  if (winner) return `Gewinner: ${winner}`;
  if (squares.every(Boolean)) return 'Gleichstand';
  return `Nächster Zug: ${nextPlayer}`;
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
