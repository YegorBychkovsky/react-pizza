import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { initialState, Pizza, SearchPizzaPrams, Status } from './type';

export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaPrams>(
  //<CartItem[], Record<string, string>> Прикол в том, что createAsyncThunk может иметь 2 аргумента.
  //В данном случае: CartItem[] и Record<string, string>.
  //Первый это тип, что функция вернёт в data, а второй это тип, что функия принимает.

  'pizza/fetchPizzasStatus',
  async (params) => {
    //params: Record<string, string> Это тоже самое!
    //Record<string, string> означает, что все значения это строчки Пример:(key: sortBy, type: string)
    const { sortBy, order, category, search, currentPage } = params;
    const { data } = await axios.get<Pizza[]>( //axios типизирую отдельно (это необязательно)
      `https://63d021598a780ae6e6844e27.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
    );
    return data; //return data as CartItem[] Это тоже самое!
  },
);

export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<Pizza[]>) {
      state.items = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state, action) => {
      state.status = Status.LOADING;
      state.items = [];
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchPizzas.rejected, (state, action) => {
      state.status = Status.ERROR;
      state.items = [];
    });
  },
  // extraReducers: {
  //   [fetchPizzas.pending]: (state) => {
  //     state.status = 'loading';
  //     state.items = [];
  //   },
  //   [fetchPizzas.fulfilled]: (state, action) => {
  //     state.items = action.payload;
  //     state.status = 'success';
  //   },
  //   [fetchPizzas.rejected]: (state, action) => {
  //     console.log(12);
  //     state.status = 'error';
  //     state.items = [];
  //   },
  // },
});

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
