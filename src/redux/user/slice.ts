import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios';

interface UserState {
  loading: boolean;
  error: string | null;
  token: string | null;
}

const initialState: UserState = {
  loading: false,
  error: null,
  token: null
}

export const signIn = createAsyncThunk(
  'user/signIn',
  async (paramaters: {
    email: string;
    password: string;
  }, thunkAPI) => {
    const { data } = await axios.post(
      `http://123.56.149.216:8080/auth/login`,
      {
        email: paramaters.email,
        password: paramaters.password
      }
    )
    return data.token
  }
)

export const userSlice = createSlice({
  name: 'user',
  // 初始化数据
  initialState,
  reducers: {
    logOut: (state) => {
      state.loading = false
      state.error = null
      state.token = null
    }
  },
  // 自动映射
  extraReducers: {
    [signIn.pending.type]: (state) => {
      // return { ...state, loading: true };
      state.loading = true;
    },
    [signIn.fulfilled.type]: (state, action) => {
      state.token = action.payload;
      state.loading = false;
      state.error = null;
    },
    [signIn.rejected.type]: (state, action: PayloadAction<string | null>) => {
      //   const ddd = action.payload;
      state.loading = false;
      state.error = action.payload;
    },
  }
})