import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getProducts, getProduct } from './api';

export const fetchProducts = createAsyncThunk('cars/fetchProducts', async () => {
  const response = await getProducts();
  return response.data;
});

export const fetchProduct = createAsyncThunk('cars/fetchProduct', async (id) => {
  const response = await getProduct(id);
  return response.data;
});


const productsSlice = createSlice({
  name: 'cars',
  initialState: {
    data: [],
    backUpData: [],
    productDetail: {},
    loading: false,
    error: null,
    openDetailPage: false,
    basket: []
  },
  reducers: {
    changeProductList: (state, action) => {
      state.data = action.payload
    },
    setBackUpData: (state, action) => {
      state.backUpData = action.payload
    },
    controlDetailPage: (state, action) => {
      state.openDetailPage = action.payload
    },
    addToCart: (state, action) => {
      state.basket = action.payload
    },
    removeToCart: (state, action) => {
      state.basket = action.payload
    },
    saveBasket: (state, action) => {
      state.basket = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.productDetail = action.payload;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { changeProductList, selectedProductBrand, setBackUpData, controlDetailPage, addToCart, removeToCart, saveBasket } = productsSlice.actions

export default productsSlice.reducer;
