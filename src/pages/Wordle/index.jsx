import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie';
import { motion } from 'motion/react'

import { createAlphabet, createGuesses, evaluateLetters, getCookieExpiration, getNewGuess } from './WordleHelpers'
import { answers, wordnik } from './words'
import WordleAlphabet from './WordleAlphabet';
import WordleGuess from './WordleGuess';
import Dialog from '../../molecules/Dialog';

function Wordle() {
  const [guesses, setGuesses] = useState(() => createGuesses());
  const [attempt, setAttempt] = useState(0);
  const [answer, setAnswer] = useState('')
  const [alphabet, setAlphabet] = useState(() => createAlphabet())
  const [cookies, setCookie] = useCookies(['answer'])
  const [modalOpen, setModalOpen] = useState(false)
  const [modalContent, setModalContent] = useState(0)

  useEffect(() => {
    if (cookies.answer) {
      setAnswer(cookies.answer)
    } else {
      const randomWord = answers[Math.floor(Math.random() * answers.length)]
      setCookie('answer', randomWord, { expires: getCookieExpiration() })
      setAnswer(randomWord);
    }
  }, [answer, cookies.answer, setCookie])
  
  const handleGuess = function (attempt, guess) {
    let shaped = {
      correct: guess === answer,
      letters: evaluateLetters(guess, answer),
      word: guess
    };

    updateAlphabet(shaped.letters)
    return guesses.with(attempt, {...getNewGuess(), ...shaped});
  }

  function updateAlphabet(letters) {
    let guessed = {}

    letters.map(l => {
      guessed[l.letter] = l.color
    })

    setAlphabet({...alphabet, ...guessed});
  }

  function handleCloseModal() {
    setModalOpen(false)
  }

  function handleSubmit(formData) {
    const guess = formData.get("guess");

    if (wordnik.includes(guess) || answers.includes(guess)) { // valid word
      setGuesses(handleGuess(attempt, guess))
      setAttempt(prevAttempt => prevAttempt + 1)

      if (guess === answer) {
        setModalOpen(true)
        setModalContent(attempt + 1)
      } else if ((attempt + 1) === 5) {
        setModalOpen(true)
        setModalContent(6)
      }
    } else {
      setModalOpen(true)
      setModalContent(0)
    }

  }

  return <div className="mx-auto transform -translate-y-10 w-1/2">
    <div className="gap-y-2 grid grid-cols-1">
      {guesses.map((word, i) => (
        <WordleGuess attempt={attempt} guess={word} iteration={i + 1} key={i}  />
      ))}
    </div>
    <form className="mt-10" action={handleSubmit}>
      <input
        autoComplete="off"
        autoFocus
        className="bg-transparent block border-2 border-x-0 border-t-0 text-xl uppercase w-full dark:text-white"
        maxLength={5}
        name="guess"
        type="text"
      />
      <div className="flex gap-2 mt-2">
        <button className="button-primary grow w-1/2" type="submit">Enter</button>
        <button className="button-secondary" type="button" onClick={() => {
          setGuesses(() => createGuesses())
          setAlphabet(() => createAlphabet())
          setAttempt(0)
        }}>Reset</button>
      </div>
    </form>
    <WordleAlphabet letters={alphabet} />
    <Dialog answer={answer} onCloseModal={handleCloseModal} contentKey={modalContent} isOpen={modalOpen} />
  </div>;
}

export default Wordle