import { configureStore } from "@reduxjs/toolkit";
import testReducer from '../slices/testSlice';
import { createWrapper } from 'next-redux-wrapper'

const rootReducer = {
    TEST: testReducer
}
export const makeStore = () =>
    configureStore({
        reducer: rootReducer,
    });

export const wrapper = createWrapper(makeStore, { debug: false })