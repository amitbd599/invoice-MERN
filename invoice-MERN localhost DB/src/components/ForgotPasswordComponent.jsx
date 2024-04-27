import React from "react";

const ForgotPasswordComponent = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div
        className="
      flex flex-col
      bg-white
      shadow-md
      px-4
      sm:px-6
      md:px-8
      lg:px-10
      py-8
      rounded-3xl
      w-50
      max-w-md
    "
      >
        <div className="font-medium self-center text-xl sm:text-3xl text-gray-800">
          Forgot Password
        </div>
        <div className="mt-4 self-center text-xl sm:text-sm text-gray-800">
          Enter your email to send <strong>OTP</strong> code
        </div>
        <div className="mt-10">
          <form action="#">
            <div className="flex flex-col mb-5">
              <label
                htmlFor="email"
                className="mb-1 text-xs tracking-wide text-gray-600"
              >
                E-Mail Address:
              </label>
              <div className="relative">
                <div
                  className="
                inline-flex
                items-center
                justify-center
                absolute
                left-0
                top-0
                h-full
                w-10
                text-gray-400
              "
                >
                  <i className="fas fa-at text-blue-500" />
                </div>
                <input
                  id="email"
                  type="email"
                  name="email"
                  className="
                text-sm
                placeholder-gray-500
                pl-10
                pr-4
                rounded-2xl
                border border-gray-400
                w-full
                py-2
                focus:outline-none focus:border-blue-400
              "
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div className="flex w-full">
              <button
                type="submit"
                className="
              flex
              mt-2
              items-center
              justify-center
              focus:outline-none
              text-white text-sm
              sm:text-base
              bg-blue-500
              hover:bg-blue-600
              rounded-2xl
              py-2
              w-full
              transition
              duration-150
              ease-in
            "
              >
                <span className="mr-2 uppercase">Send OTP Code</span>
                <span>
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordComponent;
