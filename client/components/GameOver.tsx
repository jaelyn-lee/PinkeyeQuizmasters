import { useState } from 'react'
import Quiz from './Quiz'

function GameOver() {
  const [isClicked, setIsClicked] = useState(false)
  const playAgain = () => {
    setIsClicked(true)
  }
  return (
    <>
      {isClicked ? (
        <Quiz />
      ) : (
        <div>
          <div className="game-over-section">
            <img
              className="game-over"
              src="/images/gameOver.gif"
              alt="Game Over"
            />
            <button className="play-again" onClick={playAgain}>
              Play Again
            </button>
          </div>
          <div className="buttons">
            <button className="left">True</button>
            <button className="right">False</button>
          </div>
        </div>
      )}
    </>
  )
}

export default GameOver
