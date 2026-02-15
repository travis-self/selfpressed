import { forwardRef, useImperativeHandle, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiceOne, faDiceTwo, faDiceThree, faDiceFour, faDiceFive, faDiceSix } from "@fortawesome/free-solid-svg-icons";
import { motion } from "motion/react"

const sides = [faDiceOne, faDiceTwo, faDiceThree, faDiceFour, faDiceFive, faDiceSix];
function randomSide() {
  return sides[Math.floor(Math.random() * 6)];
}

const D6 = forwardRef(({ className = '', selfHover = true, size = 'text-4xl' }, ref) => {
  const [d6, setD6] = useState(() => randomSide())
  const [rotation, setRotation] = useState(0)
  const classes = `text-inherit ${size} ${className || ''}`
  
  function roll() {
    setD6(randomSide());
    setRotation((prev) => prev + 360);
  }

  useImperativeHandle(ref, () => ({ roll }));

  return (
    <motion.span
      onHoverStart={selfHover ? roll : undefined}
      animate={{ rotate: rotation }}
      className={classes}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      style={{ display: "inline-block", lineHeight: 0 }}
    >
      <FontAwesomeIcon icon={d6} style={{ display: "block" }} />
    </motion.span>
  );
});

export default D6;