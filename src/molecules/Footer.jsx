import Anchor from "../atoms/Anchor";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin, faSpotify } from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  const year = new Date().getFullYear();
  return <footer className="flex flex-col gap-y-2 justify-center mt-20 wrapper">
    <div className="flex gap-2 justify-center">
      <Anchor aria-label="Visit my GitHub profile." href="https://github.com/travis-self" target="_blank">
        <FontAwesomeIcon className="text-xl" icon={faGithub} />
      </Anchor>
      <Anchor aria-label="Visit my LinkedIn profile." href="https://linked.com/selfpressed" target="_blank">
        <FontAwesomeIcon className="text-xl" icon={faLinkedin} />
      </Anchor>
      <Anchor aria-label="Listen to my podcast on Spotify." href="https://open.spotify.com/show/3ziSGjCcMXeXyXe9GLfWHp?si=10a63e32bc314b4c" target="_blank">
        <FontAwesomeIcon className="text-xl" icon={faSpotify} />
      </Anchor>
    </div>
    <p className="text-gray-500 text-center text-sm">
      &copy; {year} - Travis Self.
    </p>
  </footer>
}