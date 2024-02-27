import 'react-toastify/dist/ReactToastify.css';
import React from 'react';
import Head from 'next/head';
import { Textarea } from '@/components/common';
import { Roboto } from '@next/font/google';
import { Input } from '@/components/common';
import { Button } from '@/components/common';
import { TbArrowBackUp } from 'react-icons/tb';
import Link from 'next/link';
import { ImageInput } from '@/components/common';
import * as z from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Cookies from 'js-cookie';
import { isAxiosError } from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useRouter } from 'next/router';
import { postServices } from '@/api/services/post/post.services';

const roboto = Roboto({ weight: ['300', '400'], subsets: ['latin'] });

const formSchema = z.object({
  title: z
    .string()
    .min(1, { message: 'Title is required' })
    .max(20, { message: 'Title is too long!' }),
  description: z
    .string()
    .min(10, {
      message: 'The length of description should be at least 15 characters',
    })
    .max(150, {
      message: 'The length of description should be less than 150 characters',
    }),
});

type FormValues = z.infer<typeof formSchema>;

const UploadPage = () => {
  const router = useRouter();
  const [isImageSelected, setIsImageSelected] = React.useState(false);
  const imageFileReference = React.useRef<null | File>(null);
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      title: '',
      description: '',
    },
    mode: 'onChange',
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (formValues: FormValues) => {
    const REDIRECT_DELAY = 1500;
    const token = Cookies.get('token');

    if (!token) {
      toast.warning("You aren't authenticated!", { autoClose: REDIRECT_DELAY });
      setTimeout(() => {
        void router.push('/login');
      }, REDIRECT_DELAY + 500);
    }

    if (imageFileReference.current && token) {
      try {
        const { data } = await postServices.publish({
          title: formValues.title,
          description: formValues.description,
          // TODO: categoriesId should be dynamic!
          categoriesId: 5,
          image: imageFileReference.current,
          token,
        });

        const wasSuccessful = data.id;
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (wasSuccessful) {
          toast.success('Your image published successfully!', {
            autoClose: REDIRECT_DELAY,
          });

          setTimeout(() => {
            void router.push('/');
          }, REDIRECT_DELAY + 500);
        } else toast.error('an unexpected error occurred');
      } catch (error) {
        if (isAxiosError(error)) {
          if (error.response) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            const errorMessage = error.response.data.error.message as string;
            toast.error(errorMessage);
          } else toast.error("server didn't respond");
        } else toast.error('an unexpected error occurred');
      }
    }
  };

  const onChangeImage = (image: File) => {
    setIsImageSelected(true);
    Reflect.set(imageFileReference, 'current', image);
  };

  return (
    <>
      <Head>
        <title>AlphaGallery - Upload Image</title>
      </Head>

      <main
        style={roboto.style}
        className="flex min-h-screen w-screen flex-col items-center justify-center bg-chineseBlack py-6"
      >
        <form
          className="flex flex-col items-center"
          // handleSubmit can also take an async callback!
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onSubmit={handleSubmit(onSubmit)}
        >
          <ImageInput onChange={onChangeImage} />

          <div className="mt-2 h-6 w-full text-center text-begonia">
            {!!errors.title?.message && errors.title.message}
          </div>

          <Controller
            name="title"
            control={control}
            render={({
              field: { onChange, onBlur, value, name, ref },
              fieldState: { invalid },
            }) => (
              <Input
                placeHolder="What's the title of image?"
                containerClassName="mt-1"
                inputRef={ref}
                {...{ onChange, onBlur, value, name, invalid }}
              />
            )}
          />

          <Controller
            name="description"
            control={control}
            render={({
              field: { onChange, onBlur, value, name, ref },
              fieldState: { invalid },
            }) => (
              <Textarea
                placeHolder="Enter the description of image"
                containerClassName="mt-4"
                maxLength={150}
                inputRef={ref}
                {...{ onChange, onBlur, value, name, invalid }}
              />
            )}
          />

          <div className="mt-2 h-6 w-full text-center text-begonia">
            {!!errors.description?.message && errors.description.message}
          </div>

          <div className="mt-8 w-40">
            <Button
              fluid={true}
              type="submit"
              disable={!isValid || isSubmitting || !isImageSelected}
            >
              {isSubmitting ? 'Submitting...' : 'Upload Image'}
            </Button>
          </div>

          <Link href="/" className="mt-2">
            <div className="flex cursor-pointer">
              <p className="text-gray-400">or</p>
              <p className="ml-1 font-light text-snow">Back to home page</p>
              <div className="ml-1 mt-1">
                <TbArrowBackUp color="snow" size={18} />
              </div>
            </div>
          </Link>
        </form>
      </main>
      <ToastContainer />
    </>
  );
};

export default UploadPage;
