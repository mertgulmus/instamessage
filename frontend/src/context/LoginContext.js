import { createContext, useReducer } from 'react'

export const LoginContext = createContext()

export const loginReducer = (state, action) => {
    switch (action.type) {
        case 'SET_USER':
            return {
                user: action.payload
            }
        case 'LOGOUT':
            return {
                user: null
            }
        default:
            return state
    }
}

export const LoginContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(loginReducer, {
        user: null
    })

    return (
        <LoginContext.Provider value={{ ...state, dispatch }}>
            { children }
        </LoginContext.Provider>
    )
}
