import { getAuth, onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useReducer } from "react";

export const UserContext = createContext();

export const userReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { ...state, user: action.payload };
        case 'LOGOUT':
            return { ...state, user: null };
        default:
            return state;
    }
}

export const UserContextProvider = ({ children }) => {
    const localUser = JSON.parse(localStorage.getItem("user"));

    const [state, dispatch] = useReducer(userReducer, {
        user: localUser,
    })

    useEffect(() => {
        const unsubscriber = onAuthStateChanged(getAuth(), (user) => {
            localStorage.setItem("user", JSON.stringify(user));
            if (user == null) dispatch({ type: 'LOGOUT' });
            else dispatch({ type: 'LOGIN', payload: user });
        });
        return () => unsubscriber();
    }, []);

    return (
        <UserContext.Provider value={{ ...state, dispatch }}>
            {children}
        </UserContext.Provider>
    );
}