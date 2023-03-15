import { BsCloudUpload } from 'react-icons/bs';
import React, { ChangeEvent } from 'react';

export interface ImageInputProperties {
  onChange?: (image: File) => void;
}

export const ImageInput = ({ onChange }: ImageInputProperties) => {
  const INPUT_ID = 'image-select-input';
  const [preview, setPreview] = React.useState<undefined | string>();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const image = event.target.files?.[0];
    if (image) {
      if (onChange) onChange(image);

      const fileReader = new FileReader();

      fileReader.addEventListener('load', (event) => {
        const result = event.target?.result;
        if (result && typeof result === 'string') setPreview(result);
      });

      fileReader.readAsDataURL(image);
    }
  };

  return (
    <div className="h-60 w-60 sm:w-80 md:w-100">
      <label
        htmlFor={INPUT_ID}
        className={`absolute z-10 flex h-60 w-60 cursor-pointer select-none flex-col items-center 
            justify-center rounded-xl border border-2 border-dashed border-snow bg-chineseBlack bg-opacity-70 text-snow
            sm:w-80 md:w-100
        `}
      >
        <BsCloudUpload size={40} />
        <p className="mt-1">Click here to select an image</p>
      </label>
      <div className="h-full w-full overflow-hidden rounded-xl">
        {!!preview && (
          <img
            src={preview}
            alt="preview"
            className="h-full w-full object-cover"
          />
        )}
      </div>
      <input
        type="file"
        id={INPUT_ID}
        hidden={true}
        accept="image/*"
        onChange={handleChange}
      />
    </div>
  );
};
