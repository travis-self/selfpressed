import { useEffect, useRef, useState } from 'react';
import imageUrlBuilder from '@sanity/image-url';
import { client } from '../../../sanity/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';

const builder = imageUrlBuilder(client);
const GAP = 28; // gap-7
const THRESHOLD = 50;

export default function Gallery({ value }) {
  const trackRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const dragOffset = useRef(0);

  const [index, setIndex] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const images = value?.images ?? [];
  const total = images.length;

  useEffect(() => {
    if (!trackRef.current) return undefined;
    const observer = new ResizeObserver(([entry]) => {
      setContainerWidth(entry.contentRect.width);
    });
    observer.observe(trackRef.current);
    return () => {
      observer.disconnect();
    };
  }, []);

  const baseTranslate = i => -(i * (containerWidth + GAP));

  const onPointerDown = e => {
    isDragging.current = true;
    startX.current = e.clientX;
    dragOffset.current = 0;
    trackRef.current.style.transition = 'none';
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = e => {
    if (!isDragging.current) return;
    const offset = e.clientX - startX.current;
    dragOffset.current = offset;
    trackRef.current.style.transform = `translateX(${baseTranslate(index) + offset}px)`;
  };

  const onPointerUp = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    trackRef.current.style.transition = 'transform 0.4s ease';

    const offset = dragOffset.current;
    if (offset < -THRESHOLD && index < total - 1) {
      setIndex(i => i + 1);
    } else if (offset > THRESHOLD && index > 0) {
      setIndex(i => i - 1);
    } else {
      trackRef.current.style.transform = `translateX(${baseTranslate(index)}px)`;
    }
  };

  return (
    <div className='my-5'>
      <div
        className='cursor-grab active:cursor-grabbing touch-none select-none'
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <ul
          ref={trackRef}
          className='flex flex-nowrap gap-7 w-11/12 md:w-full'
          style={{
            transform: `translateX(${baseTranslate(index)}px)`,
            transition: 'transform 0.4s ease',
          }}
        >
          {images.map((img, i) => (
            <li key={img._key ?? i} className='grow shrink-0 w-full'>
              <figure>
                <img
                  alt={img.alt ?? ''}
                  className='aspect-[3/2] object-cover rounded-lg'
                  draggable='false'
                  src={builder.image(img).width(800).url()}
                />
                {img.caption && (
                  <figcaption className='mt-2 text-sm text-gray-500 dark:text-gray-300'>
                    {img.caption}
                  </figcaption>
                )}
              </figure>
            </li>
          ))}
        </ul>
      </div>
      {total > 1 && (
        <div className='flex gap-x-2 mt-5'>
          <button
            className='aspect-square bg-indigo-500 cursor-pointer flex items-center justify-center rounded-sm w-8 disabled:cursor-default disabled:opacity-40 not-disabled:hover:bg-indigo-500'
            disabled={index === 0}
            onClick={() => setIndex(i => i - 1)}
          >
            <span className='sr-only'>Prev</span>
            <FontAwesomeIcon
              className='text-2xl text-white'
              icon={faCaretLeft}
            />
          </button>
          <button
            className='aspect-square bg-indigo-500 cursor-pointer flex items-center justify-center rounded-sm w-8 disabled:cursor-default disabled:opacity-40 not-disabled:hover:bg-indigo-500'
            disabled={index === total - 1}
            onClick={() => setIndex(i => i + 1)}
          >
            <span className='sr-only'>Next</span>
            <FontAwesomeIcon
              className='text-2xl text-white'
              icon={faCaretRight}
            />
          </button>
        </div>
      )}
    </div>
  );
}
