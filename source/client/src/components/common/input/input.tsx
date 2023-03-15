import React, { ChangeEventHandler, FocusEventHandler, LegacyRef } from 'react';
import { BsEyeSlash, BsEye } from 'react-icons/bs';
import { twMerge } from 'tailwind-merge';

interface InputProperties {
  containerClassName?: string;
  inputRef?: LegacyRef<HTMLInputElement>;
  invalid?: boolean;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  placeHolder?: string;
  secret?: boolean;
  value?: string;
}

export const Input = ({
  placeHolder,
  secret,
  containerClassName,
  onBlur,
  onChange,
  value,
  inputRef,
  invalid,
}: InputProperties) => {
  const [isVisible, setVisibility] = React.useState(false);

  const getInputType = (): React.HTMLInputTypeAttribute => {
    if (secret && !isVisible) return 'password';
    return 'text';
  };

  return (
    <div
      className={twMerge(
        containerClassName,
        'flex h-8 w-60 justify-between overflow-hidden rounded border-2 border-solid bg-snow',
        invalid ? 'border-coralRed' : ''
      )}
    >
      <input
        type={getInputType()}
        placeholder={placeHolder}
        className="h-full flex-1 bg-snow pl-2 text-gray-900 outline-none"
        onBlur={onBlur}
        onChange={onChange}
        value={value}
        ref={inputRef}
      />
      {secret && (
        <div
          className="flex h-full cursor-pointer items-center justify-center px-2"
          onClick={() => setVisibility((p) => !p)}
        >
          {isVisible ? <BsEye size={20} /> : <BsEyeSlash size={20} />}
        </div>
      )}
    </div>
  );
};
