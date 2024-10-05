"use client";
import React, { useState, useEffect, useCallback } from "react";
import { AlertCircle, Clock, User, Trophy } from "lucide-react";

const GameOf15 = () => {
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  const [firstMover, setFirstMover] = useState("");
  const [firstMoverChoice, setFirstMoverChoice] = useState("");
  const [gameStarted, setGameStarted] = useState(false);
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isOddTurn, setIsOddTurn] = useState(true);
  const [winner, setWinner] = useState(null);
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [timeLeft, setTimeLeft] = useState(30);
  const [points, setPoints] = useState({});
  const [currentGame, setCurrentGame] = useState(1);
  const [seriesWinner, setSeriesWinner] = useState(null);
  const [player1IsOdd, setPlayer1IsOdd] = useState(true);

  const isOddNumber = (num) => num % 2 !== 0;

  const checkWin = useCallback((checkBoard) => {
    const winningCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let combo of winningCombos) {
      const [a, b, c] = combo;
      if (
        checkBoard[a] !== null &&
        checkBoard[b] !== null &&
        checkBoard[c] !== null
      ) {
        if (checkBoard[a] + checkBoard[b] + checkBoard[c] === 15) {
          return isOddNumber(checkBoard[a]) ? "odd" : "even";
        }
      }
    }
    return null;
  }, []);

  const handleCellClick = (index) => {
    if ((board[index] !== null && selectedNumber !== 0) || winner) return;

    const newBoard = [...board];
    newBoard[index] = selectedNumber;

    setBoard(newBoard);
    const newWinner = checkWin(newBoard);
    if (newWinner) {
      setWinner(newWinner);
      const winningPlayer =
        (newWinner === "odd") === player1IsOdd ? player1 : player2;
      setPoints((prev) => ({
        ...prev,
        [winningPlayer]: (prev[winningPlayer] || 0) + 1,
      }));
    } else if (
      !newBoard.includes(null) ||
      (newBoard.filter((cell) => cell === null).length === 1 &&
        selectedNumber === 0)
    ) {
      setWinner("cat's game");
    }
    setIsOddTurn(!isOddTurn);
    setSelectedNumber(null);
    setTimeLeft(30);
  };

  const handleNumberSelection = (number) => {
    setSelectedNumber(number);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsOddTurn(firstMoverChoice === "odd");
    setWinner(null);
    setSelectedNumber(null);
    setTimeLeft(30);
  };

  const startNewGame = () => {
    resetGame();
    setCurrentGame((prev) => {
      const nextGame = prev + 1;
      if (
        nextGame > 5 ||
        (nextGame === 5 && points[player1] !== points[player2])
      ) {
        determineSeriesWinner();
        return prev;
      }
      return nextGame;
    });
    setPlayer1IsOdd((prev) => !prev);
    setFirstMoverChoice((prev) => (prev === "odd" ? "even" : "odd"));
  };

  const determineSeriesWinner = () => {
    if (points[player1] > points[player2]) {
      setSeriesWinner(player1);
    } else if (points[player2] > points[player1]) {
      setSeriesWinner(player2);
    } else {
      setSeriesWinner("tie");
    }
  };

  const startGame = () => {
    if (player1 && player2 && firstMover && firstMoverChoice) {
      setGameStarted(true);
      setIsOddTurn(firstMoverChoice === "odd");
      setPlayer1IsOdd(
        firstMover === player1
          ? firstMoverChoice === "odd"
          : firstMoverChoice === "even"
      );
      setPoints({ [player1]: 0, [player2]: 0 });
      resetGame();
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      if (timeLeft > 0 && !winner && gameStarted) {
        setTimeLeft((time) => time - 1);
      }
      if (timeLeft === 0 && !winner && gameStarted) {
        setWinner(isOddTurn ? "even" : "odd");
        const winningPlayer = isOddTurn !== player1IsOdd ? player1 : player2;
        setPoints((prev) => ({
          ...prev,
          [winningPlayer]: (prev[winningPlayer] || 0) + 1,
        }));
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [
    timeLeft,
    winner,
    isOddTurn,
    gameStarted,
    player1,
    player2,
    player1IsOdd,
  ]);

  const availableNumbers = isOddTurn ? [1, 3, 5, 7, 9] : [0, 2, 4, 6, 8];

  if (!gameStarted) {
    return (
      <div className="flex items-center justify-center h-[100vh]">
        <div className="w-96 p-6 bg-white shadow-md rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Game of 15 Setup</h2>
          <div className="mb-4">
            <label className="block mb-2">
              <User className="inline mr-2" />
              Player 1 Name:
            </label>
            <input
              type="text"
              value={player1}
              onChange={(e) => setPlayer1(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              placeholder="Enter Player 1 Name"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">
              <User className="inline mr-2" />
              Player 2 Name:
            </label>
            <input
              type="text"
              value={player2}
              onChange={(e) => setPlayer2(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              placeholder="Enter Player 2 Name"
            />
          </div>
          <div className="mb-4">
            <p className="mb-2">First Mover:</p>
            <button
              onClick={() => setFirstMover(player1)}
              className={`mr-2 px-4 py-2 rounded ${
                firstMover === player1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
            >
              {player1}
            </button>
            <button
              onClick={() => setFirstMover(player2)}
              className={`px-4 py-2 rounded ${
                firstMover === player2
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
            >
              {player2}
            </button>
          </div>
          <div className="mb-4">
            <p className="mb-2">First Mover's Choice:</p>
            <button
              onClick={() => setFirstMoverChoice("odd")}
              className={`mr-2 px-4 py-2 rounded ${
                firstMoverChoice === "odd"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
            >
              Odd
            </button>
            <button
              onClick={() => setFirstMoverChoice("even")}
              className={`px-4 py-2 rounded ${
                firstMoverChoice === "even"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
            >
              Even
            </button>
          </div>
          <button
            onClick={startGame}
            disabled={!player1 || !player2 || !firstMover || !firstMoverChoice}
            className="w-full px-4 py-2 bg-green-500 text-white rounded disabled:opacity-50"
          >
            Start Game Series
          </button>
        </div>
      </div>
    );
  }

  if (seriesWinner) {
    return (
      <div className="flex items-center justify-center h-[100vh]">
        <div className="w-96 p-6 bg-white shadow-md rounded-lg text-center">
          <h2 className="text-2xl font-bold mb-4">Series Ended!</h2>
          <p className="text-xl mb-4">
            {seriesWinner === "tie"
              ? "The series ended in a tie!"
              : `${seriesWinner} wins the series!`}
          </p>
          <p className="mb-4">Final Score:</p>
          <p>
            {player1}: {points[player1]}
          </p>
          <p>
            {player2}: {points[player2]}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Start New Series
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-4">Game of 15</h1>
      <h2 className="text-2xl mb-4">
        Game {currentGame} of {currentGame <= 4 ? "4" : "5"}
      </h2>
      <div className="grid grid-cols-3 gap-2 mb-4">
        {board.map((cell, index) => (
          <button
            key={index}
            className="w-16 h-16 bg-white border border-gray-300 rounded-lg text-2xl font-bold flex items-center justify-center hover:bg-gray-100"
            onClick={() => handleCellClick(index)}
            disabled={
              winner ||
              selectedNumber === null ||
              (cell !== null && selectedNumber !== 0)
            }
          >
            {cell}
          </button>
        ))}
      </div>
      <div className="mb-4 text-lg font-semibold">
        {winner
          ? winner === "cat's game"
            ? "It's a tie!"
            : `${(winner === "odd") === player1IsOdd ? player1 : player2} WINS!`
          : `Current turn: ${isOddTurn === player1IsOdd ? player1 : player2} (${
              isOddTurn ? "ODD" : "EVEN"
            })`}
      </div>
      <div className="mb-4 flex items-center">
        <Clock className="mr-2" />
        Time left: {timeLeft} seconds
      </div>
      <div className="mb-4">
        <p className="mb-2">Select a number:</p>
        <div className="grid grid-cols-5 gap-2">
          {availableNumbers.map((num) => (
            <button
              key={num}
              className={`w-10 h-10 rounded-full ${
                selectedNumber === num
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              } ${board.includes(num) ? "opacity-50 cursor-not-allowed" : ""}`}
              onClick={() => handleNumberSelection(num)}
              disabled={board.includes(num) || winner}
            >
              {num}
            </button>
          ))}
        </div>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-bold flex items-center">
          <Trophy className="mr-2" />
          Series Score
        </h2>
        <p>
          {player1} ({player1IsOdd ? "Odd" : "Even"}): {points[player1] || 0}
        </p>
        <p>
          {player2} ({player1IsOdd ? "Even" : "Odd"}): {points[player2] || 0}
        </p>
      </div>
      {winner && (
        <button
          onClick={startNewGame}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Next Game
        </button>
      )}
    </div>
  );
};

export default GameOf15;
