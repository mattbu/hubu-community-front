import { configureStore, createSlice } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: "root",
  storage,
};

const token = createSlice({
    name: 'token',
    initialState: '토큰',
    reducers: {
        setToken(state, action) {
            return action.payload
        }
    }
})

export const {setToken} = token.actions

export default configureStore({
  reducer: {
    token: token.reducer
  }
})