import { HIDE_REGFORM_MESSAGE, SHOW_REGFORM_MESSAGE } from './actionTypes';
import { alertTimeout } from '../consts';

export interface IRegFormMessageState {
  text?: string;
  isOn: boolean;
  className?: string;
  id?: string;
}

interface IRegFormMessageAction {
  type: string;
  text?: string;
  className?: string;
  id?: string;
}

export type DispatchRegFormMessage = (args: IRegFormMessageAction) => IRegFormMessageAction;

const initialState: IRegFormMessageState = {
  text: '',
  isOn: false,
  className: 'my-danger',
  id: '',
};

export const regFormMessageReducer = (state: IRegFormMessageState = initialState, action: IRegFormMessageAction) => {
  switch (action.type) {
    case SHOW_REGFORM_MESSAGE:
      return { ...state, text: action.text, isOn: true, className: action.className, id: action.id };
    case HIDE_REGFORM_MESSAGE:
      return { ...state, isOn: false };
    default:
      return state;
  }
};

export function showRegFormMessage(text: string, className: string = 'my-danger', id: string) {
  return (dispatch: DispatchRegFormMessage) => {
    dispatch({
      type: SHOW_REGFORM_MESSAGE,
      text: text,
      className: className,
      id: id,
    });
    setTimeout(() => {
      dispatch({ type: HIDE_REGFORM_MESSAGE });
    }, alertTimeout);
  };
}
