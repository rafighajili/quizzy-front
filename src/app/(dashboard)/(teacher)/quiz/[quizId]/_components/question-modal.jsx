import { addQuestion, editQuestion, questionsKey } from '#/api/question';
import Button from '#/components/button';
import Input from '#/components/input';
import Modal from '#/components/modal';
import Select from '#/components/select';
import { alertState } from '#/recoil/alert';
import { useEffect } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import { useSWRConfig } from 'swr';

export default function QuestionModal({ show, onClose, quizId, options }) {
  const { mode, initialValues, questionId } = options;

  const setAlert = useSetRecoilState(alertState);

  const { mutate } = useSWRConfig();

  const {
    register,
    watch,
    control,
    handleSubmit,
    formState: { errors, isDirty, isSubmitting },
    reset,
  } = useForm();

  const { fields, append, remove } = useFieldArray({ name: 'options', control });

  const onSubmit = async (data) => {
    let body;
    body = { ...data, options: data.options.map((option) => ({ ...option, isCorrect: option.isCorrect === 'correct' ? true : false })) };
    body.type === 2 && delete body.options;

    try {
      switch (mode) {
        case 'add':
          await addQuestion(quizId, body);
          break;

        case 'edit':
          await editQuestion(quizId, questionId, body);
          break;

        default:
          break;
      }

      setAlert({ type: true, message: `Question was ${mode}ed successfully!` });
      onClose();
      mutate(questionsKey(quizId));
      reset(data);
    } catch {
      setAlert({ type: false, message: 'Something went wrong!' });
    }
  };

  useEffect(() => {
    if (show) {
      switch (mode) {
        case 'add':
          reset({
            questionText: '',
            difficulty: null,
            type: null,
            options: [
              { optionText: '', isCorrect: 'wrong' },
              { optionText: '', isCorrect: 'wrong' },
            ],
          });
          break;

        case 'edit':
          reset({
            ...initialValues,
            options: initialValues.options.length
              ? initialValues.options.map((option) => ({ ...option, isCorrect: option.isCorrect ? 'correct' : 'wrong' }))
              : [
                  { optionText: '', isCorrect: 'wrong' },
                  { optionText: '', isCorrect: 'wrong' },
                ],
          });
          break;

        default:
          break;
      }
    }
  }, [show]);

  return (
    <Modal {...{ show, onClose }} title={`${mode === 'add' ? 'Add' : mode === 'edit' ? 'Edit' : ''} question`}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
        <Input {...{ register }} name="questionText" label="Question text" required errorMsg={errors.questionText?.message} />

        <div className="grid sm:grid-cols-2 gap-4">
          <Select
            name="difficulty"
            {...{ register }}
            label="Difficulty"
            options={[
              { value: 0, text: 'Easy' },
              { value: 1, text: 'Medium' },
              { value: 2, text: 'Hard' },
            ]}
            required
            errorMsg={errors.difficulty?.message}
          />
          <Select
            name="type"
            {...{ register }}
            label="Type"
            options={[
              { value: 0, text: 'Single-choice' },
              { value: 1, text: 'Multi-choice' },
              { value: 2, text: 'Open-ended' },
            ]}
            required
            errorMsg={errors.type?.message}
          />
        </div>

        {watch('type') === 0 || watch('type') === 1 ? (
          <>
            <div className="flex justify-between">
              <p className="text-lg font-medium mt-2">Questions:</p>
              {fields.length !== 5 && (
                <button
                  type="button"
                  onClick={() => append({ optionText: '', isCorrect: 'wrong' })}
                  className="text-green-500 border border-green-500 px-3 h-8 rounded-xl text-sm hover:bg-green-500/20 font-medium duration-100"
                >
                  + Add
                </button>
              )}
            </div>

            <div className="flex flex-col gap-y-2">
              {fields.map((field, index) => (
                <div key={field.id} className="flex items-center gap-x-2">
                  <Input {...{ register }} name={`options.${index}.optionText`} required errorMsg={errors.optionText?.message} className="flex-1" />

                  <label className="flex items-center gap-x-2">
                    <input type="radio" value="correct" {...register(`options.${index}.isCorrect`)} />
                    <p>Correct</p>
                  </label>

                  <label className="flex items-center gap-x-2">
                    <input type="radio" value="wrong" {...register(`options.${index}.isCorrect`)} />
                    <p>Wrong</p>
                  </label>

                  <Button type="button" variant="text" className="ml-4" disabled={fields.length === 2} onClick={() => remove(index)}>
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          </>
        ) : watch('type') === 2 ? null : (
          <p>Please select question type</p>
        )}

        <Button disabled={!isDirty} loading={isSubmitting}>
          {`${mode === 'add' ? 'Add' : mode === 'edit' ? 'Edit' : ''} question`}
        </Button>
      </form>
    </Modal>
  );
}
