import React, { ChangeEvent, KeyboardEvent } from 'react';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';
import searchIcon from '@/assets/search-icon.png';

interface SearchProperties {
  containerClassName?: string;
  onChange?: (value: string) => void;
  onSearch?: () => void;
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
    if (event.key === 'Enter' && onSearch) onSearch();
  };

  return (
    <div
      className={twMerge(
        containerClassName,
        'w-80 sm:w-96 lg:w-2/5 h-10 rounded-3xl bg-snow flex overflow-hidden'
      )}
    >
      <input
        type="text"
        value={value}
        maxLength={20}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        placeholder="What are you looking for?"
        className="bg-snow text-chineseBlack px-4 flex-1"
      />
      <button
        className="w-12 bg-taupeGray flex items-center justify-center"
        onClick={onSearch}
        disabled={value.length === 0}
      >
        <Image src={searchIcon} alt="search" className="w-7" />
      </button>
    </div>
  );
};
