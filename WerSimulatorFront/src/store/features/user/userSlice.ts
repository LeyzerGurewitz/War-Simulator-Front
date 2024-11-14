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
      const errorMessage = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(errorMessage);
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
      // טיפול בשגיאה
      const errorMessage = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const fetchUserByTokenAttack = createAsyncThunk(
  "auth/fetchUserByTokenAttack",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/auth/user/attack`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Failed to fetch user";
      return rejectWithValue(errorMessage);
    }
  }
);

export const fetchUserByTokenDefense = createAsyncThunk(
  "auth/fetchUserByTokenDefense",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/auth/user/defense`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Failed to fetch user";
      return rejectWithValue(errorMessage);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.user = null;
      state.token = null;
      state.status = "idle";
      state.error = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<IUser>) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<IUser>) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(fetchUserByTokenAttack.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserByTokenAttack.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(fetchUserByTokenAttack.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(fetchUserByTokenDefense.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserByTokenDefense.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(fetchUserByTokenDefense.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export const { logoutUser } = userSlice.actions;
export default userSlice.reducer;
