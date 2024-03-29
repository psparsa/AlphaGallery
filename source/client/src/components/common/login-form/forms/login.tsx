import { Controller, useForm } from 'react-hook-form';
import { Input } from '@/components/common';
import { Button } from '@/components/common';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuth } from '@/auth/use-auth';
import { isAxiosError } from 'axios';
import { toast } from 'react-toastify';
import { useDebouncedCallback } from 'use-debounce';
import { authServices } from '@/api/services/auth/auth.services';

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

type FormValues = z.infer<typeof schema>;

export const Login = () => {
  const { login } = useAuth();
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
      const { token } = await authServices.loginUser({
        identifier: formValues.username,
        password: formValues.password,
      });

      login({ jwt: token });
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
      {!!errors.username?.message && (
        <div className="mb-2 w-full text-center text-begonia">
          {errors.username.message}
        </div>
      )}
      <Controller
        name="username"
        control={control}
        render={({
          field: { onChange, onBlur, value, name, ref },
          fieldState: { invalid },
        }) => (
          <Input
            placeHolder="Enter your username"
            inputRef={ref}
            {...{ onChange, onBlur, value, name, invalid }}
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
        render={({
          field: { onChange, onBlur, value, name, ref },
          fieldState: { invalid },
        }) => (
          <Input
            placeHolder="Enter your password"
            secret={true}
            containerClassName="mt-3"
            inputRef={ref}
            {...{ onChange, onBlur, value, name, invalid }}
          />
        )}
      />

      <div className="mt-4 w-36" data-testid="login-button">
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
