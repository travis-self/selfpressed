import Heading from '../atoms/Heading';
import Anchor from '../atoms/Anchor';

export default function Home() {
  return (
    <>
      <Heading as='h1' className="logo">Selfpressed.</Heading>
      <section class='grid gap-y-5'>
        <p className='text-clamp-sm'>
          I’m{' '}
          <Anchor href='http://linkedin.com/in/selfpressed' target='_blank'>
            Travis Self
          </Anchor>
          , a UX Engineer, podcaster, and game designer from Dallas.
        </p>
        <p className='text-clamp-sm'>
          You can hear me chat about music on{' '}
          <Anchor
            href='https://cms.megaphone.fm/channel/nofiller'
            target='_blank'
          >
            No Filler
          </Anchor>
          , and read my game design blog <Anchor href="/flavor-text">here</Anchor>
          .
        </p>
      </section>
    </>
  );
}
