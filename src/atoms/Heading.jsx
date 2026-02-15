export default function Heading(props) { 
  const { as: Tag = 'h1', children, className } = props
  const styles = {
    logo: 'font-display text-clamp text-shadow text-transparent',
    h1: 'font-display text-6xl tracking-wider',
    h2: 'text-xl'
  }

  return <Tag className={`${styles[className] ? styles[className] : styles[Tag]} text-`}>{children}</Tag>
}