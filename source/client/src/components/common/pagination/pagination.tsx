import React from 'react';
import { twMerge } from 'tailwind-merge';

interface Properties {
  onChange?: (page: number) => void;
  page?: number;
  pagesCount: number;
}

export const Pagination = ({ page, pagesCount, onChange }: Properties) => {
  const [currentPage, setCurrentPage] = React.useState(
    page ? Math.min(page, pagesCount) : 1
  );

  const pages = Array.from({ length: pagesCount }, (_, index) => index + 1);
  const getVisiblePages = () => {
    const items = [
      ...pages.slice(
        Math.max(currentPage - (pagesCount === 4 ? 4 : 3), 0),
        currentPage - 1
      ),
      currentPage,
      ...pages.slice(currentPage, currentPage + 2),
    ];

    if (currentPage <= 2)
      return [
        ...items,
        ...pages.slice(
          currentPage + 2,
          currentPage + (currentPage === 1 ? 4 : 3)
        ),
      ];

    if (currentPage >= pagesCount - 1)
      return [
        ...pages.slice(
          currentPage - (currentPage === pagesCount ? 5 : 4),
          currentPage - 3
        ),
        ...items,
      ];

    return items;
  };

  const goNextPage = () => {
    if (currentPage < pagesCount)
      setCurrentPage((p) => {
        if (onChange) onChange(p + 1);
        return p + 1;
      });
  };

  const goPreviousPage = () => {
    if (currentPage > 1)
      setCurrentPage((p) => {
        if (onChange) onChange(p - 1);
        return p - 1;
      });
  };

  const handleChangePage = (page: number) => {
    if (onChange) onChange(page);
    setCurrentPage(page);
  };

  React.useEffect(() => {
    if (page) setCurrentPage(page);
  }, [page]);

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
        {getVisiblePages().map((v) => (
          <div
            onClick={() => handleChangePage(v)}
            className={twMerge(
              `mx-1 flex h-10 w-10 cursor-pointer select-none items-center justify-center rounded-lg text-snow`,
              currentPage === v
                ? 'border border-solid border-coralRed'
                : undefined
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
