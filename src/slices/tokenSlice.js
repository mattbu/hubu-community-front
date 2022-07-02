import { createSlice } from '@reduxjs/toolkit'

const token = createSlice({
    name: 'tokenReducer',
    initialState: null,
    reducers: {
        setToken: (state, action) => {
            state = action.payload
            return state
        }
    }
})

export const { setToken } = token.actions

export default token.reducer