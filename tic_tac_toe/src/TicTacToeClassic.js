import React, { useState } from 'react';

// PUBLIC_INTERFACE
function TicTacToeClassic() {
  /**
   * Main container for the Classic TicTacToe game.
   * - Displays a centered 3x3 grid
   * - Shows current player's turn
   * - Displays win/draw/ongoing status
   * - Allows game restart
   * The color palette is:
   *   Primary: #1976D2 (main blue)
   *   Secondary: #FFFFFF (white)
   *   Accent: #FFEB3B (yellow accent for winner)
   */

  // Initial empty board: 9 cells (3x3) as an array of nulls
  const initialBoard = Array(9).fill(null);
  const [board, setBoard] = useState(initialBoard);
  const [isXNext, setIsXNext] = useState(true); // True if X's turn, else O's turn
  const [winner, setWinner] = useState(null); // "X", "O", or null
  const [isDraw, setIsDraw] = useState(false);

  // Define colors as JS variables to match given palette
  const colors = {
    primary: "#1976D2",
    secondary: "#FFFFFF",
    accent: "#FFEB3B",
    border: "#BDBDBD",
    cellHover: "#E3F2FD",
    shadow: "#e3eefc",
  };

  // Check for winner or draw after each move
  const calculateWinner = (currentBoard) => {
    // All winning combinations: rows, columns, diagonals
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6],            // diagonals
    ];
    for (let line of lines) {
      const [a, b, c] = line;
      if (
        currentBoard[a] &&
        currentBoard[a] === currentBoard[b] &&
        currentBoard[a] === currentBoard[c]
      ) {
        return currentBoard[a]; // "X" or "O"
      }
    }
    return null;
  };

  const handleCellClick = (idx) => {
    // Don't allow play if there is a winner, draw, or the cell is taken
    if (board[idx] || winner) return;

    const newBoard = [...board];
    newBoard[idx] = isXNext ? "X" : "O";

    // Check if move results in a win
    const win = calculateWinner(newBoard);
    let draw = false;
    if (!win && newBoard.every(cell => cell)) draw = true;

    setBoard(newBoard);
    setWinner(win);
    setIsDraw(draw);
    setIsXNext(!isXNext);
  };

  const restartGame = () => {
    setBoard(initialBoard);
    setIsXNext(true);
    setWinner(null);
    setIsDraw(false);
  };

  // Status message logic
  let status;
  if (winner) {
    status = (
      <span>
        <span style={{
          color: colors.accent,
          fontWeight: "700"
        }}>{winner}</span>{" "}
        wins!
      </span>
    );
  } else if (isDraw) {
    status = <span>It's a draw!</span>;
  } else {
    status = (
      <span>
        Turn:{" "}
        <span style={{
          color: isXNext ? colors.primary : "#D81B60",
          fontWeight: "600"
        }}>{isXNext ? "X" : "O"}</span>
      </span>
    );
  }

  // Determine winning line for highlighting
  const getWinningLine = () => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6],
    ];
    for (let line of lines) {
      const [a, b, c] = line;
      if (
        board[a] &&
        board[a] === board[b] &&
        board[a] === board[c]
      ) {
        return line;
      }
    }
    return [];
  };
  const winningLine = winner ? getWinningLine() : [];

  // Styling for the main container + grid
  return (
    <div style={{
      minHeight: '80vh',
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      background: colors.secondary,
      borderRadius: 16,
      boxShadow: `0 4px 24px 0 ${colors.shadow}`,
      maxWidth: 370,
      margin: "40px auto",
      padding: "28px 18px 24px 18px",
    }}>
      {/* Current player's turn display */}
      <div style={{
        fontSize: 22,
        fontWeight: 500,
        marginBottom: 15,
        color: colors.primary,
        textAlign: 'center'
      }}>
        Classic TicTacToe
      </div>
      <div aria-live="polite" style={{
        fontSize: 18,
        fontWeight: 600,
        marginBottom: 24,
        color: '#293040',
        textAlign: 'center',
        letterSpacing: "0.08em"
      }}>
        {status}
      </div>

      {/* The 3x3 game grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 56px)",
          gridTemplateRows: "repeat(3, 56px)",
          gap: "6px",
          marginBottom: 20,
        }}
      >
        {board.map((cell, idx) => {
          const isWinningCell = winningLine.includes(idx);
          return (
            <button
              key={idx}
              onClick={() => handleCellClick(idx)}
              aria-label={`Tic Tac Toe cell ${idx + 1}`}
              style={{
                width: "56px",
                height: "56px",
                background: colors.secondary,
                border: `2.5px solid ${isWinningCell ? colors.accent : colors.primary}`,
                borderRadius: "7px",
                fontSize: "2rem",
                fontWeight: "700",
                color: cell === "X"
                  ? colors.primary
                  : (cell === "O" ? "#D81B60" : "#90A4AE"),
                cursor: cell || winner ? "not-allowed" : "pointer",
                boxShadow: isWinningCell
                  ? `0 0 6px 1px ${colors.accent}`
                  : "none",
                transition: "background 0.18s, box-shadow 0.18s"
              }}
              disabled={Boolean(cell) || Boolean(winner)}
              tabIndex={0}
              onKeyDown={(e) => {
                if ((e.key === "Enter" || e.key === " ") && !cell && !winner) {
                  handleCellClick(idx);
                }
              }}
              onMouseOver={e => {
                if (!cell && !winner) e.currentTarget.style.background = colors.cellHover;
              }}
              onMouseOut={e => {
                e.currentTarget.style.background = colors.secondary;
              }}
            >
              {cell}
            </button>
          );
        })}
      </div>

      {/* Status and Restart button below grid */}
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 10,
        width: "100%",
        margin: '0 auto 0 auto'
      }}>
        {/* Only show the result if game ended */}
        {(winner || isDraw) &&
          <div style={{
            fontSize: 17,
            fontWeight: 500,
            color: winner ? colors.accent : colors.primary,
            marginBottom: 3,
          }}>
            {winner ? `${winner} wins the game!` : "Game ends in a draw!"}
          </div>
        }
        <button
          className="btn"
          style={{
            fontWeight: 600,
            background: colors.primary,
            color: colors.secondary,
            minWidth: 110,
            borderRadius: 6,
            fontSize: 16,
            border: 'none',
            letterSpacing: "0.06em",
            marginTop: 7,
            cursor: "pointer"
          }}
          onClick={restartGame}
          aria-label="Restart game"
        >
          Restart
        </button>
      </div>
    </div>
  );
}

export default TicTacToeClassic;
