import React, { useState } from "react";

const AuthComponent = () => {
  // & SignIn SignUp toggle
  const [isSignIn, setIsSignIn] = useState(true);

  // & Form Data
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    cPassword: "",
  });

  // & SignIn SignUp toggle function
  const toggleSignInSignUp = () => {
    setIsSignIn(!isSignIn);
  };

  // & SignIn Form Submit
  const signInFormSubmit = (e) => {
    console.log("Sign In Form Submit");
    e.preventDefault();
    const { email, password } = formData;
  };

  // & SignUp Form Submit
  const signUpFormSubmit = () => {
    console.log("Sign Up Form Submit");
  };

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
            <fieldset className="fieldset border border-base-400 p-4 rounded-box shadow-2xl">
              <legend className="fieldset-legend text-2xl">Sign In</legend>

              <label className="fieldset-label text-lg">Email</label>
              <input
                type="email"
                className="input w-full"
                placeholder="Email"
              />

              <label className="fieldset-label text-lg">Password</label>
              <input
                type="password"
                className="input w-full"
                placeholder="Password"
              />

              <button
                className="btn btn-neutral mt-4 text-xl"
                onClick={(e) => signInFormSubmit()}
              >
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
          {/* Login Form Start  */}

          <div className="w-full md:w-1/2 p-4 rounded-box shadow-2xl space-x-4 ml-0 md:ml-4">
            <fieldset className="fieldset border border-base-400 p-4 rounded-box shadow-2xl">
              <legend className="fieldset-legend text-2xl">Sign Up</legend>

              <label className="fieldset-label text-lg">Email</label>
              <input
                type="email"
                className="input w-full"
                placeholder="Email"
              />

              <label className="fieldset-label text-lg">Password</label>
              <input
                type="password"
                className="input w-full"
                placeholder="Password"
              />
              <label className="fieldset-label text-lg">Confirm Password</label>
              <input
                type="cPassword"
                className="input w-full"
                placeholder="Confirm Password"
              />

              <button
                className="btn btn-neutral mt-4 text-xl"
                onClick={(e) => signUpFormSubmit()}
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
          {/* Login Form End  */}
        </div>
      )}
    </div>
  );
};

export default AuthComponent;
