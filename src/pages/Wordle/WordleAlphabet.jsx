import { motion } from "motion/react";

export default function WordleAlphabet({letters}) {
  const rows = ['qwertyuiop','asdfghjkl','zxcvbnm'];

  return <div className="flex flex-col gap-y-2 mt-10">
    {rows.map((row, i) => 
      <motion.div className="flex gap-2 justify-center" key={i}
        initial={{opacity: 0, transform: "translateY(10px"}}
        animate={{opacity: 1, transform: "translateY(0)"}}
        transition={{
          delay: ( ( i > 0 ) ? ( ( i * 0.5 ) + 1.5 ) : 1.5),
          duration: 1,
        }}
      >
        {row.split("").map((l, ii) => 
          <div className={`aspect-square p-4 rounded-sm ${letters[l]} uppercase`} key={ii}>{l}</div>
        )}
      </motion.div>
    )}
  </div>
}