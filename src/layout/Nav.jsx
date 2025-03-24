import { useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGamepad, faHome, faMoon, faPersonChalkboard } from "@fortawesome/free-solid-svg-icons";

import { motion } from "motion/react"
import { Link } from "react-router-dom";

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
  const links = [
    {
      icon: faHome,
      path: "/",
      text: "Home",
    },
    {
      icon: faGamepad,
      path: "/playground",
      text: "Playground",
    },
    {
      icon: faPersonChalkboard,
      path: "/slides",
      text: "Slides",
    }
  ];

  return (
    <nav className="flex items-center not-only:justify-between p-2">
      <ul className="flex gap-5">
        {links.map(link => 
          <li>
            <Link className="animate-line flex gap-2 group items-center relative" to={link.path}>
              <FontAwesomeIcon className="group-hover:text-cyan-500" icon={link.icon} />
              {link.text}
            </Link>
          </li>
        )}
      </ul>
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