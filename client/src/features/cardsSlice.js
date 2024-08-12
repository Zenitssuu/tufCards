import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    cards:[]
}

const cardSlices = createSlice({
    name:"cards",
    initialState,
    reducers:{
        setCards: (state,action) => {
            state.cards = action.payload
        },
        addCards: (state,action)=>{
            state.cards = state.cards.push(action.payload)
        }
    }
})

export const {setCards, addCards} = cardSlices.actions

export default cardSlices.reducer