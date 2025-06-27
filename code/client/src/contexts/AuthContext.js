import { useContext } from "react";
import { createContext } from "react";


export const AuthContext = createContext({
    isAuthenticated: false,
    setIsAuthenticated: () => { }
})

export const AuthProvider = AuthContext.Provider

const useAuth = () => {
    return useContext(AuthContext)
}
export default useAuth


