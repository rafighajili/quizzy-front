'use client';

import { useForm } from 'react-hook-form';
import Button from '#/components/button';
import Input from '#/components/input';
import Select from '#/components/select';
import { register } from '#/api/auth';
import { useSetRecoilState } from 'recoil';
import { alertState } from '#/recoil/alert';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();

  const setAlert = useSetRecoilState(alertState);

  const {
    register: reg,
    handleSubmit,
    formState: { errors, isDirty, isSubmitting },
  } = useForm();

  const onRegister = async (data) => {
    try {
      await register(data);
      setAlert({ type: true, message: 'You was registered successfully!' });
      router.push('/login');
    } catch (error) {
      setAlert({ type: false, message: error?.response?.data?.message ?? 'Something went wrong!' });
    }
  };

  return (
    <div>
      <h1>Register</h1>

      <form onSubmit={handleSubmit(onRegister)}>
        <Input name="name" register={reg} label="Name" required errorMsg={errors.name?.message} />
        <Input name="surname" register={reg} label="Surname" required errorMsg={errors.surname?.message} />
        <Input name="email" register={reg} label="Email" required errorMsg={errors.email?.message} />
        <Input name="password" register={reg} label="Password" type="password" required errorMsg={errors.password?.message} />
        <Select
          name="userType"
          register={reg}
          label="User type"
          options={[
            { value: 0, text: 'Student' },
            { value: 1, text: 'Teacher' },
          ]}
          required
          errorMsg={errors.userType?.message}
        />
        <Button disabled={!isDirty} loading={isSubmitting}>
          Register
        </Button>
      </form>

      <Button href="/login" variant="text">
        Already have an account?
      </Button>
    </div>
  );
}
