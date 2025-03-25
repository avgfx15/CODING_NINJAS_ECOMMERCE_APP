import React, { useState } from "react";

// | Importing useDispatch and useSelector from react-redux
import { useDispatch, useSelector } from "react-redux";

// | Importing useNavigate from react-router
import { useNavigate } from "react-router";

// | Importing signInUserAction from AuthActions
import {
  signInUserAction,
  signUpUserAction,
} from "../../redux/authRedux/AuthActions";

// | Importing LoadingComponent
import LoadingComponent from "../LoadingComponent/LoadingComponent";

// | Importing isUserLoggedInState, loggedInUserState from AuthSlice
import { authErrorState } from "../../redux/authRedux/AuthSlice";
import ErrorComponent from "../ErrorComponent/ErrorComponent";

// & AuthComponent
const AuthComponent = () => {
  const [errorMessage, setErrorMessage] = useState("");
  // @ dispatch variable
  const dispatch = useDispatch();

  // @ useNavigate variable
  const navigate = useNavigate();

  // @ authError and authSuccessStatus variables
  const authError = useSelector(authErrorState);

  // @ SignIn SignUp toggle
  const [isSignIn, setIsSignIn] = useState(true);

  // @ Form Data
  const [formData, setFormData] = useState({});

  // # SignIn SignUp toggle function
  const toggleSignInSignUp = () => {
    setIsSignIn(!isSignIn);
  };

  // % Handle input change using e.target.name and e.target.value
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value.trim() });
  };

  // # SignIn Form Submit

  const signInFormSubmit = async (e) => {
    e.preventDefault();

    // @ Check if form data is not empty
    if (!formData.email || !formData.password) {
      alert("Please fill out all fields.");
      return;
    }

    try {
      const result = await dispatch(signInUserAction(formData));

      // @ check if result is a boolean
      if (signInUserAction.rejected.match(result)) {
        setErrorMessage(result.payload.message);
        // ^ set error message
        setTimeout(() => {
          setErrorMessage("");
        }, 5000);
      } else {
        navigate("/");
      }
    } catch (error) {
      console.log("Login failed:", error.message);
    }
  };

  // # SignUp Form Submit
  const signUpFormSubmit = (e) => {
    e.preventDefault();

    try {
      if (
        !formData.username ||
        !formData.email ||
        !formData.password ||
        !formData.cPassword
      ) {
        return "Please Fill Out All Fields";
      }
      // $ check if password and confirm password match
      if (formData.password !== formData.cPassword) {
        return "Passwords do not match";
      }

      // $ Add API call or further processing here
      dispatch(signUpUserAction(formData));
      navigate("/singin");
    } catch (error) {
      console.log(error);
    }
  };

  // ^ Component render start
  return (
    <div className="flex justify-center items-center md:h-screen my-5 h-fit w-full">
      {isSignIn ? (
        <div className="flex md:flex-row flex-col justify-center items-center md:h-fit w-5/6 container2 p-4">
          {/* Login Image Start  */}
          <div className="w-full md:w-1/2 p-4 rounded-box shadow-2xl space-x-4">
            <img
              src="https://www.allen.ac.in/ace2324/assets/images/login.png" // Add your image URL here
              alt="Login" // Add your image alt here
              className="h-2/4 object-cover rounded-box shadow-2xl"
            />
          </div>
          {/* Login Image End  */}
          {/* Login Form Start  */}

          <div className="w-full md:w-1/2 p-4 rounded-box shadow-2xl space-x-4 ml-0 md:ml-4">
            {errorMessage && <ErrorComponent message={errorMessage} />}
            <form onSubmit={signInFormSubmit}>
              <fieldset className="fieldset border border-base-400 p-4 rounded-box shadow-2xl">
                <legend className="fieldset-legend text-2xl">Sign In</legend>

                <label className="fieldset-label text-lg">Email</label>
                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  className="input w-full"
                  placeholder="Email"
                />

                <label className="fieldset-label text-lg">Password</label>
                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  className="input w-full"
                  placeholder="Password"
                />

                <button className="btn btn-neutral mt-4 text-xl" type="submit">
                  Sign In
                </button>
                <div className="flex items-center my-4">
                  <p className="text-lg mr-3">
                    If not registered, please register here
                  </p>
                  <button
                    className="btn btn-neutral"
                    onClick={toggleSignInSignUp}
                  >
                    Sign Up
                  </button>
                </div>
              </fieldset>
            </form>
          </div>
          {/* Login Form End  */}
        </div>
      ) : (
        <div className="flex md:flex-row flex-col justify-center items-center md:h-fit w-5/6 container2 p-4">
          {/* Login Image Start  */}
          <div className="w-full md:w-1/2 p-4 rounded-box shadow-2xl space-x-4">
            <img
              src="https://www.allen.ac.in/ace2324/assets/images/login.png" // Add your image URL here
              alt="Login" // Add your image alt here
              className="h-2/4 object-cover rounded-box shadow-2xl"
            />
          </div>
          {/* Login Image End  */}
          {/* Sign Up Form Start  */}

          <div className="w-full md:w-1/2 p-4 rounded-box shadow-2xl space-x-4 ml-0 md:ml-4">
            <fieldset className="fieldset border border-base-400 p-4 rounded-box shadow-2xl">
              <legend className="fieldset-legend text-2xl">Sign Up</legend>

              <label className="fieldset-label text-lg">Username</label>
              <input
                type="username"
                name="username"
                className="input w-full"
                placeholder="Email"
                onChange={handleChange}
              />

              <label className="fieldset-label text-lg">Email</label>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                className="input w-full"
                placeholder="Email"
              />

              <label className="fieldset-label text-lg">Password</label>
              <input
                type="password"
                name="password"
                onChange={handleChange}
                className="input w-full"
                placeholder="Password"
              />
              <label className="fieldset-label text-lg">Confirm Password</label>
              <input
                type="cPassword"
                name="cPassword"
                onChange={handleChange}
                className="input w-full"
                placeholder="Confirm Password"
              />

              <button
                className="btn btn-neutral mt-4 text-xl"
                onClick={(e) => signUpFormSubmit(e)}
              >
                Sign Up
              </button>
              <div className="flex items-center my-4">
                <p className="text-lg mr-3">
                  If already registered, please register here
                </p>
                <button
                  className="btn btn-neutral"
                  onClick={toggleSignInSignUp}
                >
                  Sign In
                </button>
              </div>
            </fieldset>
          </div>
          {/* Sign Up Form End  */}
        </div>
      )}
    </div>
  );
};

export default AuthComponent;
