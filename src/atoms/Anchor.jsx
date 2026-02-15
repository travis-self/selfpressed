import { Link } from 'react-router-dom';

export default function Anchor({animate = true, children, className, href, target}) {
let classes = `font-bold relative dark:text-cyan-300 ${className || ''}`
  if (animate) {
    classes += ' animate-line'
  } else {
    classes += ' hover:text-indigo-500'
  }

  return <Link className={ classes } to={href} target={target}>
    {children}
  </Link>
}