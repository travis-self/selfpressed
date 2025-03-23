import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie';
import { motion } from 'motion/react'

import { createAlphabet, createGuesses, evaluateLetters, getCookieExpiration, getNewGuess } from './WordleHelpers'
import words from './words.json'
import WordleAlphabet from './WordleAlphabet';
import WordleGuess from './WordleGuess';

function Wordle() {
  const [guesses, setGuesses] = useState(() => createGuesses());
  const [attempt, setAttempt] = useState(0);
  const [answer, setAnswer] = useState('')
  const [alphabet, setAlphabet] = useState(() => createAlphabet())
  const [cookies, setCookie] = useCookies(['answer'])

  useEffect(() => {
    if (cookies.answer) {
      setAnswer(cookies.answer)
    } else {
      const randomWord = words[Math.floor(Math.random() * words.length)]
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

  function handleSubmit(formData) {
    if (words.includes(formData.get("guess"))) {
      setGuesses(handleGuess(attempt, formData.get("guess")))
      setAttempt(attempt + 1)
    } else {
      alert("Not in word list");
    }
  }

  return <div className="mx-auto w-1/2">
    <div className="gap-y-2 grid grid-cols-1">
      {guesses.map((word, i) => (
        <WordleGuess attempt={attempt} guess={word} iteration={i + 1} key={i}  />
      ))}
    </div>
    <form className="mt-10" action={handleSubmit}>
      <input
        autoFocus
        className="bg-transparent block border-2 border-x-0 border-t-0 text-xl uppercase w-full"
        maxLength={5}
        name="guess"
        // onChange={ev => console.log(ev)}
        type="text"
      />
      <div className="flex gap-2 mt-2">
        <button className="grow w-1/2" type="submit">Enter</button>
        <button type="button" onClick={() => {
          setGuesses(() => createGuesses())
          setAlphabet(() => createAlphabet())
          setAttempt(0)
        }}>Reset</button>
      </div>
    </form>
    <WordleAlphabet letters={alphabet} />
  </div>;
}

export default Wordle