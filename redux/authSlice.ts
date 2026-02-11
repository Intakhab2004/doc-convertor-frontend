import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type SignUpData = {
  userId: string;
  email: string;
};

type AuthState = {
  signUpData: SignUpData | null;
  user: any | null;          
};

const initialState: AuthState = {
  signUpData: null,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setSignUpData: (state, action: PayloadAction<SignUpData>) => {
      state.signUpData = action.payload;
    },

    clearSignUpData: (state) => {
      state.signUpData = null;
    },
  },
});

export const { setSignUpData, clearSignUpData,}=authSlice.actions;
export default authSlice.reducer;
