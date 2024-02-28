import React from 'react';
import { Search, ScrollButton, Card } from '@/components/common';
import { Roboto } from '@next/font/google';
import { twMerge } from 'tailwind-merge';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { Pagination } from '@/components/common';
import { useAuth } from '@/auth/use-auth';
import { Button } from '@/components/common';
import Link from 'next/link';
import { NoPostCard } from '@/components/common';
import { NotFoundCard } from '@/components/common';
import { PostsResult } from '@/api/services/post/post.types';
import { postServices } from '@/api/services/post/post.services';
import { postHooks } from '@/api/services/post/post.hooks';
import { IMAGE_SERVER } from '@/constants/image-server';
import * as R from 'ramda';

const roboto = Roboto({ weight: ['300', '400'], subsets: ['latin'] });

const scrollToBottom = () => {
  window.scrollTo({ behavior: 'smooth', top: document.body.scrollHeight });
};

interface HomePageProperties {
  initialPosts: PostsResult;
}

export const getServerSideProps: GetServerSideProps<
  HomePageProperties
> = async () => ({
  props: {
    initialPosts: await postServices.getPosts({ page: 1, pageSize: 3 }),
  },
});

export default function HomePage({ initialPosts }: HomePageProperties) {
  const { isAuthenticated, isUserDataLoading, logout } = useAuth();

  React.useEffect(() => {
    console.log({ isAuthenticated, isUserDataLoading });
  }, [isAuthenticated, isUserDataLoading]);

  const [page, setPage] = React.useState(1);
  const [keyword, setKeyword] = React.useState('');
  const { data: posts } = postHooks.usePosts(
    {
      page,
      pageSize: 3,
      keyword,
    },
    {
      initialData: initialPosts,
    }
  );

  const getCards = () => {
    if (R.isNotNil(posts) && !R.isEmpty(posts.data))
      return posts.data.map((post) => (
        <Card
          categories={post.attributes.categories.data.map(
            (x) => x.attributes.name
          )}
          description={post.attributes.description}
          title={post.attributes.title}
          imageSrc={`${IMAGE_SERVER}${post.attributes.image.data.attributes.url}`}
          key={post.id}
          containerClassName="mx-4 my-8"
        />
      ));

    if (!R.isEmpty(keyword)) return <NotFoundCard />;

    return <NoPostCard />;
  };

  const handleSearch = (q: string) => {
    setKeyword(q);
    scrollToBottom();
  };

  const renderNavButtons = () => {
    if (isAuthenticated)
      return (
        <>
          <Button variant="dark" onClick={logout}>
            Logout
          </Button>
          <Link href="/upload">
            <Button variant="dark" containerClassName="ml-2">
              Upload
            </Button>
          </Link>
        </>
      );

    if (isUserDataLoading) return <Button variant="dark">Loading...</Button>;

    return (
      <Link href="/login">
        <Button variant="dark">Login</Button>
      </Link>
    );
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
          <header className="fixed top-0 left-0 flex w-screen px-4 py-3">
            {renderNavButtons()}
          </header>
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
          {posts && posts.meta.pagination.pageCount > 1 && (
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
