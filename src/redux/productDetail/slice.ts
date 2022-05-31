import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios';

interface ProductDetailState {
  loading: boolean;
  error: string | null;
  data: any;
}

const initialState: ProductDetailState = {
  loading: true,
  error: null,
  data: null
}

export const getProductDetail = createAsyncThunk(
  'productDetail/getProductDetail',
  async (touristRouteId: string, thunkAPI) => {
    // 手动控制数据流
    // thunkAPI.dispatch(productDetailSlice.actions.fetchStart())
    const { data } = await axios.get(`http://123.56.149.216:8080/api/touristRoutes/${touristRouteId}`)
    return data
  }
)

export const productDetailSlice = createSlice({
  name: 'productDetail',
  // 初始化数据
  initialState,
  reducers: {
    // fetchStart: (state) => {
    //   // return {...state, loading: true}
    //   state.loading = true
    // },
    // fetchSuccess: (state, action) => {
    //   state.data = action.payload;
    //   state.loading = false
    //   state.error = null
    // },
    // fetchFail: (state, action: PayloadAction<string|null>) => {
    //   const ddd = action.payload
    //   state.loading = false
    //   state.error = action.payload
    // }
  },
  // 自动映射
  extraReducers: {
    [getProductDetail.pending.type]: (state) => {
      // return { ...state, loading: true };
      state.loading = true;
    },
    [getProductDetail.fulfilled.type]: (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = null;
    },
    [getProductDetail.rejected.type]: (state, action: PayloadAction<string | null>) => {
      //   const ddd = action.payload;
      state.loading = false;
      state.error = action.payload;
    },
  }
})