// import { Status } from '../NewsPageSlice/types';

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}
export type AuthorizationParams = {
  open: boolean;
  login: boolean;
  username: string;
  password: string;
  fullName: string;
  value: any;
  status: Status;
  token: string;
};

export type FetchAuthorizationType = {
  _id: string;
  fullName: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  token: string;
};

export type FetchLoginParams = {
  email: string;
  password: string;
};
export type FetchRegisterParams = {
  email: string;
  fullName: string;
  password: string;
  avatarUrl?: string;
};
