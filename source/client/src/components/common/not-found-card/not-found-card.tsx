import { Button } from '../button';
import { AiOutlineNodeIndex } from 'react-icons/ai';
import Link from 'next/link';

export const NotFoundCard = () => {
  return (
    <div className="flex w-100 flex-col items-center justify-center rounded-md bg-slate-700 py-8 shadow-lg">
      <AiOutlineNodeIndex size={65} />
      <p className="mt-4">There is no result for your query</p>
      <p>Do you want to upload an image?</p>

      <Link href="/upload">
        <div className="mt-6 w-44">
          <Button fluid={true}>Publish Image</Button>
        </div>
      </Link>
    </div>
  );
};
