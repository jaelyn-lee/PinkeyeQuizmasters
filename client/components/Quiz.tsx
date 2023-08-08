import React, { useEffect, useState, useRef } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks'
import { fetchQuestions } from '../slices/questionsSlice'
import GameOver from './GameOver'
import correctSound from '/music/correct.mp3'
import gameOverSound from '/music/gameOver.mp3'
import backgroundSound from '/music/themeMusic.mp3'

function Quiz() {
  const dispatch = useAppDispatch()
  const questions = useAppSelector((state) => state.questions)
  const randomNum = Math.floor(Math.random() * 20) + 1
  const [currentQuestionId, setCurrentQuestionId] = useState(randomNum)
  const [isRight, setIsRight] = useState('right')

  const audioRef = useRef<HTMLAudioElement | null>(null)
  const backgroundAudioRef = useRef<HTMLAudioElement | null>(null)

  const [sound, setSound] = useState('')
  const [playSound, setPlaySound] = useState(false)
  // const [backgroundSound, setBackgroundSound] = useState(true)

  useEffect(() => {
    dispatch(fetchQuestions())
  }, [])

  const currentQuestion = questions.find(
    (question) => question.id === currentQuestionId,
  )

  function handleAnswer(answer: string) {
    stopSound()
    if (answer === currentQuestion?.answer) {
      if (currentQuestionId === 20) {
        setCurrentQuestionId(1)
      } else {
        setIsRight('right')
        setCurrentQuestionId(currentQuestionId + 1)
        setSound(correctSound)
      }
    } else {
      setIsRight('wrong')
      setSound(gameOverSound)
      // setBackgroundSound(false)
    }
    setPlaySound(true)
  }

  function stopSound() {
    setPlaySound(false)
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }
  }
  if (!currentQuestion) {
    return null
  }

  return (
    <>
      {isRight === 'right' ? (
        <>
          <div className="quiz-section">
            <div className="question">
              <p>{currentQuestion.question}</p>
            </div>
          </div>

          <div className="buttons">
            <button className="left" onClick={() => handleAnswer('true')}>
              True
            </button>
            <button className="right" onClick={() => handleAnswer('false')}>
              False
            </button>
            <audio ref={backgroundAudioRef} autoPlay loop>
              <source src={backgroundSound} type="audio/mpeg" />
            </audio>
          </div>
        </>
      ) : (
        <GameOver />
      )}
      {playSound && (
        // eslint-disable-next-line jsx-a11y/media-has-caption
        <audio ref={audioRef} autoPlay onEnded={stopSound}>
          <source src={sound} type="audio/mpeg" />
        </audio>
      )}
    </>
  )
}

export default Quiz
