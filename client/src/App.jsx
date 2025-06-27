import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import { Flip, ToastContainer } from "react-toastify";
import Dashboard from "./components/Dashboard";
import { UserProvider } from "./contexts/UserContext";
import { useEffect, useState } from "react";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { ThemeProvider } from "./contexts/ThemeContext.js";
const App = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") || false
  );
  const [themeMode, setThemeMode] = useState(localStorage.getItem("themeMode"));

  const lightMode = () => {
    setThemeMode("light")
  };
  const darkMode = () => {
    setThemeMode("dark")
  };
  useEffect(()=>{
    const html = document.documentElement
    html.setAttribute("data-theme",themeMode)
  },[themeMode])

  return (
    <UserProvider value={{ user, setUser }}>
      <AuthProvider value={{ isAuthenticated, setIsAuthenticated }}>
        <ThemeProvider value={{ themeMode, lightMode, darkMode }}>
          <div>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
            </Routes>

            <ToastContainer
              position="top-right"
              autoClose={1300}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick={false}
              rtl={false}
              pauseOnFocusLoss={false}
              draggable={true}
              pauseOnHover={false}
              theme="dark"
              transition={Flip}
            />
          </div>
        </ThemeProvider>
      </AuthProvider>
    </UserProvider>
  );
};

export default App;
