import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { IUser, Status, LoginRegisterPayload } from "../../../types/types";

const BASE_URL = import.meta.env.VITE_BASE_URL;

interface AuthState {
  user: IUser | null;
  token: string | null;
  status: Status;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem('token') || null,
  status: "idle",  
  error: null,
};



export const loginUser = createAsyncThunk<IUser, LoginRegisterPayload, { rejectValue: string }>(
  "user/loginUser", 
  async ({ userName, password }, thunkAPI) => {
    try {
      const response = await axios.post(`${BASE_URL}/login`, { userName, password });
      localStorage.setItem("token", response.data.user.token); 
      return response.data.user; 
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message); 
    }
  }
);

export const registerUser = createAsyncThunk<IUser, LoginRegisterPayload, { rejectValue: string }>(
  "user/registerUser", 
  async ({ userName, password, organization }, thunkAPI) => {
    try {
      const response = await axios.post(`${BASE_URL}/register`, { userName, password, organization });
      localStorage.setItem("token", response.data.user.token); 
      return response.data.user; 
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message); 
    }
  }
);

export const fetchUserByToken = createAsyncThunk<IUser, void, { rejectValue: string }>(
  "auth/fetchUserByToken", 
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/auth/user`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      return response.data.data;
    } catch (error: any) {
      const message = error.response?.data?.message || "Failed to fetch user";
      return rejectWithValue(message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.user = null;
      state.status = "idle";
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => { state.status = "loading"; })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<IUser>) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(registerUser.pending, (state) => { state.status = "loading"; })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<IUser>) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(fetchUserByToken.pending, (state) => { state.status = "loading"; })
      .addCase(fetchUserByToken.fulfilled, (state, action: PayloadAction<IUser>) => {
        state.user = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchUserByToken.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export const { logoutUser } = userSlice.actions;
export default userSlice.reducer;
