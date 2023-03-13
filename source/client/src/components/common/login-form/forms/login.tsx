import { Controller, useForm } from 'react-hook-form';
import { Input } from '@/components/common/input/input';
import { Button } from '@/components/common/button';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { login as loginAccount } from '@/api';
import { useAuth } from '@/utils/use-auth';
import { isAxiosError } from 'axios';
import { toast } from 'react-toastify';
import { useDebouncedCallback } from 'use-debounce';

const schema = z.object({
  username: z
    .string()
    .min(1, { message: 'Username is required' })
    .max(40, { message: 'Username is too long!' }),
  password: z
    .string()
    .min(1, { message: 'Password is required' })
    .max(60, { message: 'Password is too long!' }),
});

interface FormValues {
  password: string;
  username: string;
}

export const Login = () => {
  const { loginUser } = useAuth({});
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      username: '',
      password: '',
    },
    mode: 'onChange',
    resolver: zodResolver(schema),
  });

  const onSubmit = useDebouncedCallback(async (formValues: FormValues) => {
    try {
      const { jwt } = await loginAccount({
        identifier: formValues.username,
        password: formValues.password,
      });

      loginUser({ jwt });
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          const errorMessage = error.response.data.error.message as string;
          toast.error(errorMessage);
        } else toast.error("server didn't respond");
      } else {
        toast.error('connection error');
      }
    }
  }, 500);

  return (
    <form
      className="flex flex-col items-center"
      // handleSubmit can also take an async callback!
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onSubmit={handleSubmit(onSubmit)}
    >
      {!!errors.username?.message && (
        <div className="mb-2 w-full text-center text-begonia">
          {errors.username.message}
        </div>
      )}
      <Controller
        name="username"
        control={control}
        render={({ field: { onChange, onBlur, value, name, ref } }) => (
          <Input
            placeHolder="Enter your username"
            inputRef={ref}
            {...{ onChange, onBlur, value, name }}
          />
        )}
      />

      {!!errors.password?.message && (
        <div className="mt-2 w-full text-center text-begonia">
          {errors.password.message}
        </div>
      )}
      <Controller
        name="password"
        control={control}
        render={({ field: { onChange, onBlur, value, name, ref } }) => (
          <Input
            placeHolder="Enter your password"
            secret={true}
            containerClassName="mt-3"
            inputRef={ref}
            {...{ onChange, onBlur, value, name }}
          />
        )}
      />

      <div className="mt-4 w-36">
        <Button
          variant="dark"
          fluid={true}
          type="submit"
          disable={!isValid || isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Login'}
        </Button>
      </div>
    </form>
  );
};
