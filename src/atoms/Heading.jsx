export default function Heading(props) { 
  const { as: Tag = 'h1', children } = props
  const styles = {
    h1: 'text-clamp text-shadow text-transparent tracking-wide'
  }

  return <Tag className={`font-display ${styles[Tag]} text-`}>{children}</Tag>
}