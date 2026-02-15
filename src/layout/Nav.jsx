import { useEffect, useRef, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faDoorClosed, faDoorOpen } from "@fortawesome/free-solid-svg-icons";

import { motion } from "motion/react"
import { Link } from "react-router-dom";
import D6 from "../pages/FlavorText/D6";

export default function Nav() {
  const [darkmode, setDarkmode] = useState(() => {
    const preference = localStorage.getItem('darkmode');
    return preference ? JSON.parse(preference) : false;
  })
  
  useEffect(() => {
    localStorage.setItem('darkmode', darkmode)

    if (darkmode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkmode])
  const togglePosition = darkmode ? 'justify-end' : 'justify-start';
  const d6Ref = useRef(null)
  const links = [
    {
      icon: faDoorClosed,
      iconHover: faDoorOpen,
      path: "/",
      text: "Home",
    },
  ];

  const enableNav = true

  return (
    <nav className="flex items-center not-only:justify-between px-5 py-2">
      {enableNav && (
        <ul className="flex gap-5">
          {links.map((link, i) => 
            <li key={i}>
              <Link className="flex gap-2 group items-center relative dark:text-white" to={link.path}>
                <span className="block group-hover:hidden"><FontAwesomeIcon className="text-2xl group-hover:text-cyan-600 dark:group-hover:text-cyan-300" icon={link.icon} /></span>
                <span className="hidden group-hover:block"><FontAwesomeIcon className="text-2xl group-hover:text-cyan-600 dark:group-hover:text-cyan-300" icon={link.iconHover} /></span>
                <span className="relative">
                  <span className="animate-line animate-line-group">{link.text}</span>
                </span>
              </Link>
            </li>
          )}
          <li>
            <Link className="flex gap-2 group items-center relative dark:text-white" to={'/flavor-text'} onMouseEnter={() => d6Ref.current?.roll()}>
                <D6 className="group-hover:text-cyan-600 dark:group-hover:text-cyan-300" size="text-2xl" ref={d6Ref} selfHover={false} />
                <span className="relative">
                  <span className="animate-line animate-line-group">Flavor Text</span>
                </span>
              </Link>
          </li>
        </ul>
      )}
      {/* TODO: Move toggle into a separate component once Nav is built out. */}
      <div className="ml-auto relative w-16">
        <label id="toggle-dark-mode" className={`bg-linear-to-r from-gray-300 to-white border-2 border-gray-400 flex ${togglePosition} p-1 relative rounded-3xl w-full dark:from-slate-800 dark:to-slate-900 dark:border-cyan-300`}>
          <motion.div className="bg-gray-400 flex items-center justify-center rounded-full size-6 dark:bg-cyan-400"
            layout
            transition={{
              type: "spring",
              visualDuration: 0.2,
              bounce: 0.2,
            }}
          >
            <FontAwesomeIcon className="text-lg text-gray-100 dark:text-slate-900" icon={faMoon} />
          </motion.div>
        </label>
        <input aria-labelledby="toggle-dark-mode"
          className="absolute inset-0 opacity-0 z-10"
          defaultChecked={darkmode}
          name="darkmode"
          onChange={e => setDarkmode(e.target.checked)}
          type="checkbox"
        />
      </div>
    </nav>
  )
}