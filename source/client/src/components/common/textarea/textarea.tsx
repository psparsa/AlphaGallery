import React, {
  ChangeEvent,
  ChangeEventHandler,
  FocusEventHandler,
  LegacyRef,
} from 'react';
import { twMerge } from 'tailwind-merge';

interface TextareaProperties {
  containerClassName?: string;
  inputRef?: LegacyRef<HTMLTextAreaElement>;
  invalid?: boolean;
  maxLength?: number;
  onBlur?: FocusEventHandler<HTMLTextAreaElement>;
  onChange?: ChangeEventHandler<HTMLTextAreaElement>;
  placeHolder?: string;
  value?: string;
}

export const Textarea = ({
  maxLength,
  containerClassName,
  inputRef,
  onBlur,
  onChange,
  value,
  placeHolder,
  invalid,
}: TextareaProperties) => {
  const DEFAULT_MAX_LENGTH = 200;
  const DEFAULT_PLACEHOLDER = 'Enter something here...';

  const [inputValue, setInputValue] = React.useState(value);
  const length = inputValue?.length ?? 0;

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value);
    if (onChange) onChange(event);
  };

  React.useEffect(() => {
    setInputValue(value);
  }, [value]);

  return (
    <div
      className={twMerge(
        containerClassName,
        'flex w-60  flex-col overflow-hidden rounded border-2 border-solid bg-snow',
        invalid ? 'border-coralRed' : undefined
      )}
    >
      <textarea
        className="h-52 w-full resize-none p-2 text-gray-900 outline-none"
        maxLength={maxLength ?? DEFAULT_MAX_LENGTH}
        ref={inputRef}
        onBlur={onBlur}
        onChange={handleChange}
        value={inputValue}
        placeholder={placeHolder ?? DEFAULT_PLACEHOLDER}
      />
      <div className="w-full pr-3 pb-2 text-right text-gunmetal">
        {length}/{maxLength ?? DEFAULT_MAX_LENGTH}
      </div>
    </div>
  );
};
