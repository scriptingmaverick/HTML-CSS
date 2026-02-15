import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { backendUrl, token, setToken } = useContext(AppContext);

  const [state, setState] = useState("Sign Up");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [name, setName] = useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (state === "Sign Up") {
        const { data } = await axios.post(backendUrl + "/api/user/register", {
          email,
          name,
          password: pass,
        });

        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendUrl + "/api/user/login", {
          email,
          password: pass,
        });

        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  return (
    <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center">
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w[340px] sm:min-w-96 border rounded-xl ext-zinc-600 text-sm shadow-lg">
        <p className="font-semibold text-2xl">
          {state === "Sign Up" ? "Create Account" : "Login"}
        </p>
        <p>
          Please {state === "Sign Up" ? " sign-up " : " log-in "} to book the
          appointment
        </p>
        {state === "Sign Up" && (
          <div className="w-full">
            <p>Full Name</p>
            <input
              type="text"
              value={name}
              className="border order-zinc-300 rounded w-full p-2 mt-1"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
        )}

        <div className="w-full">
          <p>Email</p>
          <input
            type="email"
            value={email}
            className="border order-zinc-300 rounded w-full p-2 mt-1"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="w-full">
          <p>Password</p>
          <input
            type="text"
            className="border order-zinc-300 rounded w-full p-2 mt-1"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-primary w-full rounded-md text-white py-2 text--base"
        >
          {state === "Sign Up" ? "Create Account" : "Login"}
        </button>
        {state === "Sign Up" ? (
          <p>
            Already had an account ?{" "}
            <span
              onClick={() => setState("Login")}
              className="cursor-pointer teext-primary underline"
            >
              Login Here
            </span>
          </p>
        ) : (
          <p>
            Want to create a new account ?{" "}
            <span
              onClick={() => setState("Sign Up")}
              className="cursor-pointer teext-primary underline"
            >
              Click Here
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;
