import React, { useEffect, useState } from 'react'
import ScoreBoard from './components/ScoreBoard';
import GameBoard from './components/GameBoard';

import { checkWinner } from './utils/winner';
import { getAIMoveFromOpenRouter } from './utils/aiOpenRouter';

const App = () => {


  // State for the 3X3 board (9 cells)

  const [board, setBoard] = useState(Array(9).fill(null));

  // Is it the player trun?
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);

  // Who won? ("X", "O" or "Draw")
  const [winner, setWinner] = useState(null);

  // Score tracking
  const [score,setScore] = useState({X:0, O:0});

  // When a player click a square

  const handleClick = (i) => {
    
    if(!isPlayerTurn || board[i] || winner) return;

    const newBoard = [...board];

    newBoard[i] = "X";

    setBoard(newBoard);

    setIsPlayerTurn(false);
    
  }

  useEffect(() => {

    if(winner) return // prevent double scoring

    // check if someone has won

    const result = checkWinner(board);
    
    if(result?.winner){
      setWinner(result.winner);
      if(result?.winner === "X" || result.winner === "O"){
      
        setScore((prev) => ({
          ...prev,
          [result.winner]:prev[result.winner] + 1
        }))
  
        return;
      }
  
    }

    // If it's AI's trun and game not over
    if(!isPlayerTurn && !winner){
      const aiTrun = async () => {
        const move = await getAIMoveFromOpenRouter(board);

        if(move !== null && board[move] === null){

          const newBoard = [...board];
          newBoard[move] = "O";
          setBoard(newBoard);
          setIsPlayerTurn(true);
        }
        
      }

      const timeout = setTimeout(aiTrun, 600);
      return () => clearTimeout(timeout);
    }
      
  },[board,isPlayerTurn, winner])
  

  // Restart the game

  const restartGame = () => {

    setBoard(Array(9).fill(null));
    setIsPlayerTurn(true);
    setWinner(null);
    setScore({X:0, O:0})

  }



  return (
    <div className='min-h-screen bg-[#0F172A] text-white flex flex-col items-center justify-center'>
        <h1 className="text-3xl font-bold mb-4">Tic Tac TAI 🤖</h1>
        
        <ScoreBoard score={score}/>

        <GameBoard board={board} handleClick={handleClick}/>

        {winner && (
          <div className='mt-4 text-xl'>
            {winner === "Draw" ? "it's a draw" : `${winner} wins!`}
            <button onClick={restartGame}
            className="ml-4 px-4 py-2 bg-[#38BDF8] text-black rounded hover:bg-[#0EA5E9]">
              Play Again
            </button>
          </div>
        )}
        
    </div>
  )
}

export default App