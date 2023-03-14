import { Input } from '@/components/common/input/input';
import { Button } from '@/components/common/button';
import * as z from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDebouncedCallback } from 'use-debounce';
import { isAxiosError } from 'axios';
import { toast } from 'react-toastify';
import { registerUser } from '@/api';
import { useAuth } from '@/utils/use-auth';

const schema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .max(60, { message: 'Email is too long!' })
    .email({ message: 'Enter a valid email' }),
  username: z
    .string()
    .min(1, { message: 'Username is required' })
    .max(40, { message: 'Username is too long!' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' })
    .max(60, { message: 'Password is too long!' }),
});

type FormValues = z.infer<typeof schema>;

export const Register = () => {
  const { loginUser } = useAuth({});
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      email: '',
      username: '',
      password: '',
    },
    mode: 'onBlur',
    resolver: zodResolver(schema),
  });

  const onSubmit = useDebouncedCallback(async (formValues: FormValues) => {
    try {
      const { jwt } = await registerUser(formValues);
      loginUser({ jwt });
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          const errorMessage = error.response.data.error.message as string;
          toast.error(errorMessage);
        } else toast.error("server didn't respond");
      } else {
        toast.error('an unexpected error occurred');
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
      {!!errors.email?.message && (
        <div className="mb-2 w-full text-center text-begonia">
          {errors.email.message}
        </div>
      )}
      <Controller
        name="email"
        control={control}
        render={({ field: { onChange, onBlur, value, name, ref } }) => (
          <Input
            placeHolder="Enter your Email"
            inputRef={ref}
            {...{ onChange, onBlur, value, name }}
          />
        )}
      />

      {!!errors.username?.message && (
        <div className="mt-2 w-full text-center text-begonia">
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
            containerClassName="mt-3"
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
            inputRef={ref}
            {...{ onChange, onBlur, value, name }}
            containerClassName="mt-3"
            secret={true}
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
          {isSubmitting ? 'Submitting...' : 'Register'}
        </Button>
      </div>
    </form>
  );
};
