import { Link } from 'react-router-dom';

export default function Anchor({children, className, href, target}) {
  const classes = `animate-line font-bold relative dark:text-cyan-300 ${className || ''}`

  return <Link className={ classes } to={href} target={target}>
    {children}
  </Link>
}