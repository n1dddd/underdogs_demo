import { createContext, useContext, useEffect } from "react";
import { auth } from "../config/firebase";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    getAuth
} from "firebase/auth"
import { useUserStore } from "../stores/userStore"

const UserContext = createContext();



export const AuthContextProvider = ({ children }) => {
    const authUser = useUserStore((state) => state.user);
    const setAuthUser = useUserStore((state) => state.setUser)
    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const login = async (email, password) => {
        return await signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => { setAuthUser(userCredential.user) })
    }

    const logout = () => {
        setAuthUser({});
        return signOut(auth)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            console.log(currentUser);
            setAuthUser(currentUser);
            console.log(authUser);
        })
        return () => {
            unsubscribe();
        }
    }, [])
    return (
        <UserContext.Provider value={{ createUser, authUser, logout, login }}>
            {children}
        </UserContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(UserContext)
}
