import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button,
} from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  addFullName,
  addPassword,
  addUsername,
  changeLoginState,
  changeOpenState,
  fetchingLogin,
  fetchingRegister,
} from '../redux/slices/authorization/slice';
// import { rightUsername, rightPassword } from './Header';

// import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '../redux/store';
import {
  usernameSelect,
  passwordSelect,
  fullNameSelect,
  openSelect,
  loginSelect,
} from '../redux/slices/authorization/exports';

const DialogWindow: React.FC = ({}) => {
  const [openRegister, setOpenRegister] = React.useState(false);

  const [login, setLogin] = React.useState(false);
  const loginRedux = useSelector(loginSelect);

  // const { t } = useTranslation();
  const token = localStorage.getItem('token');
  const dispatch = useDispatch();
  const appDispatch = useAppDispatch();

  const username = useSelector(usernameSelect);
  const password = useSelector(passwordSelect);
  const fullName = useSelector(fullNameSelect);
  const open = useSelector(openSelect);

  const inputSetEmail = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(addUsername(event.target.value));
  }, []);

  const inputSetPassword = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(addPassword(event.target.value));
  }, []);
  const inputSetFullName = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(addFullName(event.target.value));
  }, []);

  const handleCloseLogin = React.useCallback(() => {
    dispatch(changeOpenState(false));
  }, []);
  const handleCloseRegister = React.useCallback(() => {
    setOpenRegister(false);
  }, []);

  const handleOpenRegister = React.useCallback(() => {
    setOpenRegister(true);
    dispatch(changeOpenState(false));
  }, []);
  const handleOpenLogin = React.useCallback(() => {
    setOpenRegister(false);
    dispatch(changeOpenState(true));
  }, []);

  const handleRegister = React.useCallback(() => {
    const email = username;
    appDispatch(fetchingRegister({ email, password, fullName }));

    setOpenRegister(false);
    dispatch(changeOpenState(false));
  }, [username, password]);

  const handleLogIn = React.useCallback(() => {
    localStorage.setItem('token', `token`);
    localStorage.setItem('username', `admin`);

    const email = username;
    appDispatch(fetchingLogin({ email, password }));

    dispatch(changeLoginState(true));
    dispatch(changeOpenState(false));
  }, [username, password]);
  return (
    <>
      {openRegister ? (
        <Dialog
          open={openRegister}
          onClose={handleCloseRegister}
          aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Register</DialogTitle>
          <DialogContent>
            <DialogContentText>Here you can register!</DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="username"
              label="email"
              type="username"
              fullWidth
              onChange={inputSetEmail}
            />
            <TextField
              autoFocus
              margin="dense"
              id="fullName"
              label="username"
              type="fullName"
              fullWidth
              onChange={inputSetFullName}
            />
            <TextField
              autoFocus
              margin="dense"
              id="password"
              label="password"
              type="password"
              fullWidth
              onChange={inputSetPassword}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseRegister} color="primary">
              cancel
            </Button>
            <Button onClick={handleRegister} color="primary">
              register
            </Button>
            <Button onClick={handleOpenLogin} color="primary">
              logIn
            </Button>
          </DialogActions>
        </Dialog>
      ) : (
        <Dialog open={open} onClose={handleCloseLogin} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">LogIn</DialogTitle>
          <DialogContent>
            <DialogContentText>Here you can LogIn!</DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="username"
              label="email"
              type="username"
              fullWidth
              onChange={inputSetEmail}
            />
            <TextField
              autoFocus
              margin="dense"
              id="password"
              label="password"
              type="password"
              fullWidth
              onChange={inputSetPassword}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseLogin} color="primary">
              cancel
            </Button>
            <Button onClick={handleLogIn} color="primary">
              logIn
            </Button>
            <Button onClick={handleOpenRegister} color="primary">
              register
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};
export default DialogWindow;
