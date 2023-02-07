import { Search, ScrollButton } from '@/components';
import { Layout } from '../components/common/layout/layout';

export default function Home() {
  return (
    <Layout>
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
          <Search containerClassName="mt-16" />
        </div>

        <ScrollButton containerClassName="mb-4" />
      </div>

      <div
        className="flex min-h-screen w-screen flex-col items-center
        justify-center bg-gradient-to-b from-chineseBlackVoid to-chineseBlack"
      ></div>
    </Layout>
  );
}
