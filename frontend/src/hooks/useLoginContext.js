import { LoginContext } from "../context/LoginContext"
import { useContext } from "react"

export const useLoginContext = () => {
    const context = useContext(LoginContext)

    if(!context) {
        throw Error('useLoginContext must be used inside a LoginProvider')
    }

    return context
};
