import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counterSlice",
  initialState: { value: 0 },
  reducers: {
    increaseByOne(state) {
      state.value++;
    },
    increaseByFive(state, action) {
      state.value = state.value + action.payload;
    },
    decreaseByOne(state) {
      state.value--;
    },
    decreaseByFive(state, action) {
      state.value = state.value - action.payload;
    },
  },
});

export const { increaseByOne, decreaseByFive, decreaseByOne, increaseByFive } =
  counterSlice.actions;

export default counterSlice.reducer;
