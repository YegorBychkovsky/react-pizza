import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import authAxios from '../../../api/authAxios';
// import { Status } from '../NewsPageSlice/types';
import {
  AuthorizationParams,
  FetchAuthorizationType,
  FetchLoginParams,
  FetchRegisterParams,
  Status,
} from './types';

const initialState: AuthorizationParams = {
  open: false,
  login: false,
  username: '',
  password: '',
  fullName: '',
  value: undefined,
  status: Status.LOADING,
  token: '',
};

export const fetchingLogin = createAsyncThunk<FetchAuthorizationType, FetchLoginParams>(
  'authorization/fetchLogin',
  async (params) => {
    const { email, password } = params;
    const { data } = await authAxios.post<FetchAuthorizationType>('/auth/login', {
      email,
      password,
    });

    return data;
  },
);

export const fetchingRegister = createAsyncThunk<FetchAuthorizationType, FetchRegisterParams>(
  'authorization/fetchRegister',
  async (params) => {
    const { email, password, fullName } = params;
    const { data } = await authAxios.post<FetchAuthorizationType>('/auth/Register', {
      email,
      password,
      fullName,
    });

    return data;
  },
);

export const AuthorizationSlice = createSlice({
  name: 'authorization',
  initialState,
  reducers: {
    changeOpenState(state, action: PayloadAction<boolean>) {
      state.open = action.payload;
    },
    changeLoginState(state, action: PayloadAction<boolean>) {
      state.login = action.payload;
    },
    addUsername(state, action: PayloadAction<string>) {
      state.username = action.payload;
    },
    addPassword(state, action: PayloadAction<string>) {
      state.password = action.payload;
    },
    addFullName(state, action: PayloadAction<string>) {
      state.fullName = action.payload;
    },
    addValue(state, action: PayloadAction<any>) {
      state.value = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchingLogin.pending, (state) => {
      localStorage.setItem('token', ``);
      localStorage.setItem('username', ``);
      state.login = false;
    });
    builder.addCase(fetchingLogin.fulfilled, (state, action) => {
      localStorage.setItem('token', `${action.payload.token}`);
      localStorage.setItem('username', `${action.payload.fullName}`);
      state.login = true;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchingLogin.rejected, (state) => {
      state.status = Status.ERROR;
      localStorage.setItem('token', ``);
      localStorage.setItem('username', ``);
      state.login = false;
    });

    builder.addCase(fetchingRegister.pending, (state) => {
      state.status = Status.LOADING;
      localStorage.setItem('token', ``);
      localStorage.setItem('username', ``);
      state.login = false;
    });
    builder.addCase(fetchingRegister.fulfilled, (state, action) => {
      localStorage.setItem('token', `${action.payload.token}`);
      localStorage.setItem('username', `${action.payload.fullName}`);
      state.login = true;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchingRegister.rejected, (state) => {
      state.status = Status.ERROR;
      localStorage.setItem('token', ``);
      localStorage.setItem('username', ``);
      state.login = false;
    });
  },
});

export const {
  changeOpenState,
  changeLoginState,
  addUsername,
  addPassword,
  addFullName,
  addValue,
} = AuthorizationSlice.actions;

export default AuthorizationSlice.reducer;
