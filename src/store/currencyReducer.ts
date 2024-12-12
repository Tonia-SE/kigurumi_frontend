import { rateUrl } from '../consts';
import { HIDE_LOADER, SET_CURRENCY, SHOW_LOADER } from './actionTypes';
import { DispatchLoader } from './loaderReducer';

export interface ICurrencyState {
  info: {
    value: string;
    rate: number;
  };
}

interface ICurrencyAction {
  type: string;
  payload: {
    value: string;
    rate: number;
  };
}

export type DispatchCurrency = (args: ICurrencyAction) => ICurrencyAction;

let initialState: ICurrencyState = {
  info: {
    value: '$',
    rate: 1,
  },
};

if (localStorage.getItem('currency') !== null) {
  initialState.info = JSON.parse(localStorage.getItem('currency'));
}

export const currencyReducer = (state: ICurrencyState = initialState, action: ICurrencyAction) => {
  switch (action.type) {
    case SET_CURRENCY:
      localStorage.setItem('currency', JSON.stringify(action.payload));
      return { ...state, info: action.payload };
    default:
      return state;
  }
};

export function setCurrency(value: string) {
  return async (dispatch: DispatchCurrency | DispatchLoader) => {
    try {
      dispatch({ type: SHOW_LOADER, payload: undefined, isLoading: true });
      let rate = 1;
      if (value !== '$') {
        const response = await fetch(rateUrl);
        const json = await response.json();
        rate = json.Valute.USD.Value;
      }
      dispatch({
        type: SET_CURRENCY,
        payload: {
          value: value,
          rate: rate,
        },
        isLoading: undefined,
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
