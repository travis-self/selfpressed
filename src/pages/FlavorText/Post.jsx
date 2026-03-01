import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { PortableText } from '@portabletext/react';
import { client, previewClient } from '../../sanity/client';
import { portableTextComponents } from '../../sanity/PortableTextComponents';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Anchor from '../../atoms/Anchor';

const POST_QUERY = `
  *[_type == "post" && slug.current == $postSlug] {
    _id,
    title,
    slug,
    publishedAt,
    author-> {
      name
    },
    body,
    "hero": mainImage.asset->url,
    mainImage,
    categories[]-> {
      _id,
      title,
      slug
    }
  }[0]
`;

const PREV_NEXT_QUERY = `
  {
    "prev": *[_type == "post" && publishedAt < $publishedAt] | order(publishedAt desc)[0] {
      slug,
      title
    },
    "next": *[_type == "post" && publishedAt > $publishedAt] | order(publishedAt asc)[0] {
      slug,
      title
    }
  }
`;

export default function PostDetail() {
  const { postSlug } = useParams();
  const [post, setPost] = useState(null);
  const [nav, setNav] = useState({ prev: null, next: null });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();
  const sanityClient =
    searchParams.get('preview') === 'true' ? previewClient : client;

  useEffect(() => {
    sanityClient
      .fetch(POST_QUERY, { postSlug })
      .then(current => {
        setPost(current);
        return client.fetch(PREV_NEXT_QUERY, {
          publishedAt: current.publishedAt,
        });
      })
      .then(navData => {
        setNav({ prev: navData.prev, next: navData.next });
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [postSlug]);

  if (loading) return <div className='p-8'>Loading...</div>;
  if (error) return <div className='p-8 text-red-500'>Error: {error}</div>;
  if (!post) return <div className='p-8'>Post not found</div>;

  return (
    <>
      <article className='md:p-8'>
        <Anchor
          href='/flavor-text'
          className='gap-x-1 inline-flex items-center mb-8 dark:hover:text-white'
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          Back to blog
        </Anchor>
        {post.hero && (
          <img
            src={`${post.hero}?w=768&q=100`}
            className='mb-8 aspect-video rounded-xl'
            width='768'
          />
        )}
        <h1 className='mb-4 text-4xl font-bold'>{post.title}</h1>
        <div className='flex gap-2 items-center'>
          {post.author && (
            <>
              <p>By {post.author.name}</p>
              <span
                aria-hidden='true'
                className='py-3 border-black border-r-2 dark:border-white'
              ></span>
            </>
          )}
          <p>
            Published:{' '}
            <time>{new Date(post.publishedAt).toLocaleDateString()}</time>
          </p>
        </div>
        <div className='grid gap-y-5 mt-8 text-lg'>
          {Array.isArray(post.body) && (
            <PortableText
              value={post.body}
              components={portableTextComponents}
            />
          )}
        </div>
      </article>
      {nav.prev || nav.next ? (
        <div class='flex flex-col gap-y-5 mt-10 border-t border-slate-400 pt-8'>
          <nav
            aria-label='Continue reading.'
            className='flex flex-col-reverse gap-y-8 justify-between md:flex-row md:gap-x-10'
          >
            {nav.prev ? (
              <Anchor
                className='flex gap-x-5 items-center dark:hover:text-white'
                href={`/flavor-text/${nav.prev.slug.current}`}
              >
                <FontAwesomeIcon
                  className='text-indigo-400 flex-auto grow-0 shrink-0 text-2xl'
                  icon={faArrowLeft}
                />
                <span>{nav.prev.title}</span>
              </Anchor>
            ) : (
              ''
            )}
            {nav.next ? (
              <Anchor
                className='flex flex-row-reverse gap-x-5 items-center text-right dark:hover:text-white md:ml-auto'
                href={`/flavor-text/${nav.next.slug.current}`}
              >
                <FontAwesomeIcon
                  className='text-indigo-400 flex-auto grow-0 shrink-0 text-2xl'
                  icon={faArrowRight}
                />
                <span>{nav.next.title}</span>
              </Anchor>
            ) : (
              ''
            )}
          </nav>
        </div>
      ) : (
        ''
      )}
    </>
  );
}
