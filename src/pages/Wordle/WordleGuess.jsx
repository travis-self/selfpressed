import { useEffect, useState } from "react";
import { motion } from "motion/react";

export default function WordleGuess({attempt, guess, iteration}) {
  const [opacity, setOpacity] = useState("full")

  useEffect(() => {
    if (attempt > 0 && attempt != iteration) {
      setOpacity('faded');
    } else {
      setOpacity('full');
    }
  }, [attempt, iteration])
  

  return (
    <motion.div className="gap-x-2 grid grid-cols-5 uppercase"
      initial={{opacity: 0.25}}
      animate={{opacity: 1}}
      transition={{
        delay: (iteration > 1) ? ( ( iteration - 1 ) * 0.25 ) : 0,
        duration: 1,
      }}
    >
      {guess.letters.length > 0 ? (
        guess.letters.map((l, i) => (
          <motion.div className={`aspect-square ${l.color} flex justify-center items-center text-3xl`} key={i}
            animate={{y: [0, -15, 0] }}
            transition={{
              delay: (i > 1) ? ( ( i - 1 ) * 0.15 ) : 0,
              duration: .5
            }}
          >
            {l.letter}
          </motion.div>
        ))
      ) : (
        <>
          {[1,2,3,4,5].map((i) => (
            <motion.div className="aspect-square bg-gray-600 flex justify-center items-center text-3xl" key={i} data-attempt={attempt}
              animate={opacity}
              onAnimationComplete={() => setOpacity('full')}
              transition={{
                duration: 1,
                repeat: 1,
                repeatType: "reverse"
              }}
              variants={{
                faded: { opacity: 0.25 },
                full: { opacity: 1 }
              }}
            />
          ))}
        </>
      )}
    </motion.div>
  )
}