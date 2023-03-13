import React from 'react';
import { Search, ScrollButton, Card } from '@/components';
import { Roboto } from '@next/font/google';
import { twMerge } from 'tailwind-merge';
import Head from 'next/head';
import {
  getPosts,
  getUserInfo,
  PostsResponse,
  useGetPosts,
  UserInfoResponse,
} from '@/api';
import { GetServerSideProps } from 'next';
import { Pagination } from '@/components/common/pagination';
import { useAuth } from '@/utils/use-auth';
import { Button } from '@/components/common/button';
import Link from 'next/link';

const roboto = Roboto({ weight: ['300', '400'], subsets: ['latin'] });

const scrollToBottom = () => {
  window.scrollTo({ behavior: 'smooth', top: document.body.scrollHeight });
};

interface HomePageProperties {
  initialPosts: PostsResponse;
  initialUserData?: UserInfoResponse;
}

export const getServerSideProps: GetServerSideProps<
  HomePageProperties
> = async (context) => {
  const token = context.req.cookies.token;
  const posts = await getPosts({ page: 1, pageSize: 3 });

  if (!token)
    return {
      props: {
        initialPosts: posts,
      },
    };

  const userData = await getUserInfo({ jwt: token }).catch();

  return {
    props: {
      initialPosts: posts,
      initialUserData: userData,
    },
  };
};

export default function HomePage({
  initialPosts,
  initialUserData,
}: HomePageProperties) {
  const { isAuthenticated, userDataIsLoading } = useAuth({ initialUserData });

  React.useEffect(() => {
    console.log({ isAuthenticated, userDataIsLoading });
  }, [isAuthenticated, userDataIsLoading]);

  const [page, setPage] = React.useState(1);
  const [query, setQuery] = React.useState('');
  const { data: posts } = useGetPosts({
    page,
    pageSize: 3,
    initialData: initialPosts,
    query,
  });

  const getCards = () => {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    const API_ADDRESS = `${process.env.NEXT_PUBLIC_API_PROTOCOL}://${process.env.NEXT_PUBLIC_API_HOSTNAME}:${process.env.NEXT_PUBLIC_API_PORT}`;

    if (posts)
      return posts.data.map((post) => (
        <Card
          categories={post.attributes.categories.data.map(
            (x) => x.attributes.name
          )}
          description={post.attributes.description}
          title={post.attributes.title}
          imageSrc={`${API_ADDRESS}${post.attributes.image.data.attributes.url}`}
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
          <header className="fixed top-0 left-0 flex w-screen px-4 py-3">
            {isAuthenticated ? (
              <>
                <Button variant="dark">Logout</Button>
                <Button variant="dark" containerClassName="ml-2">
                  Upload
                </Button>
              </>
            ) : (
              <Link href="/login">
                <Button variant="dark">Login</Button>
              </Link>
            )}
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
