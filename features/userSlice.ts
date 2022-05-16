import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { userService } from "services";
import { IUserInfo } from "types/user.type";

const userSlice = createSlice({
  name: 'user',
  initialState: {
    data: null as IUserInfo | null,
  },
  reducers: {
    addUserInfo(state: any, action: PayloadAction<IUserInfo | undefined>) {
      state.data = action.payload;
    }
  }
});

export const {addUserInfo} = userSlice.actions;
export default userSlice.reducer;