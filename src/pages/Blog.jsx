import { useEffect, useState } from 'react';
import imageUrlBuilder from '@sanity/image-url';
import { client } from '../sanity/client';
import { formatDate } from '../utils/formatDate';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Anchor from "../atoms/Anchor";
import Heading from '../atoms/Heading';

const { projectId, dataset } = client.config();
const urlFor = source =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

const POST_QUERY = `
  *[_type == "post" && defined(publishedAt)] | order(publishedAt desc) {
    _id,
    excerpt,
    title,
    slug,
    publishedAt,
    mainImage,
    categories[]-> {
      _id,
      title,
      slug
    }
  }
`;

export default function Blog() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
      client
        .fetch(POST_QUERY)
        .then(data => {
          setPosts(data)
        })
  }, [])

  return (
    <>
      <hgroup className="text-center">
        <Heading as='h1'>
          Flavor Text
        </Heading>
        <h2 className="mt-1 text-lg">Musings on game design, and Joker&apos;s Dozen game dev diary.</h2>
      </hgroup>
      <section className='mt-15'>
        <ul className="grid grid-cols-1 gap-y-8">
          {posts.map((post, i) => {
            const { isoDate, formatted } = formatDate(post.publishedAt)
            return <li key={i}>
              <article className="relative">
                <Anchor href={`/flavor-text/${post.slug.current}`}>
                  <h1 className="inline text-2xl">{post.title}</h1>
                </Anchor>
                <time className="block mt-1 text-sm" datetime={isoDate}>{formatted}</time>
                <p className="text-base mt-3">
                  {post.excerpt}
                </p>
                <Anchor className="inline-flex items-center gap-x-1 mt-2" href={`/flavor-text/${post.slug.current}`}>
                  Read More
                  <FontAwesomeIcon icon={faArrowRight} />
                </Anchor>
              </article>
              {(i + 1) !== posts.length ? <hr className="mt-8" /> : ''}
            </li>
          })}
        </ul>
      </section>
    </>
  );
}
