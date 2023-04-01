'use client';

import { useForm } from 'react-hook-form';
import Button from '#/components/button';
import Input from '#/components/input';
import { login } from '#/api/auth';
import { useSetRecoilState } from 'recoil';
import { alertState } from '#/recoil/alert';
import jwtDecode from 'jwt-decode';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();

  const setAlert = useSetRecoilState(alertState);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isSubmitting },
  } = useForm();

  const onLogin = async (data) => {
    try {
      const { accessToken } = await login(data);
      localStorage.setItem('accessToken', accessToken);

      const { role } = jwtDecode(accessToken);

      switch (role) {
        case 'Teacher':
          router.push('/dashboard-teacher');
          break;

        case 'Student':
          router.push('/dashboard-student');
          break;

        default:
          break;
      }
    } catch (error) {
      setAlert({ type: false, message: error?.response?.data?.message ?? 'Something went wrong!' });
    }
  };

  return (
    <div>
      <h1>Login</h1>

      <form onSubmit={handleSubmit(onLogin)}>
        <Input name="email" {...{ register }} label="Email" required errorMsg={errors.email?.message} />
        <Input name="password" {...{ register }} label="Password" type="password" required errorMsg={errors.password?.message} />
        <Button disabled={!isDirty} loading={isSubmitting}>
          Login
        </Button>
      </form>

      <Button href="/register" variant="text">
        Don&apos;t have an account?
      </Button>
    </div>
  );
}
