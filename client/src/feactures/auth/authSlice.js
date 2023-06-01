import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginJWT, basiclogin } from "../../api/auth";


export const login = createAsyncThunk("auth/login", async (user) => {
  const response = await loginJWT(user);
  return response.data;
});

export const loginBasic = createAsyncThunk(
  "auth/basicLogin",
  async (user) => {
    const response = await basiclogin(user);
    return response.data;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("token") || null,
    user: JSON.parse(localStorage.getItem("user")) || null,
    isAuth: localStorage.getItem("isAuth") === "true" ? true : false,
  },
  reducers: {
    setAuthData: (state, action) => {
      console.log(action.payload)
      state.token = action.payload.accessToken;
      state.user = action.payload.user;
      state.isAuth = true;
      const { password, ...userWithoutPassword } = action.payload.user;
      localStorage.setItem("token", action.payload.accessToken);
      localStorage.setItem("user", JSON.stringify(userWithoutPassword));
      localStorage.setItem("isAuth", "true");
    },
    setAuhtBasic: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isAuth = true;

      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("isAuth", "true");
    },
    logout: (state) => {
      state.token = "";
      state.user = null;
      state.isAuth = false;

      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("isAuth");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        console.log("login",action.payload.user)
        return {
          ...state,
          token: action.payload.token,
          user: action.payload.user,
          isAuth: true,
        }
      })
      .addCase(login.rejected, (state, action) => {
          state.error = action.error.message;
      })
      .addCase(loginBasic.fulfilled, (state, action) => {
        console.log("basicLogin",action.payload.user)
        return {
          ...state,
          token: action.payload.token,
          user: action.payload.user,
          isAuth: true,
        }
      })
      .addCase(loginBasic.rejected, (state, action) => {
        state.error = action.error.message;
      })
  },
});

export const { setProfile, setAuthData, setAuhtBasic ,logout } = authSlice.actions;
export default authSlice.reducer;
