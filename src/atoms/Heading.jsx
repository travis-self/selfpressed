export default function Heading(props) { 
  const { as: Tag = 'h1', children } = props
  const styles = {
    h1: 'text-8xl text-shadow text-transparent'
  }

  return <Tag className={`font-display ${styles[Tag]} text-`}>{children}</Tag>
}