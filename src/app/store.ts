import {fitnessApi} from './api'
import {configureStore} from "@reduxjs/toolkit";

export const store = configureStore({
    reducer: {
        [fitnessApi.reducerPath]: fitnessApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(fitnessApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>

export default store