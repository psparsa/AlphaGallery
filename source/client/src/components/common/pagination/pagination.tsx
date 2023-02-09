import { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';

interface Properties {
  defaultPage?: number;
  onChange?: (page: number) => void;
  pagesCount: number;
  visiblePagesCount?: number;
}

export const Pagination = ({
  defaultPage,
  pagesCount,
  onChange,
  visiblePagesCount = 5,
}: Properties) => {
  const [currentPage, setCurrentPage] = useState(defaultPage ?? 1);

  const getVisiblePagesIndexes = () => {
    const pages = Array.from({ length: pagesCount }, (_, index) => index + 1);
    const sidePageCount = Math.floor((visiblePagesCount - 1) / 2);

    const expectedEnd = currentPage + sidePageCount;
    const expectedStart = currentPage - 1 - sidePageCount;

    const start =
      expectedEnd > pagesCount
        ? pagesCount - visiblePagesCount
        : Math.max(expectedStart, 0);

    const end =
      expectedStart < 0 ? visiblePagesCount : Math.min(expectedEnd, pagesCount);

    console.log({
      sidePageCount,
      expectedEnd,
      expectedStart,
      pagesCount,
      start,
      end,
    });
    return pages.slice(start, end);
  };

  const goNextPage = () => {
    if (currentPage > 1) setCurrentPage((p) => p + 1);
  };

  const goPreviousPage = () => {
    if (currentPage < pagesCount) setCurrentPage((p) => p - 1);
  };

  useEffect(() => {
    setCurrentPage(defaultPage ?? 1);
  }, [defaultPage]);

  useEffect(() => {
    onChange?.(currentPage);
  }, [currentPage, onChange]);

  const visiblePages = getVisiblePagesIndexes();

  //FIXME this should go the button component as a variant of `outline` perhaps
  const CHANGE_PAGE_BUTTONS_CLASSES = `mx-5 flex w-24 cursor-pointer select-none justify-center 
    rounded-3xl border border-solid border-coralRed py-2 text-snow`;

  return (
    <div className="flex flex-col items-center justify-center sm:flex-row">
      <div
        className={twMerge(CHANGE_PAGE_BUTTONS_CLASSES, 'mb-4 sm:mb-0')}
        onClick={goPreviousPage}
      >
        Previous
      </div>
      <div className="flex">
        {visiblePages.map((v) => (
          <div
            onClick={() => setCurrentPage(v)}
            className={twMerge(
              `mx-1 flex h-10 w-10 cursor-pointer select-none items-center justify-center rounded-lg text-snow`,
              currentPage === v ? 'border border-solid border-coralRed' : ''
            )}
            key={v}
          >
            {v}
          </div>
        ))}
      </div>
      <div
        className={twMerge(CHANGE_PAGE_BUTTONS_CLASSES, 'mt-4 sm:mt-0')}
        onClick={goNextPage}
      >
        Next
      </div>
    </div>
  );
};
