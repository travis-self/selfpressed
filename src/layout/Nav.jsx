import { useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDoorClosed, faDoorOpen } from '@fortawesome/free-solid-svg-icons';

import D6 from '../pages/FlavorText/atoms/D6';

export default function Nav() {
  const d6Ref = useRef(null);
  const links = [
    {
      icon: faDoorClosed,
      iconHover: faDoorOpen,
      path: '/',
      text: 'Home',
    },
  ];

  const location = useLocation();

  return (
    <nav className='flex items-center not-only:justify-between p-5'>
      {location.pathname != '/' && (
        <Link to='/' className='font-display text-slate-700 text-3xl'>
          Selfpressed
        </Link>
      )}
      <ul className='flex gap-5 only:ml-auto'>
        {links.map((link, i) => (
          <li key={i}>
            <Link
              className='flex gap-2 group items-center relative dark:text-white'
              to={link.path}
            >
              <span className='block group-hover:hidden'>
                <FontAwesomeIcon
                  className='text-2xl text-indigo-400 group-hover:text-cyan-600 dark:group-hover:text-cyan-300'
                  icon={link.icon}
                />
              </span>
              <span className='hidden group-hover:block'>
                <FontAwesomeIcon
                  className='text-2xl text-indigo-400 group-hover:text-cyan-600 dark:group-hover:text-cyan-300'
                  icon={link.iconHover}
                />
              </span>
              <span className='relative'>
                <span className='animate-line animate-line-group font-bold'>
                  {link.text}
                </span>
              </span>
            </Link>
          </li>
        ))}
        <li>
          <Link
            className='flex gap-2 group items-center relative dark:text-white'
            to={'/flavor-text'}
            onMouseEnter={() => d6Ref.current?.roll()}
          >
            <span className='text-indigo-400'>
              <D6
                className='group-hover:text-cyan-600 dark:group-hover:text-cyan-300'
                size='text-2xl'
                ref={d6Ref}
                selfHover={false}
              />
            </span>
            <span className='relative'>
              <span className='animate-line animate-line-group font-bold'>
                Flavor Text
              </span>
            </span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
