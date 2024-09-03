import { BookContext } from "../context/BookContext";
import { useContext } from "react";

export const useBooksContext = () => {
    const context = useContext(BookContext)

    if(!context){
        throw Error('useBooksContext must be inside a BooksCOntextProvider')
    }
    return context
}

//NOW EVERYTIME WE WANT TO USE ANY BOOK DATA, WE CAN JUST INVOKE THIS HOOK
//IT WILL UPDATE OUR GLOBAL CONTEXT, INSTEAD OF A LOCAL STATE