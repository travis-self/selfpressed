import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import imageUrlBuilder from '@sanity/image-url';
import { PortableText } from '@portabletext/react';
import { client } from '../../sanity/client';
import { portableTextComponents } from '../../sanity/PortableTextComponents';

const { projectId, dataset } = client.config();
const urlFor = source =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

const POST_QUERY = `
  *[_type == "post" && slug.current == $postSlug][0] {
    _id,
    title,
    slug,
    publishedAt,
    author-> {
      name
    },
    body,
    mainImage,
    categories[]-> {
      _id,
      title,
      slug
    }
  }
`;

export default function PostDetail() {
  const { postSlug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    client
      .fetch(POST_QUERY, { postSlug })
      .then(data => {
        setPost(data);
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

  const imageUrl = post.mainImage
    ? urlFor(post.mainImage)?.width(550).height(310).url()
    : null;

  return (
    <article className='md:p-8'>
      <Link to='/flavor-text' className='mb-8 inline-block hover:underline'>
        ← Back to blog
      </Link>
      {imageUrl && (
        <img
          src={imageUrl}
          alt={post.title}
          className='mb-8 aspect-video rounded-xl'
          width='550'
          height='310'
        />
      )}
      <h1 className='mb-4 text-4xl font-bold'>{post.title}</h1>
      <div class='flex gap-2 items-center'>
        {post.author && (
          <>
            <p>By {post.author.name}</p>
            <span
              aria-hidden='true'
              className='py-3 border-black border-r-2'
            ></span>
          </>
        )}
        <p>Published: <time>{new Date(post.publishedAt).toLocaleDateString()}</time></p>
      </div>
      <div className='grid gap-y-5 mt-8 text-lg'>
        {Array.isArray(post.body) && (
          <PortableText value={post.body} components={portableTextComponents} />
        )}
      </div>
    </article>
  );
}
