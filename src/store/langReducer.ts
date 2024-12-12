import { SET_LANG } from './actionTypes';

export interface ILangState {
  value: string;
}

interface ILangAction {
  type: string;
  value: string;
}

export type DispatchLang = (args: ILangAction) => ILangAction;

let initialState: ILangState = {
  value: 'eng',
};

if (localStorage.getItem('Lang') !== null) {
  initialState.value = JSON.parse(localStorage.getItem('Lang'));
}

export const langReducer = (state: ILangState = initialState, action: ILangAction) => {
  switch (action.type) {
    case SET_LANG:
      localStorage.setItem('Lang', JSON.stringify(action.value));
      return { ...state, value: action.value };
    default:
      return state;
  }
};

export function changeLang(value: string) {
  return (dispatch: DispatchLang) => {
    if (value !== 'eng') {
      dispatch({ type: SET_LANG, value: value });
    } else {
      dispatch({ type: SET_LANG, value: 'eng' });
    }
  };
}
