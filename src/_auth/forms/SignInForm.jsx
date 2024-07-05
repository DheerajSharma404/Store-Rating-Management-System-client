import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { signInUser } from "../../api/userApi.js";
import { useAuth } from "../../contexts/AuthContext.jsx";
import { UserValidation } from "../../validators";

const SignInForm = () => {
  const { handleLogin } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
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
      UserValidation.userSignInValidationSchema.safeParse(formData);
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
    const response = await signInUser(formData);
    if (response?.success) {
      handleLogin(response?.data);
      toast.success("Successfully signed in.");
      navigate("/");
    } else {
      toast.error(response?.error?.explanation);
    }
  };
  return (
    <div className='border px-8 py-12 rounded-2xl max-w-md w-[80%] mx-8 my-auto'>
      <h1 className='text-4xl font-bold my-2 mb-4'>Sign In </h1>
      <p className='text-lg font-normal  mb-4 '>Your Feedback Matter..</p>
      <form onSubmit={handleSubmit} className='flex flex-col gap-6'>
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
            type='password'
            name='password'
            onChange={handleChange}
            autoComplete='off'
            placeholder='Password'
            className='p-3 text-base outline-none border bg-transparent text-white mb-4 rounded-lg'
          />
          {formError.password && (
            <p className='text-red-500 text-sm font-normal mb-3'>
              {formError.password}
            </p>
          )}
        </div>
        <button
          type='submit'
          className='p-3 text-base font-semibold outline-none border-none bg-white text-black cursor-pointer mb-4 rounded-lg'
        >
          {" "}
          Sign in
        </button>
        <p className='text-base font-normal'>
          Does not have Account?{" "}
          <span
            onClick={() => navigate("/sign-up")}
            className='text-base underline cursor-pointer text-amber-500'
          >
            Sign Up
          </span>
        </p>
      </form>
    </div>
  );
};

export default SignInForm;
