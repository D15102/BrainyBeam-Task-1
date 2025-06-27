import { createContext, useContext } from "react";


export const UserContext = createContext({
    user: {},
    setUser: () => { },
})

export const UserProvider = UserContext.Provider

const useUser = () => {
    return useContext(UserContext)
}

export default useUser