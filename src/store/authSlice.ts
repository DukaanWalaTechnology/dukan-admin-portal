import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the shape of the authentication state
interface AuthState {
  status: boolean;
  userData: any; 
  token: string | null;
}

// Define initial state with types
const initialState: AuthState = {
  status: false,
  userData: null,
  token: localStorage.getItem("token"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.status = true;
      state.userData = action.payload.userData;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.status = false;
      state.userData = null;
      state.token = null;
    },
  },
});

export default authSlice.reducer;
export const { login, logout } = authSlice.actions;
