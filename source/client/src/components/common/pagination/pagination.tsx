import React from 'react';
import { twMerge } from 'tailwind-merge';

interface Properties {
  defaultPage?: number;
  numberOfPages: number;
  onChange?: (page: number) => void;
}

export const Pagination = ({
  defaultPage,
  numberOfPages,
  onChange,
}: Properties) => {
  const [currentPage, setCurrentPage] = React.useState(defaultPage ?? 1);

  const pages = Array.from({ length: numberOfPages }, (_, index) => index + 1);

  const getPageItems = () => {
    const items = [
      ...pages.slice(Math.max(currentPage - 3, 0), currentPage - 1),
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

    if (currentPage >= numberOfPages - 1)
      return [
        ...pages.slice(
          currentPage - (currentPage === numberOfPages ? 5 : 4),
          currentPage - 3
        ),
        ...items,
      ];

    return items;
  };

  const handleSelectPage = (page: number) => {
    setCurrentPage(page);
    if (onChange) onChange(page);
  };

  const handleChangingPage = (action: 'next' | 'previous') =>
    setCurrentPage((p) => {
      const result = (() => {
        if (action === 'previous' && p > 1) return p - 1;
        if (action === 'next' && p < numberOfPages) return p + 1;
        return p;
      })();

      if (onChange) onChange(result);
      return result;
    });

  React.useEffect(() => {
    setCurrentPage(defaultPage ?? 1);
  }, [defaultPage]);

  const CHANGE_PAGE_BUTTONS_CLASSES = `mx-5 flex w-24 cursor-pointer select-none justify-center 
    rounded-3xl border border-solid border-coralRed py-2 text-snow`;

  return (
    <div className="flex flex-col items-center justify-center sm:flex-row">
      <div
        className={twMerge(CHANGE_PAGE_BUTTONS_CLASSES, 'mb-4 sm:mb-0')}
        onClick={() => handleChangingPage('previous')}
      >
        Previous
      </div>
      <div className="flex">
        {getPageItems().map((v) => (
          <div
            onClick={() => handleSelectPage(v)}
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
        onClick={() => handleChangingPage('next')}
      >
        Next
      </div>
    </div>
  );
};
