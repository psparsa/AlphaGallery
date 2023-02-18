import React from 'react';
import { Search, ScrollButton, Card } from '@/components';
import { Roboto } from '@next/font/google';
import { twMerge } from 'tailwind-merge';
import Head from 'next/head';
import { getPosts, PostsResponse, useGetPosts } from '@/api';
import { GetServerSideProps } from 'next';
import { Pagination } from '@/components/common/pagination';

const roboto = Roboto({ weight: ['300', '400'], subsets: ['latin'] });

const scrollToBottom = () => {
  window.scrollTo({ behavior: 'smooth', top: document.body.scrollHeight });
};

interface HomePageProperties {
  initialPosts: PostsResponse;
}

export const getServerSideProps: GetServerSideProps<
  HomePageProperties
> = async () => {
  const posts = await getPosts({ page: 1, pageSize: 3 });

  return {
    props: {
      initialPosts: posts,
    },
  };
};

export default function HomePage({ initialPosts }: HomePageProperties) {
  const [page, setPage] = React.useState(1);
  const [query, setQuery] = React.useState('');
  const { data: posts } = useGetPosts({
    page,
    pageSize: 3,
    initialData: initialPosts,
    query,
  });

  const getCards = () => {
    if (posts)
      return posts.data.map((post) => (
        <Card
          categories={post.attributes.categories.data.map(
            (x) => x.attributes.name
          )}
          description={post.attributes.description}
          title={post.attributes.title}
          key={post.id}
          containerClassName="mx-4 my-8"
        />
      ));

    // TODO: return an error indicator
    return 'Oops!';
  };

  const handleSearch = (q: string) => {
    setQuery(q);
    scrollToBottom();
  };

  return (
    <>
      <Head>
        <title>AlphaGallery</title>
      </Head>
      <main
        className={twMerge(
          roboto.className,
          'flex min-h-screen w-screen flex-col bg-chineseBlack font-light text-snow'
        )}
      >
        <div
          className="flex min-h-screen w-screen flex-col items-center
        justify-center bg-chineseBlackVoid"
        >
          <div
            className="flex w-full flex-1 flex-col items-center
            justify-center"
          >
            <div className="text-center text-6xl font-light text-coralRed sm:text-7xl">
              Alpha Gallery
            </div>
            <div className="mt-4 text-begonia">
              Explore and Upload Images just by a few clicks...
            </div>
            <Search containerClassName="mt-16" onSearch={handleSearch} />
          </div>

          <ScrollButton containerClassName="mb-4" onClick={scrollToBottom} />
        </div>

        <div
          className="flex min-h-screen w-screen flex-col items-center
        justify-center bg-gradient-to-b from-chineseBlackVoid to-chineseBlack"
        >
          <div className="flex min-h-full w-full flex-wrap justify-center">
            {getCards()}
          </div>
          {posts && (
            <div className="mb-4 mt-2">
              <Pagination
                page={page}
                pagesCount={posts.meta.pagination.pageCount}
                onChange={setPage}
              />
            </div>
          )}
        </div>
      </main>
    </>
  );
}
