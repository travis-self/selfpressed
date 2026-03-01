import imageUrlBuilder from '@sanity/image-url';
import { client } from './client';
import Anchor from '../atoms/Anchor';
import Gallery from '../pages/FlavorText/molecules/Gallery';

const builder = imageUrlBuilder(client);

export function urlFor(source) {
  return builder.image(source);
}

export const portableTextComponents = {
  block: {
    h1: ({ children }) => <h1 className='text-4xl font-bold'>{children}</h1>,
    h2: ({ children }) => <h2 className='text-2xl font-bold'>{children}</h2>,
    blockquote: ({ children }) => (
      <blockquote className='border-l-4 border-blue-500 bg-gray-900 py-4 pl-6 italic text-white dark:border-indigo-300'>
        {children}
      </blockquote>
    ),
    normal: ({ children }) => <p className='leading-relaxed'>{children}</p>,
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null;
      const imageUrl = urlFor(value).width(800).url();
      return (
        <figure className='my-4'>
          <img
            src={imageUrl}
            alt={value.alt || 'Image'}
            className='w-full rounded-lg'
          />
          {value.caption && (
            <figcaption className='mt-2 text-sm text-gray-500 dark:text-gray-300'>
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
    gallery: ({ value }) => <Gallery value={value} />,
  },
  marks: {
    em: ({ children }) => <em className='italic font-bold'>{children}</em>,
    link: ({ value, children }) => (
      <Anchor className='text-cyan-700' href={value}>
        {children}
      </Anchor>
    ),
    strong: ({ children }) => <strong className='font-bold'>{children}</strong>,
  },
};
