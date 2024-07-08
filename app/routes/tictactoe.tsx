import { set } from 'cypress/types/lodash';
import type React from 'react';
import { useState } from 'react';
import { Button } from '~/components/button';

function Square({ value, onSquareClick }: { value: string, onSquareClick: () => void }) {
    return (
        <Button onClick={onSquareClick} className='w-12 h-12 p4 m-1 text-2xl'>{value}</Button>
    );
}

type BoardProps = {
    xIsNext: boolean;
    squares: Array<string>;
    onPlay: (nextSquares: Array<string>) => void;
    setXIsNext: React.Dispatch<React.SetStateAction<boolean>>;
};

function Board({ xIsNext, squares, onPlay, setXIsNext }: BoardProps) {
    function handleClick(i: number) {
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        const nextSquares = squares.slice();
        if (xIsNext) {
            nextSquares[i] = 'X';
            setXIsNext(false); 
        } else {
            nextSquares[i] = 'O';
            setXIsNext(true);
        }
        onPlay(nextSquares);
    }

    const winner = calculateWinner(squares);
    let status: string;
    if (winner) {
        status = `Winner: ${winner}`;
    } else {
        status = `Player ${xIsNext ? 'X' : 'O'} Turn`;
    }

    return (
        <>
            <div className="status mb-4 text-3xl">{status}</div>
            <div className='flex-col mb-8'>
                <div className="board-row flex">
                    <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
                    <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
                    <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
                </div>
                <div className="board-row flex">
                    <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
                    <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
                    <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
                </div>
                <div className="board-row flex">
                    <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
                    <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
                    <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
                </div>
            </div>
        </>
    );
}

export default function Game() {
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    // const xIsNext = currentMove % 2 === 0;
    const [xIsNext, setXIsNext] = useState(true);
    const currentSquares = history[currentMove];

    function handlePlay(nextSquares: Array<string>) {
        console.log('nextSquares', nextSquares);
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
    }

    function jumpTo(nextMove: number, action: string) {
        if ( 'restart' === action ) {
            setHistory([Array(9).fill(null)]);
            setCurrentMove(0);
            return;
        }
        setCurrentMove(nextMove);
    }

    const moves = history.map((squares, move) => {
        let description: string;
        const xx = move;
        let action: string;
        if (move > 0) {
            description = `Go to move #${move}`;
            action = 'no';
        } else {
            description = 'Go to game start';
            action = 'restart';
        }
        return (
            <li key={`move-${xx}`} className='mb-2'>
                <Button onClick={() => jumpTo(move, action)}>{description}</Button>
            </li>
        );
    });

    return (
        <div className="game w-1/3 bg-slate-500 py-8 text-white mx-auto flex flex-col items-center rounded-lg">
            <div>
                <h1 className="text-5xl">Tic Tac Toe</h1>
                <p className='text-sm my-2'>[Converted from JS to TypeScript]</p>
            </div>
            <div className="game-board">
                <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} setXIsNext={setXIsNext} />
            </div>
            <div className="game-info">
                <ol>{moves}</ol>
            </div>
        </div>
    );
}

function calculateWinner(squares: Array<string>) {
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