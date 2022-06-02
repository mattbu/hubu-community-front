import { configureStore, createSlice } from '@reduxjs/toolkit'


const tester = createSlice({
    name: 'test',
    initialState: '리덕스 테스트 ㅋ'
})

const token = createSlice({
    name: 'token',
    initialState: '하하'
})

export default configureStore({
  reducer: {
    token: token.reducer,
    test: tester.reducer
  }
})