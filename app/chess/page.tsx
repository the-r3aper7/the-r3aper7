"use client";

import { DragEvent, useState } from "react";
import Image from "next/image";
import {Card, CardHeader} from "@/components/ui/card";

const boardSize = 8;

type Piece =
  | "bR"
  | "bN"
  | "bB"
  | "bQ"
  | "bK"
  | "bP"
  | "wR"
  | "wN"
  | "wB"
  | "wQ"
  | "wK"
  | "wP"
  | null;

type Position = {
  row: number;
  col: number;
};

type CurrentPiece = {
  piece: Piece;
  position: Position;
};

function Page() {
  const [board, setBoard] = useState<Piece[][]>([
    ["bR", "bN", "bB", "bQ", "bK", "bB", "bN", "bR"],
    ["bP", "bP", "bP", "bP", "bP", "bP", "bP", "bP"],
    Array(8).fill(null),
    Array(8).fill(null),
    Array(8).fill(null),
    Array(8).fill(null),
    ["wP", "wP", "wP", "wP", "wP", "wP", "wP", "wP"],
    ["wR", "wN", "wB", "wQ", "wK", "wB", "wN", "wR"],
  ]);

  const [currentPlayer, setCurrentPlayer] = useState<"w" | "b">("w");
  const [draggedPiece, setDraggedPiece] = useState<CurrentPiece | null>(null);
  const [selectedPiece, setSelectedPiece] = useState<CurrentPiece | null>(null);
  const [highlightedCells, setHighlightedCells] = useState<Position[]>([]);

  const handleDragStart = (
    piece: Piece,
    position: Position,
  ) => {
    setDraggedPiece({ piece, position });
  };

  const makeMoveBySelection = (toPosition: Position) => {
    if (!selectedPiece) return;

    const newBoard = [...board.map((row) => [...row])];
    const { piece, position: fromPosition } = selectedPiece;

    const validSteps = getValidMoves(piece, fromPosition);
    if (
      validSteps.some((step) =>
        step.row === toPosition.row && step.col === toPosition.col
      )
    ) {
      newBoard[fromPosition.row][fromPosition.col] = null;
      newBoard[toPosition.row][toPosition.col] = piece;
    }
    setBoard(newBoard);
    setSelectedPiece(null);
    setHighlightedCells([]);
    setCurrentPlayer((prev) => prev === "w" ? "b" : "w")
  };

  const handleDrop = (toPosition: Position, e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    if (!draggedPiece) return;

    const newBoard = [...board.map((row) => [...row])];
    const { piece, position: fromPosition } = draggedPiece;

    const validSteps = getValidMoves(piece, fromPosition);
    if (
      validSteps.some((step) =>
        step.row === toPosition.row && step.col === toPosition.col
      )
    ) {
      newBoard[fromPosition.row][fromPosition.col] = null;
      newBoard[toPosition.row][toPosition.col] = piece;
    }
    setBoard(newBoard);
    setDraggedPiece(null);
    setHighlightedCells([]);
    setCurrentPlayer((prev) => prev === "w" ? "b" : "w")
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const validMovesByPawn = (piece: Piece, position: Position) => {
    const steps: Position[] = [];
    if (piece && piece.startsWith("w")) {
      if (position.row == 6) {
        steps.push({ row: position.row - 2, col: position.col });
        steps.push({ row: position.row - 1, col: position.col });
      } else if (!board[position.row - 1][position.col]?.startsWith("b")) {
        steps.push({ row: position.row - 1, col: position.col });
      }
      if (
        position.row - 1 >= 0 && position.col - 1 >= 0 &&
        board[position.row - 1][position.col - 1]?.startsWith("b")
      ) {
        steps.push({ row: position.row - 1, col: position.col - 1 });
      }
      if (
        position.row - 1 >= 0 && position.col + 1 < boardSize &&
        board[position.row - 1][position.col + 1]?.startsWith("b")
      ) {
        steps.push({ row: position.row - 1, col: position.col + 1 });
      }
    } else {
      if (position.row == 1) {
        steps.push({ row: position.row + 2, col: position.col });
        steps.push({ row: position.row + 1, col: position.col });
      } else if (!board[position.row + 1][position.col]?.startsWith("w")) {
        steps.push({ row: position.row + 1, col: position.col });
      }
      if (
        position.row + 1 < boardSize && position.col + 1 < boardSize &&
        board[position.row + 1][position.col + 1]?.startsWith("w")
      ) {
        steps.push({ row: position.row + 1, col: position.col + 1 });
      }
      if (
        position.row + 1 < boardSize && position.col - 1 >= 0 &&
        board[position.row + 1][position.col - 1]?.startsWith("w")
      ) {
        steps.push({ row: position.row + 1, col: position.col - 1 });
      }
    }
    return steps;
  };

  const validMovesByBishop = (piece: Piece, position: Position) => {
    const steps: Position[] = [];
    // diagonal down right
    let row = position.row;
    let col = position.col;
    // const rowEnd = board[row + 1][col + 1] === null ? boardSize : row + 1
    // const colEnd = board[row + 1][col + 1] === null ? boardSize : col + 1
    while (row < boardSize && col < boardSize) {
      row += 1;
      col += 1;
      if (row >= boardSize || col >= boardSize) break;
      if (board[row][col] === null) {
        steps.push({ row: row, col: col });
      } else if (board[row][col]?.at(0) !== piece?.at(0)) {
        steps.push({ row: row, col: col });
        break;
      } else {
        break;
      }
    }
    // diagonal down left
    row = position.row;
    col = position.col;
    while (row < boardSize && col > 0) {
      row += 1;
      col -= 1;
      if (row >= boardSize || col < 0) break;
      if (board[row][col] === null) {
        steps.push({ row: row, col: col });
      } else if (board[row][col]?.at(0) !== piece?.at(0)) {
        steps.push({ row: row, col: col });
        break;
      } else {
        break;
      }
    }
    // diagonal up right
    row = position.row;
    col = position.col;
    while (row > 0 && col < boardSize) {
      row -= 1;
      col += 1;
      if (row < 0 || col >= boardSize) break;
      if (board[row][col] === null) {
        steps.push({ row: row, col: col });
      } else if (board[row][col]?.at(0) !== piece?.at(0)) {
        steps.push({ row: row, col: col });
        break;
      } else {
        break;
      }
    }
    // diagonal up left
    row = position.row;
    col = position.col;
    while (row > 0 && col > 0) {
      row -= 1;
      col -= 1;
      if (row < 0 || col < 0) break;
      if (board[row][col] === null) {
        steps.push({ row: row, col: col });
      } else if (board[row][col]?.at(0) !== piece?.at(0)) {
        steps.push({ row: row, col: col });
        break;
      } else {
        break;
      }
    }
    return steps;
  };

  const validMovesByRook = (piece: Piece, position: Position) => {
    const steps: Position[] = [];
    // move up
    for (let row = position.row - 1; row >= 0; row--) {
      if (board[row][position.col] === null) {
        steps.push({ row: row, col: position.col });
      } else if (board[row][position.col]?.at(0) !== piece?.at(0)) {
        steps.push({ row: row, col: position.col });
        break;
      } else {
        break;
      }
    }
    // move down
    for (let row = position.row + 1; row < boardSize; row++) {
      if (board[row][position.col] === null) {
        steps.push({ row: row, col: position.col });
      } else if (board[row][position.col]?.at(0) !== piece?.at(0)) {
        steps.push({ row: row, col: position.col });
        break;
      } else {
        break;
      }
    }
    // move left
    for (let col = position.col - 1; col >= 0; col--) {
      if (board[position.row][col] === null) {
        steps.push({ row: position.row, col: col });
      } else if (board[position.row][col]?.at(0) !== piece?.at(0)) {
        steps.push({ row: position.row, col: col });
        break;
      } else {
        break;
      }
    }
    // move right
    for (let col = position.col + 1; col < boardSize; col++) {
      if (board[position.row][col] === null) {
        steps.push({ row: position.row, col: col });
      } else if (board[position.row][col]?.at(0) !== piece?.at(0)) {
        steps.push({ row: position.row, col: col });
        break;
      } else {
        break;
      }
    }
    return steps;
  };

  const validMovesByKnight = (piece: Piece, position: Position) => {
    const steps: Position[] = [];
    if (position.row - 2 >= 0 && position.col - 1 >= 0) {
      if (board[position.row - 2][position.col - 1]?.at(0) !== piece?.at(0)) {
        steps.push({ row: position.row - 2, col: position.col - 1 });
      }
    }

    if (position.row - 1 >= 0 && position.col - 2 >= 0) {
      if (board[position.row - 1][position.col - 2]?.at(0) !== piece?.at(0)) {
        steps.push({ row: position.row - 1, col: position.col - 2 });
      }
    }

    if (position.row + 1 < boardSize && position.col - 2 >= 0) {
      if (board[position.row + 1][position.col - 2]?.at(0) !== piece?.at(0)) {
        steps.push({ row: position.row + 1, col: position.col - 2 });
      }
    }

    if (position.row + 2 < boardSize && position.col - 1 >= 0) {
      if (board[position.row + 2][position.col - 1]?.at(0) !== piece?.at(0)) {
        steps.push({ row: position.row + 2, col: position.col - 1 });
      }
    }

    if (position.row + 2 < boardSize && position.col + 1 < boardSize) {
      if (board[position.row + 2][position.col + 1]?.at(0) !== piece?.at(0)) {
        steps.push({ row: position.row + 2, col: position.col + 1 });
      }
    }

    if (position.row + 1 < boardSize && position.col + 2 < boardSize) {
      if (board[position.row + 1][position.col + 2]?.at(0) !== piece?.at(0)) {
        steps.push({ row: position.row + 1, col: position.col + 2 });
      }
    }

    if (position.row - 1 >= 0 && position.col + 2 < boardSize) {
      if (board[position.row - 1][position.col + 2]?.at(0) !== piece?.at(0)) {
        steps.push({ row: position.row - 1, col: position.col + 2 });
      }
    }

    if (position.row - 2 >= 0 && position.col + 1 < boardSize) {
      if (board[position.row - 2][position.col + 1]?.at(0) !== piece?.at(0)) {
        steps.push({ row: position.row - 2, col: position.col + 1 });
      }
    }

    return steps;
  };

  const validMovesByQueen = (piece: Piece, position: Position) => {
    return [
      ...validMovesByRook(piece, position),
      ...validMovesByBishop(piece, position),
    ];
  };

  const validMovesByKing = (position: Position) => {
    const steps: Position[] = [];
    if (position.row - 1 >= 0 && position.col - 1 >= 0) {
      steps.push({ row: position.row - 1, col: position.col - 1 });
    }
    if (position.row - 1 >= 0) {
      steps.push({ row: position.row - 1, col: position.col });
    }
    if (position.row - 1 >= 0 && position.col + 1 < boardSize) {
      steps.push({ row: position.row - 1, col: position.col + 1 });
    }

    if (position.col + 1 < boardSize) {
      steps.push({ row: position.row, col: position.col + 1 });
    }
    if (position.row + 1 < boardSize && position.col + 1 < boardSize) {
      steps.push({ row: position.row + 1, col: position.col + 1 });
    }
    if (position.row + 1 < boardSize) {
      steps.push({ row: position.row + 1, col: position.col });
    }

    if (position.col + 1 < boardSize && position.col - 1 >= 0) {
      steps.push({ row: position.row + 1, col: position.col - 1 });
    }
    if (position.row + 1 < boardSize && position.col - 1 >= 0) {
      steps.push({ row: position.row + 1, col: position.col - 1 });
    }
    if (position.col - 1 >= 0) {
      steps.push({ row: position.row, col: position.col - 1 });
    }

    return steps;
  };

  const getValidMoves = (piece: Piece, position: Position) => {
    const steps = [];
    switch (piece && piece.replace("b", "").replace("w", "")) {
      case "P":
        steps.push(...validMovesByPawn(piece, position));
        break;
      case "R":
        steps.push(...validMovesByRook(piece, position));
        break;
      case "N":
        steps.push(...validMovesByKnight(piece, position));
        break;
      case "Q":
        steps.push(...validMovesByQueen(piece, position));
        break;
      case "K":
        steps.push(...validMovesByKing(position));
        break;
      case "B":
        steps.push(...validMovesByBishop(piece, position));
        break;
    }
    return steps;
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center gap-y-2">
      <Card>
        <CardHeader className="-space-y-1">
          <h1 className="text-xl font-extrabold">Player - 2</h1>
          <h1 className="text-lg">Score: {26}</h1>
        </CardHeader>
      </Card>
      <div className="inline-block border-4 border-white rounded-lg shadow-xl">
        {board.map((row, rowIdx) => (
          <div key={`row-${rowIdx}`} className="flex">
            {row.map((piece, colIdx) => {
              const isWhiteSquare = (rowIdx + colIdx) % 2 === 0;
              const isHighlighted = highlightedCells.some((cells) =>
                cells.row === rowIdx && cells.col === colIdx
              );
              const position = { row: rowIdx, col: colIdx };
              return (
                <div
                  key={`square-${rowIdx}-${colIdx}`}
                  className={`relative w-16 h-16 flex items-center justify-center
                    ${
                    isWhiteSquare ? "transition-colors bg-white" : "bg-gray-400"
                  }
                    ${piece ? "hover:bg-yellow-100/95 duration-300" : ""}`}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(position, e)}
                  onClick={() => {
                    if (isHighlighted) {
                      makeMoveBySelection(position);
                      return;
                    }
                  }}
                >
                  {piece && (
                    <button
                      className="flex items-center justify-center"
                      draggable
                      onDragStart={() => {
                        setHighlightedCells(getValidMoves(piece, position));
                        handleDragStart(piece, position);
                      }}
                      onClick={() => {
                        setSelectedPiece({
                          piece: piece,
                          position: position,
                        });
                        setHighlightedCells(getValidMoves(piece, position));
                      }}
                      disabled={currentPlayer !== piece.at(0)}
                    >
                      <Image
                        src={`/files/chess-pieces/${piece}.svg`}
                        alt={piece}
                        width={"100"}
                        height={"100"}
                      />
                    </button>
                  )}
                  {isHighlighted
                    ? (
                      <div
                        className={`absolute h-6 w-6 rounded-full blur-lg bg-red-600`}
                      >
                      </div>
                    )
                    : null}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Page;
