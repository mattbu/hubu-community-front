import { createSlice } from '@reduxjs/toolkit'

const user = createSlice({
    name: 'userReducer',
    initialState: {},
    reducers: {
        setUserInfo: (state, action) => {
            state = action.payload
            return state
        }
    }
})

export const { setUserInfo } = user.actions

export default user.reducer