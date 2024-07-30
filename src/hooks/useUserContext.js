import { useContext } from "react"
import { UserContext } from "../contexts/UserContext"

export const useUserContext = () => {
    const context = useContext(UserContext);
    if (!context) throw new Error("useUserContext must be inside a UserContextProvider");
    return context;
}