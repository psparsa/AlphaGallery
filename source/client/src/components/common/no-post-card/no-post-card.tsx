import { Button } from '../button';
import { AiFillAlert } from 'react-icons/ai';
import Link from 'next/link';

export const NoPostCard = () => {
  return (
    <div className="flex w-100 flex-col items-center justify-center rounded-md bg-slate-800 py-8 shadow-lg">
      <AiFillAlert size={65} />
      <p className="mt-4">Oh! Seems there is no post...</p>
      <p>Go ahead and post a brilliant picture ;)</p>

      <Link href="/upload">
        <div className="mt-6 w-44">
          <Button fluid={true}>Publish Image</Button>
        </div>
      </Link>
    </div>
  );
};
