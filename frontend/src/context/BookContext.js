import { createContext, useReducer } from 'react'

export const BookContext = createContext()

export const booksReducer = (state, action) => {
    switch (action.type){
        case 'SET_BOOK':
            return {
                books: action.payload
            }
            case 'CREATE_BOOK':
                return {
                    books: [action.payload, ...state.books]
                }

            default:
                return state
    }
}

export const BookContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(booksReducer, {
        books: []
    })
    
    return (
        <BookContext.Provider value={{...state, dispatch}}>
            {children}
        </BookContext.Provider>
    )
}
