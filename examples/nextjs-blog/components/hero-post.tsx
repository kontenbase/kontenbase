import Avatar from './avatar';
import DateFormatter from './date-formatter';
import CoverImage from './cover-image';
import Link from 'next/link';
import Author from '../types/author';

type Props = {
  title: string;
  coverImage: string;
  date: string;
  excerpt: string;
  author: Author;
  slug: string;
};

const HeroPost = ({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}: Props) => {
  return (
    <section>
      <div className="md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-8 mb-20 md:mb-28">
        <div className="mb-8">
          <CoverImage title={title} src={coverImage} slug={slug} />
        </div>
        <div>
          <h3 className="mb-4 text-4xl lg:text-6xl leading-tight text-red-500 font-bold">
            <Link as={`/posts/${slug}`} href="/posts/[slug]">
              <a className="hover:underline">{title}</a>
            </Link>
          </h3>
          <div className="mb-4 md:mb-0 text-lg">
            <DateFormatter dateString={date} />
          </div>
          <p className="text-lg leading-relaxed mb-4">{excerpt}</p>
          <Avatar name={author?.firstName} picture={author?.picture} />
        </div>
      </div>
    </section>
  );
};

export default HeroPost;
