import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from './Footer';
import Nav from './Nav';
import { faMoon } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { motion } from 'motion/react';

export default function Layout() {
  const location = useLocation();
  const [darkmode, setDarkmode] = useState(() => {
    const preference = localStorage.getItem('darkmode');
    return preference ? JSON.parse(preference) : false;
  });

  useEffect(() => {
    localStorage.setItem('darkmode', darkmode);
    window.scrollTo(0, 0);

    if (darkmode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkmode, location.pathname]);
  const togglePosition = darkmode ? 'justify-end' : 'justify-start';

  return (
    <>
      <Nav />
      <main className={`pt-20 px-10 relative dark:text-white wrapper`}>
        <Outlet />
      </main>
      <Footer />
      {/* TODO: Move toggle into a separate component once Nav is built out. */}
      <div className='absolute bottom-5 right-5 w-16'>
        <label
          id='toggle-dark-mode'
          className={`bg-linear-to-r from-gray-300 to-white border-2 border-gray-400 flex ${togglePosition} p-1 relative rounded-3xl w-full dark:from-slate-800 dark:to-slate-900 dark:border-cyan-300`}
        >
          <motion.div
            className='bg-gray-400 flex items-center justify-center rounded-full size-6 dark:bg-cyan-400'
            layout
            transition={{
              type: 'spring',
              visualDuration: 0.2,
              bounce: 0.2,
            }}
          >
            <FontAwesomeIcon
              className='text-lg text-gray-100 dark:text-slate-900'
              icon={faMoon}
            />
          </motion.div>
        </label>
        <input
          aria-labelledby='toggle-dark-mode'
          className='absolute inset-0 opacity-0 z-10'
          defaultChecked={darkmode}
          name='darkmode'
          onChange={e => setDarkmode(e.target.checked)}
          type='checkbox'
        />
      </div>
    </>
  );
}
