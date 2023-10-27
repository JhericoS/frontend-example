import React, { useState } from "react";
import { Navigate } from "react-router-dom";

import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { loginSuccess } from "../features/authSlice";

const Login = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);
  console.log(user);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://squid-app-vvma9.ondigitalocean.app/api/usersproduct/login",
        {
          email: email,
          password: password,
        },
        { withCredentials: "include" }
      );

      dispatch(loginSuccess(response.data.user));
      setRedirect(true);
    } catch (error) {
      setError("Correo o contraseña incorrectos");
      console.log(error);
    }
  };

  if (redirect) {
    return <Navigate to={"/home"} />;
  }

  if (user !== null) {
    return <Navigate to={"/home"} />;
  }

  return (
    <div className="bg-white md:bg-[#181a3b] min-h-screen flex flex-col md:flex-row">
      <div className="flex w-full py-16 md:my-auto items-center justify-center md:mx-auto md:w-2/3 md:px-8 lg:px-12 xl:px-20 2xl:px-24">
        <div className="md:mx-auto flex flex-col justify-center items-center">
          <img className="object-cover" src="/images/login.jpg" alt="login" />
        </div>
      </div>

      <div className="w-full mt-16 md:mt-0 md:w-1/3">
        <div className="flex justify-center items-center h-full">
          <div className="flex flex-col items-center justify-center">
            <h2 className="mb-12 font-bold text-2xl lg:text-3xl uppercase text-white">
              FITSTER
            </h2>
            <form
              className="flex w-full max-w-sm flex-col"
              onSubmit={handleSubmit}
            >
              <label
                className="mb-2 text-white font-bold"
                htmlFor="username"
              >
                Usuario
              </label>
              <input
                className="px-4 py-2 rounded border border-gray-300 mb-4"
                type="text"
                id="username"
                name="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label
                className="mb-2 text-white font-bold"
                htmlFor="password"
              >
                Contraseña
              </label>
              <input
                className="px-4 py-2 rounded border border-gray-300 mb-4"
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                className="bg-[#dbc72f] mx-auto my-8 rounded-xl text-black font-bold py-2 px-6"
                type="submit"
              >
                Sign In
              </button>
              {error && <p className="text-red-500 mt-2">{error}</p>}{" "}
              {/* Mostrar el mensaje de error si existe */}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
