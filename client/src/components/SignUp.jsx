import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import config from "../../config/config";
import { toast } from "react-toastify";
import useAuth from "../contexts/AuthContext";
import useUser from "../contexts/UserContext";
import styled from "styled-components";
import useTheme from "../contexts/ThemeContext";
const SignUp = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useUser();
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const { themeMode, lightMode, darkMode } = useTheme();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        `${config.serverURL}/users/signup`,
        { username, email, password },
        { withCredentials: true }
      )
      .then((response) => {
        const data = response.data;
        if (!data.success) {
          return toast.info(data.message);
        }
        toast.success(data.message);
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios
      .post(`${config.serverURL}/auth/verify`, {}, { withCredentials: true })
      .then((response) => {
        const data = response.data;
        // console.log(data);
        if (data.success) {
          setIsAuthenticated(true);
          setUser(data.user);
        } else {
          setIsAuthenticated(false);
        }
      })
      .catch((err) => setIsAuthenticated(false));
  }, []);

  useEffect(() => {
    localStorage.setItem("isAuthenticated", isAuthenticated);
  }, [isAuthenticated]);

  useEffect(() => {
    localStorage.setItem("themeMode", themeMode);
  }, [themeMode]);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] dark:bg-gradient-to-tr dark:from-[#051937] dark:to-[#A8EB12] px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-white/80 dark:bg-gray-800 backdrop-blur-md p-8 rounded-2xl shadow-xl"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6 dark:text-gray-300">
          Welcome 👋
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
              User Name
            </label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-violet-500 focus:outline-none"
              placeholder="example123"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-violet-500 focus:outline-none"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-violet-500 focus:outline-none"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-500 to-violet-500 text-white py-2 rounded-xl font-medium hover:brightness-110 transition duration-200"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-gray-600 dark:text-gray-300">
          Don't have an account?{" "}
          <Link
            to="/"
            className="text-violet-600 font-semibold hover:underline dark:text-sky-400"
          >
            Login
          </Link>
        </p>
      </motion.div>
      <StyledWrapper className="absolute bottom-3 left-5">
        <label className="switch">
          <input
            type="checkbox"
            checked={themeMode === "dark"}
            onChange={(e) => {
              const checked = e.currentTarget.checked;
              checked ? darkMode() : lightMode();
            }}
          />
          <span className="slider" />
        </label>
      </StyledWrapper>
    </div>
  );
};

const StyledWrapper = styled.div`
  /* The switch - the box around the slider */
  .switch {
    font-size: 17px;
    position: relative;
    display: inline-block;
    width: 3.5em;
    height: 2em;
  }

  /* Hide default HTML checkbox */
  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  /* The slider */
  .slider {
    position: absolute;
    cursor: pointer;
    inset: 0;
    border: 2px solid #414141;
    border-radius: 50px;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 1.4em;
    width: 1.4em;
    left: 0.2em;
    bottom: 0.2em;
    background-color: white;
    border-radius: inherit;
    transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
  }

  .switch input:checked + .slider {
    box-shadow: 0 0 20px rgba(9, 117, 241, 0.8);
    border: 2px solid #0974f1;
  }

  .switch input:checked + .slider:before {
    transform: translateX(1.5em);
  }
`;

export default SignUp;
