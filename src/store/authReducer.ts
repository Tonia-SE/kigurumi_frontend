import { backendServer } from '../consts';
import { HIDE_LOADER, LOGIN_USER, LOGOUT_USER, REGISTER_USER, SET_NAME, SHOW_LOADER } from './actionTypes';
import { showRegFormMessage } from './regFormsMessageReducer';

export interface IAuthState {
  isRegristred?: boolean;
  userName: string;
  isLoggedIn: boolean;
  errorText: string;
}

interface IAuthAction {
  type: string;
  payload: {
    userName: string;
    errorText: string;
    isLoggedIn: boolean;
    isRegristred?: boolean;
  };
}

export type DispatchAuth = (args: IAuthAction) => IAuthAction;

const initialState: IAuthState = {
  userName: '',
  isLoggedIn: false,
  errorText: '',
};

let authState = { ...initialState };
const savedState = localStorage.getItem('authstate');
if (savedState !== null) {
  authState = JSON.parse(savedState);
}

export const authReducer = (state: IAuthState = authState, action: IAuthAction) => {
  switch (action.type) {
    case LOGIN_USER:
      localStorage.setItem('authstate', JSON.stringify(action.payload));
      return { ...action.payload };
    case LOGOUT_USER:
      localStorage.removeItem('authstate');
      return { ...initialState };
    case REGISTER_USER:
      return { ...action.payload };
    default:
      return state;
  }
};

export function loginUser(user: string, password: string, messageSuccess: string, messageError: string) {
  return async (dispatch: any) => {
    let isLoggendIn = false;
    try {
      dispatch({ type: SHOW_LOADER, payload: undefined, isLoading: true });
      const data = btoa(JSON.stringify({ user: user, password: password }));
      const response = await fetch(`${backendServer}/auth/login`, {
        method: 'POST',
        cache: 'no-cache',
        body: JSON.stringify({ data: data }),
        headers: {
          'Content-Type': 'application/json',
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
      });
      const json = await response.json();
      if (response.status === 200) {
        dispatch(showRegFormMessage(messageSuccess, 'my-success', 'none'));
        isLoggendIn = true;
        dispatch({ type: SET_NAME, name: user });
      } else if (response.status === 403) {
        dispatch(showRegFormMessage(messageError, 'my-danger', 'none'));
      }
      dispatch({
        type: LOGIN_USER,
        payload: {
          userName: user,
          errorText: json.result,
          isLoggedIn: isLoggendIn,
        },
      });
      setTimeout(() => {
        dispatch({ type: HIDE_LOADER, payload: undefined, isLoading: false });
      }, 300);
    } catch (e) {
      setTimeout(() => {
        dispatch({ type: HIDE_LOADER, payload: undefined, isLoading: false });
      }, 300);
    }
  };
}

export function regUser(user: string, password: string, messageSuccess: string, messageError: string) {
  return async (dispatch: any) => {
    let isRegistred = false;
    try {
      dispatch({ type: SHOW_LOADER, payload: undefined, isLoading: true });
      const data = btoa(JSON.stringify({ user: user, password: password }));
      const response = await fetch(`${backendServer}/auth/register`, {
        method: 'POST',
        cache: 'no-cache',
        body: JSON.stringify({ data: data }),
        headers: {
          'Content-Type': 'application/json',
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
      });
      const json = await response.json();
      if (response.status === 200) {
        isRegistred = true;
        dispatch(showRegFormMessage(messageSuccess, 'my-success', 'none'));
      } else if (response.status === 403) {
        dispatch(showRegFormMessage(messageError, 'my-danger', 'none'));
      }
      dispatch({
        type: REGISTER_USER,
        payload: {
          userName: user,
          errorText: json.result,
          isLoggedIn: false,
          isRegristred: isRegistred,
        },
      });
      setTimeout(() => {
        dispatch({ type: HIDE_LOADER, payload: undefined, isLoading: false });
      }, 300);
    } catch (e) {
      setTimeout(() => {
        dispatch({ type: HIDE_LOADER, payload: undefined, isLoading: false });
      }, 300);
    }
  };
}
