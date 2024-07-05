/* eslint-disable react/prop-types */
import React from "react";
// import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { createUser } from "../../api/userApi.js";
// import { useAuth } from "../../contexts/AuthContext.jsx";
import { useModal } from "../../contexts/ModalContext.jsx";
import { UserValidation } from "../../validators";

const CreateUserFrom = ({ role }) => {
  // const { handleLogin } = useAuth();
  // const navigate = useNavigate();

  const { toggleModal } = useModal();

  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    address: "",
    password: "",
    role: role,
  });
  const [formError, setFormError] = React.useState({});
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationResult =
      UserValidation.userSignUpValidationSchema.safeParse(formData);
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

    const response = await createUser(formData);
    if (response?.success) {
      toast.success("Successfully created User.");
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
      <h1 className='text-4xl font-bold my-2 mb-4'>Sign Up</h1>
      <p className='text-lg font-normal  mb-4 '>Your Feedback Matters.</p>
      <form onSubmit={handleSubmit} className='flex flex-col gap-6'>
        <div className='w-[100%] flex flex-col'>
          <input
            type='text'
            name='name'
            onChange={handleChange}
            placeholder='name'
            autoComplete='off'
            className='p-3 text-base outline-none border bg-transparent text-white mb-4 rounded-lg'
          />
          {formError.name && (
            <p className='text-red-500 text-sm font-normal mb-3'>
              {formError.name}
            </p>
          )}
        </div>
        <div className='w-[100%] flex flex-col'>
          <input
            type='text'
            name='email'
            onChange={handleChange}
            placeholder='Email'
            autoComplete='off'
            className='p-3 text-base outline-none border bg-transparent text-white mb-4 rounded-lg'
          />
          {formError.email && (
            <p className='text-red-500 text-sm font-normal mb-3'>
              {formError.email}
            </p>
          )}
        </div>

        <div className='w-[100%] flex flex-col'>
          <input
            type='text'
            name='address'
            onChange={handleChange}
            placeholder='Address'
            autoComplete='off'
            className='p-3 text-base outline-none border bg-transparent text-white mb-4 rounded-lg'
          />
          {formError.address && (
            <p className='text-red-500 text-sm font-normal mb-3'>
              {formError.address}
            </p>
          )}
        </div>

        {role !== "store_owner" && (
          <div className='w-[100%] flex flex-col'>
            <input
              type='password'
              name='password'
              onChange={handleChange}
              placeholder='Password'
              autoComplete='false'
              className='p-3 text-base outline-none border bg-transparent text-white mb-4 rounded-lg'
            />
            {formError.password && (
              <p className='text-red-500 text-sm font-normal mb-3'>
                {formError.password}
              </p>
            )}
          </div>
        )}
        <button
          type='submit'
          className='p-3 text-base font-semibold outline-none border-none bg-white text-black cursor-pointer mb-4 rounded-lg'
        >
          {" "}
          Create new{" "}
          {role === "normal"
            ? "User"
            : role === "store_owner"
            ? "Store"
            : "Admin"}
        </button>
      </form>
      <div className='absolute top-2 right-4' onClick={handleCloseModal}>
        close
      </div>
    </div>
  );
};

export default CreateUserFrom;
