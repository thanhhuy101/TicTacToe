import { useState } from "react";

// Define types
type Player = "X" | "O" | null;
type Board = Player[];
type WinningCombination = [number, number, number];

interface GameHistory {
  x: number;
  o: number;
  draws: number;
}

const TicTacToe = () => {
  const [board, setBoard] = useState<Board>(Array(9).fill(null));
  const [isXTurn, setIsXTurn] = useState<boolean>(true);
  const winningCombinations: WinningCombination[] = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  const [gameHistory, setGameHistory] = useState<GameHistory>({
    x: 0,
    o: 0,
    draws: 0,
  });

  function getWinner(squares: Board): Player {
    for (const combination of winningCombinations) {
      const [a, b, c] = combination;
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  }

  function handleSquareClick(index: number): void {
    if (board[index] || getWinner(board)) {
      return;
    }

    const updatedBoard = [...board];
    updatedBoard[index] = isXTurn ? "X" : "O";
    setBoard(updatedBoard);
    setIsXTurn(!isXTurn);

    const winner = getWinner(updatedBoard);
    const isDraw = updatedBoard.every((square) => square !== null);

    if (winner) {
      setGameHistory((prev) => ({
        ...prev,
        [winner.toLowerCase()]:
          prev[winner.toLowerCase() as keyof GameHistory] + 1,
      }));
    } else if (isDraw) {
      setGameHistory((prev) => ({
        ...prev,
        draws: prev.draws + 1,
      }));
    }
  }

  function getGameStatus(): string {
    const winner = getWinner(board);
    if (winner) {
      return `Winner: ${winner}`;
    }
    if (board.every((square) => square !== null)) {
      return "It's a draw!";
    }
    return `Next player: ${isXTurn ? "X" : "O"}`;
  }

  function resetGame(): void {
    setBoard(Array(9).fill(null));
    setIsXTurn(true);
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="w-full max-w-[480px] mx-5">
        <h1 className="text-5xl font-semibold text-white mb-8 text-center">
          Tic Tac Toe
        </h1>

        {/* History of 2 players */}
        <div className="flex justify-between mb-8">
          <div className="text-center">
            <div className="text-gray-400 text-sm">Player X</div>
            <div className="text-2xl font-bold text-white">{gameHistory.x}</div>
          </div>
          <div className="text-center">
            <div className="text-gray-400 text-sm">Draws</div>
            <div className="text-2xl font-bold text-gray-400">
              {gameHistory.draws}
            </div>
          </div>
          <div className="text-center">
            <div className="text-gray-400 text-sm">Player O</div>
            <div className="text-2xl font-bold text-slate-400">
              {gameHistory.o}
            </div>
          </div>
        </div>

        <div
          className={`text-center mb-6 ${
            getWinner(board)
              ? "text-2xl font-bold text-green-400 animate-bounce"
              : "text-xl text-white"
          }`}
        >
          {getGameStatus()}
        </div>
        <div className="grid grid-cols-3 gap-1 rounded-xl overflow-hidden mb-6">
          {board.map((square, index) => (
            <button
              key={index}
              className={`h-32 w-full bg-gray-800 rounded-md text-6xl font-light transition-colors duration-200 hover:bg-gray-700 ${
                square === "X" ? "text-white" : "text-slate-400"
              }`}
              onClick={() => handleSquareClick(index)}
            >
              {square}
            </button>
          ))}
        </div>

        <button
          className="w-full py-3 text-lg text-white border rounded-xl hover:bg-gray-59 hover:text-gray-800 transition-colors duration-200"
          onClick={resetGame}
        >
          New Game
        </button>
      </div>
    </div>
  );
};

export default TicTacToe;
