import { createContext, useReducer } from "react";

export const ThemeContext = createContext()
function themeReducer(state, action) {
    switch (action.type) {
        case "CHANGE_COLOR":
            return {
                ...state, color: action.payload.color
            }
        case "CHANGE_BG":
            return {
                ...state, backgroundColor: action.payload.backgroundColor
            }
        default:
            return state
    }
    // 562B08
}
export function ThemeProvider({ children }) {
    const [state, dispatch] = useReducer(themeReducer, {
        color: "brown", backgroundColor: "#FAEAB1"
    })
    function changeColor(color) {
        dispatch({ type: "CHANGE_COLOR", payload: {...state, color } })
    }
    function changeBackground(backgroundColor) {
        dispatch({ type: "CHANGE_BG",payload: { ...state, backgroundColor }  })
    }
    return (
        <ThemeContext.Provider value={{ ...state, changeColor }}>
            {children}
        </ThemeContext.Provider>
    )
}
