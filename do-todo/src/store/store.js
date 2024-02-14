import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "../slices/CounterSlice";
import todoQuery from "../query/todoQuery";

const store = configureStore({
  reducer: {
    counter: counterSlice,
    [todoQuery.reducerPath]: todoQuery.reducer,
  },
  middleware: (getDefaultMiddleWare) =>
    getDefaultMiddleWare().concat(todoQuery.middleware),
});

export default store;
