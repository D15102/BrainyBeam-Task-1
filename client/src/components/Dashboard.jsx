import { useEffect, useState } from "react";
import { LogOut, User2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import useUser from "../contexts/UserContext";
import axios from "axios";
import config from "../../config/config";
import useAuth from "../contexts/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import useTheme from "../contexts/ThemeContext";
const Dashboard = () => {
  // Replace with actual user info from context/API
  const { user, setUser } = useUser();
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const { themeMode, lightMode, darkMode } = useTheme();
  const navigate = useNavigate();
  const handleLogout = () => {
    axios
      .post(`${config.serverURL}/users/logout`, {}, { withCredentials: true })
      .then((response) => {
        const data = response.data;
        if (!data.success) {
          return toast.info(data.message);
        }
        setIsAuthenticated(false);
        setUser({});
        toast.success(data.message);
        navigate("/");
      })
      .catch((err) => toast.error(err));
  };

  const handleToggle = (e) => {
    const currentModeDark = e.currentTarget.checked;
    if (currentModeDark) {
      darkMode();
    } else {
      lightMode();
    }
  };

  useEffect(() => {
    // console.log(user);
  }, [user]);

  useEffect(() => {
    const existingUser = JSON.parse(localStorage.getItem("user"));
    setUser(existingUser);
  }, []);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

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
    const existingTheme = localStorage.getItem("themeMode");
    existingTheme === "light" ? lightMode() : darkMode();
  }, []);

  useEffect(() => {
    localStorage.setItem("themeMode", themeMode);
  }, [themeMode]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-violet-200 dark:bg-gradient-to-br dark:from-lime-400 dark:to-indigo-400">
      {/* Navbar */}
      <div className="backdrop-blur-md bg-white/70 dark:bg-gray-800 shadow-lg px-6 py-4 flex items-center justify-between sticky top-0 z-50 border-b">
        <h1 className="text-xl font-bold text-indigo-700 dark:text-yellow-400 tracking-wide">
          ✨ Dashboard
        </h1>

        {/* Toggle Switch */}
        <StyledWrapper>
          <div className="toggleWrapper">
            <input
              className="input"
              id="dn"
              type="checkbox"
              checked={themeMode === "dark"}
              onChange={handleToggle}
            />
            <label className="toggle" htmlFor="dn">
              <span className="toggle__handler">
                <span className="crater crater--1" />
                <span className="crater crater--2" />
                <span className="crater crater--3" />
              </span>
              <span className="star star--1" />
              <span className="star star--2" />
              <span className="star star--3" />
              <span className="star star--4" />
              <span className="star star--5" />
              <span className="star star--6" />
            </label>
          </div>
        </StyledWrapper>

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-100 text-indigo-800 rounded-full hover:bg-indigo-200 transition duration-200 shadow-sm"
          >
            <User2 className="h-5 w-5" />
            <span className="font-medium">{user.username}</span>
          </button>

          {/* Dropdown */}
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-2 w-64 bg-white shadow-xl rounded-xl overflow-hidden z-50 border"
              >
                <div className="px-5 py-4 border-b bg-indigo-50">
                  <p className="text-xs text-gray-500">Signed in as</p>
                  <p className="text-sm font-medium text-gray-800 truncate">
                    {user.email}
                  </p>
                </div>
                <div className="px-5 py-3">
                  <p className="text-sm text-gray-600">
                    Username:{" "}
                    <span className="font-semibold">{user.username}</span>
                  </p>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 w-full px-5 py-3 text-sm bg-red-50 hover:bg-red-100 text-red-600 transition font-medium"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-8 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Welcome back, {user.username} 👋
        </h2>
      </div>
    </div>
  );
};

const StyledWrapper = styled.div`
  .toggleWrapper {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    margin-right: 1rem;
  }

  .toggleWrapper .input {
    position: absolute;
    left: -9999px;
  }

  .toggle {
    cursor: pointer;
    display: inline-block;
    position: relative;
    width: 60px;
    height: 30px;
    background-color: #83d8ff;
    border-radius: 50px;
    transition: background-color 0.3s ease;
  }

  .toggle__handler {
    position: absolute;
    top: 2px;
    left: 2px;
    width: 26px;
    height: 26px;
    background-color: #ffcf96;
    border-radius: 50%;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
    transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    transform: rotate(-45deg);
  }

  .toggle__handler .crater {
    position: absolute;
    background-color: #e8cda5;
    opacity: 0;
    border-radius: 50%;
    transition: opacity 0.3s ease;
  }

  .crater--1 {
    top: 10px;
    left: 6px;
    width: 3px;
    height: 3px;
  }

  .crater--2 {
    top: 14px;
    left: 14px;
    width: 4px;
    height: 4px;
  }

  .crater--3 {
    top: 6px;
    left: 15px;
    width: 5px;
    height: 5px;
  }

  .star {
    position: absolute;
    background-color: #fff;
    border-radius: 50%;
    transition: all 0.3s ease;
  }

  .star--1 {
    top: 6px;
    left: 25px;
    width: 10px;
    height: 2px;
  }

  .star--2 {
    top: 10px;
    left: 20px;
    width: 8px;
    height: 2px;
  }

  .star--3 {
    top: 16px;
    left: 28px;
    width: 8px;
    height: 2px;
  }

  .star--4,
  .star--5,
  .star--6 {
    opacity: 0;
    width: 2px;
    height: 2px;
    transition: opacity 0.3s ease;
  }

  .star--4 {
    top: 10px;
    left: 10px;
  }

  .star--5 {
    top: 20px;
    left: 12px;
  }

  .star--6 {
    top: 22px;
    left: 20px;
  }

  .input:checked + .toggle {
    background-color: #749dd6;
  }

  .input:checked + .toggle .toggle__handler {
    background-color: #ffe5b5;
    transform: translateX(30px) rotate(0deg);
  }

  .input:checked + .toggle .crater {
    opacity: 1;
  }

  .input:checked + .toggle .star--1 {
    width: 2px;
    height: 2px;
  }

  .input:checked + .toggle .star--2 {
    width: 4px;
    height: 4px;
    transform: translateX(-4px);
  }

  .input:checked + .toggle .star--3 {
    width: 2px;
    height: 2px;
    transform: translateX(-5px);
  }

  .input:checked + .toggle .star--4,
  .input:checked + .toggle .star--5,
  .input:checked + .toggle .star--6 {
    opacity: 1;
  }
`;

export default Dashboard;
