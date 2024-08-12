import {configureStore} from "@reduxjs/toolkit"
import cardReducer from "../features/cardsSlice.js"

export const store = configureStore({
    reducer:cardReducer
})