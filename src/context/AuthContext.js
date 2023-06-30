import userEvent from "@testing-library/user-event";
import { Children, createContext, useEffect, useReducer } from "react";
import { auth, projectAuth } from "../firebase/config";
import { GoogleAuthProvider, signInWithPopup, signInWithRedirect, signOut, onAuthStateChanged } from "firebase/auth";
import { useContext } from "react";
export const AuthContext = createContext()
export const authReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return {
                ...state, user: action.payload
            }
        case "LOGOUT":
            return {
                ...state, user: null
            }
        case "AUTH_IS_READY":
            return {
                ...state, user: action.payload, authIsReady: true
            }
        default:
            return state
    }
}
export const AuthContextProvider = ({ children }) => {

    const googleSignIn = () => {
        const provider = new GoogleAuthProvider()
        signInWithPopup(auth, provider).then(() =>
            window.location.reload())

    }

    const [state, dispatch] = useReducer(authReducer, {
        user: null,
        authIsReady: false
    })
    useEffect(() => {
        const unsub = projectAuth.onAuthStateChanged((user) => {
            dispatch({ type: "AUTH_IS_READY", payload: user })
            unsub()
        })
    }, [])
    return (
        <AuthContext.Provider value={{ ...state, dispatch, googleSignIn }}>
            {children}
        </AuthContext.Provider>
    )
}
export const UserAuth = () => {
    return useContext(AuthContext)
}