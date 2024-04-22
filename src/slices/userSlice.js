import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
};
const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    newname(state, action) {
      state.name = action.payload;
    },
  },
});
export default userSlice.reducer;
export const { newname } = userSlice.actions;
