export function createGuesses() {
  let ret = [];
  for(let $i=1;$i<=5;$i++) {
    ret.push(getNewGuess())
  }

  return ret;
}

export function getNewGuess() {
  return {
    correct: false,
    letters: [],
    partial: [],
    right: [],
    word: ""
  }
}

export function evaluateLetters(guess, answer) {
  const control = getEvaluation(answer)
  const test = getEvaluation(guess)

  let tally = {}
  let ret = [];
  
  test.letters.forEach((l,i) => {
    let color = "bg-gray-800 text-gray-500";
    tally[l] = (tally[l] || 0) + 1;

    if (control.letters[i] === l) {
      color = "bg-green-400"
    } else if (control.letters.includes(l)) {
      if (tally[l] <= control.count[l]) {
        color = "bg-yellow-300"
      }
    }

    ret.push({letter: l, color: color})
  })

  return ret;
}

function getEvaluation(word) {
  let evaluation = {
    letters: word.toLowerCase().split(""),
  }
  
  evaluation.count = evaluation.letters.reduce((acc, curr) => {
    acc[curr] = (acc[curr] || 0) + 1;
    return acc;
  }, {})
  
  return evaluation;
}

export function createAlphabet() {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  const ret = {}

  alphabet.split('').forEach(l => {
    ret[l] = 'bg-gray-600 text-white';
  })

  return ret;
}

export function getCookieExpiration() {
  const date = new Date();
  date.setHours(23, 59, 59, 999);
  return date;
}

export function getDialogContent(key = 0, answer) {
  const content = {
    0: "Word not found! Try again.",
    1: "Wow! You're a genius! Or you know how to check your browser cookies.",
    2: "Only 2 guesses? That is very impressive. You must read a lot of books!",
    3: "Very respectable. Better than most! Next time you'll get it in 2, I just know it.",
    4: "Slow and steady wins the race!",
    5: "Wow, that was a close one! I thought you were a goner!",
    6: `Sorry! The answer is "${answer.toUpperCase()}". Better luck next time!`
  }

  return content[key];
}