import React, { ChangeEvent, KeyboardEvent } from 'react';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';
import searchIcon from '@/assets/search-icon.png';

interface SearchProperties {
  containerClassName?: string;
  onChange?: (value: string) => void;
  onSearch?: (value: string) => void;
}

export const Search = ({
  containerClassName,
  onChange,
  onSearch,
}: SearchProperties) => {
  const [value, setValue] = React.useState('');

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const fieldValue = event.target.value;
    setValue(fieldValue);

    if (onChange) onChange(fieldValue);
  };

  const handleInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && onSearch) onSearch(value);
  };

  return (
    <div
      className={twMerge(
        containerClassName,
        'flex h-10 w-80 overflow-hidden rounded-3xl bg-snow sm:w-96 lg:w-2/5'
      )}
    >
      <input
        type="text"
        value={value}
        maxLength={20}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        placeholder="What are you looking for?"
        className="flex-1 bg-snow px-4 text-chineseBlack"
      />
      <button
        className="flex w-12 items-center justify-center bg-taupeGray"
        onClick={() => {
          if (onSearch) onSearch(value);
        }}
        disabled={value.length === 0}
      >
        <Image src={searchIcon} alt="search" className="w-7" />
      </button>
    </div>
  );
};
