export default function Anchor({children, href, target}) {
  return <a className="animate-line font-bold relative dark:text-cyan-300" href={href} target={target}>
    {children}
  </a>
}