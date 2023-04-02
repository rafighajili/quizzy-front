import { quizKey } from '#/api/quiz';
import { addTest } from '#/api/test';
import Button from '#/components/button';
import Input from '#/components/input';
import Modal from '#/components/modal';
import { alertState } from '#/recoil/alert';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import { useSWRConfig } from 'swr';

export default function TestModal({ show, onClose, quizId }) {
  const setAlert = useSetRecoilState(alertState);

  const { mutate } = useSWRConfig();

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isSubmitting },
    reset,
  } = useForm({ defaultValues: { title: '', easyQuestionCount: null, mediumQuestionCount: null, hardQuestionCount: null, startDate: '', endDate: '' } });

  const onAdd = async (data) => {
    try {
      await addTest({ ...data, quizId });
      setAlert({ type: true, message: 'Test was added successfully!' });
      onClose();
      mutate(quizKey);
    } catch {
      setAlert({ type: false, message: 'Something went wrong!' });
    }
  };

  useEffect(() => {
    reset();
  }, [show]);

  return (
    <Modal {...{ show, onClose }} title="Add test">
      <form onSubmit={handleSubmit(onAdd)} className="flex flex-col gap-y-4">
        <Input {...{ register }} name="title" label="Test title" required errorMsg={errors.title?.message} />

        <div className="grid sm:grid-cols-3 gap-4">
          <Input
            {...{ register }}
            name="easyQuestionCount"
            label="Easy questions"
            type="number"
            step="any"
            options={{ min: { value: 0, message: 'Enter a positive number' } }}
            required
            errorMsg={errors.easyQuestionCount?.message}
          />
          <Input
            {...{ register }}
            name="mediumQuestionCount"
            label="Medium questions"
            type="number"
            options={{ min: { value: 0, message: 'Enter a positive number' } }}
            required
            errorMsg={errors.mediumQuestionCount?.message}
          />
          <Input
            {...{ register }}
            name="hardQuestionCount"
            label="Hard questions"
            type="number"
            options={{ min: { value: 0, message: 'Enter a positive number' } }}
            required
            errorMsg={errors.hardQuestionCount?.message}
          />
        </div>

        <Input {...{ register }} name="startDate" label="Start date" type="datetime-local" required errorMsg={errors.startDate?.message} />
        <Input {...{ register }} name="endDate" label="End date" type="datetime-local" required errorMsg={errors.endDate?.message} />

        <Button disabled={!isDirty} loading={isSubmitting}>
          Add test
        </Button>
      </form>
    </Modal>
  );
}
