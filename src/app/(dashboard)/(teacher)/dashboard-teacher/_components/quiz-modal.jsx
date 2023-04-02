import { addQuiz, quizKey } from '#/api/quiz';
import Button from '#/components/button';
import Input from '#/components/input';
import Modal from '#/components/modal';
import { alertState } from '#/recoil/alert';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import { useSWRConfig } from 'swr';

export default function QuizModal({ show, onClose }) {
  const setAlert = useSetRecoilState(alertState);

  const { mutate } = useSWRConfig();

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isSubmitting },
    reset,
  } = useForm({ defaultValues: { title: '' } });

  const onAdd = async (data) => {
    try {
      await addQuiz(data);
      setAlert({ type: true, message: 'Quiz was added successfully!' });
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
    <Modal {...{ show, onClose }} title="Add quiz">
      <form onSubmit={handleSubmit(onAdd)} className="flex flex-col gap-y-4">
        <Input {...{ register }} name="title" label="Quiz title" required errorMsg={errors.title?.message} />

        <Button disabled={!isDirty} loading={isSubmitting}>
          Add quiz
        </Button>
      </form>
    </Modal>
  );
}
