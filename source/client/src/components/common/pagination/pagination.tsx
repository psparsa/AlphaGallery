import React from 'react';

interface Properties {
  numberOfPages: number;
}

export const Pagination = ({ numberOfPages }: Properties) => {
  const [currentPage, setCurrentPage] = React.useState(1);

  return (
    <div className="flex items-center justify-center">
      <div
        className={`mx-2 flex w-24 cursor-pointer select-none justify-center rounded-3xl border 
        border-solid border-coralRed py-2 text-snow`}
      >
        Previous
      </div>
      <div
        className={`mx-2 flex w-24 cursor-pointer select-none justify-center rounded-3xl border 
        border-solid border-coralRed py-2 text-snow`}
      >
        Next
      </div>
    </div>
  );
};
