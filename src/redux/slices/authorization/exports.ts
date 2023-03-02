import { RootState } from '../../store';

export const openSelect = (state: RootState) => state.authorization.open;
export const loginSelect = (state: RootState) => state.authorization.login;
export const usernameSelect = (state: RootState) => state.authorization.username;
export const passwordSelect = (state: RootState) => state.authorization.password;
export const valueSelect = (state: RootState) => state.authorization.value;
export const fullNameSelect = (state: RootState) => state.authorization.fullName;
export const tokenSelect = (state: RootState) => state.authorization.token;
