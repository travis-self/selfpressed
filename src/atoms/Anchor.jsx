export default function Anchor({children, href, target}) {
  return <a className="animate-line font-bold relative" href={href} target={target}>
    {children}
  </a>
}