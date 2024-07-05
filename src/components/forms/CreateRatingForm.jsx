/* eslint-disable react/prop-types */
import React from "react";
import { toast } from "sonner";

import { createRating } from "../../api/ratingApi";
import { useModal } from "../../contexts/ModalContext";
import { RatingValidation } from "../../validators";

const CreateRatingForm = ({ storeId }) => {
  const { toggleModal } = useModal();

  const [formData, setFormData] = React.useState({
    rating: 1,
  });
  const [formError, setFormError] = React.useState({});
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: parseInt(e.target.value),
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    const validationResult =
      RatingValidation.ratingValidationSchema.safeParse(formData);
    if (!validationResult.success) {
      const error = validationResult.error;
      let newError = {};
      for (const issue of error.issues) {
        newError = {
          ...newError,
          [issue.path[0]]: issue.message,
        };
      }
      return setFormError(newError);
    }
    setFormError({});

    console.log(validationResult);

    const response = await createRating(formData, storeId);
    if (response?.success) {
      toast.success("Successfully created Store.");
      toggleModal();
    } else {
      toast.error(response?.error?.explanation);
    }
  };
  const handleCloseModal = () => {
    toggleModal();
  };
  return (
    <div className='border px-8 py-12 rounded-2xl max-w-md w-[80%] mx-8 my-auto relative bg-black'>
      <h1 className='text-4xl font-bold my-2 mb-4'>Creat New Rating</h1>
      <p className='text-lg font-normal  mb-4 '>Your Feedback Matters.</p>
      <form onSubmit={handleSubmit} className='flex flex-col gap-6'>
        <div className='w-[100%] flex flex-col'>
          <input
            type='number'
            max={5}
            min={1}
            name='rating'
            onChange={handleChange}
            placeholder='Rate on the scale of 1 to 5.'
            autoComplete='off'
            className='p-3 text-base outline-none border bg-transparent text-white mb-4 rounded-lg'
          />
          {formError.name && (
            <p className='text-red-500 text-sm font-normal mb-3'>
              {formError.name}
            </p>
          )}
        </div>
        <button
          type='submit'
          className='p-3 text-base font-semibold outline-none border-none bg-white text-black cursor-pointer mb-4 rounded-lg'
        >
          {" "}
          Create new Rating
        </button>
      </form>
      <div className='absolute top-2 right-4' onClick={handleCloseModal}>
        close
      </div>
    </div>
  );
};

export default CreateRatingForm;
