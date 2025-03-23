import Heading from "../atoms/Heading"
import Anchor from "../atoms/Anchor"

export default function Home() {
  return (
    <>
      <Heading as="h1">Self Pressed.</Heading>
      <p className="mt-10 text-clamp-sm">
        I’m <Anchor href="http://linkedin.com/in/selfpressed" target="_blank">Travis Self</Anchor>, a web developer and podcaster from Dallas. I build websites and lead a small team of Front End Engineers at <Anchor href="http://lifeblue.com/" target="_blank">Lifeblue</Anchor>, where we enable companies to grow their social, cultural and economic impact in the world.
      </p>
      <p className="text-clamp-sm">
        You can hear me chat about music on <Anchor href="https://cms.megaphone.fm/channel/nofiller" target="_blank">No Filler</Anchor>, and interview web devs and tech professionals on <Anchor href="https://soundcloud.com/600px" target="_blank">600px</Anchor>.
      </p>
    </>
  )
}