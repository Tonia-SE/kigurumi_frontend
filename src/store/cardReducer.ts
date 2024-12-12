import { backendServer } from '../consts';
import { FETCH_CARD_INFO, HIDE_LOADER, SET_SIZE, SHOW_LOADER } from './actionTypes';
import { DispatchAlbum } from './albumReducer';
import { DispatchLoader } from './loaderReducer';

export interface ICardState {
  _id: string;
  category: string;
  imageUrl: string;
  titleEng: string;
  titleRu: string;
  price: string;
  size?: Array<string>;
  amount: Array<[string, number]>;
  currentSize?: string;
}

interface ICardAction {
  type: string;
  payload?: {
    amount: Array<[string, number]>;
    _id: string;
    category: string;
    imageUrl: string;
    titleEng: string;
    titleRu: string;
    price: string;
  };
  currentSize?: string;
}

export type DispatchCard = (args: ICardAction) => ICardAction;

const initialState: ICardState = {
  amount: [],
  _id: '',
  category: '',
  imageUrl: '',
  titleRu: '',
  titleEng: '',
  price: '',
  currentSize: '',
};

export function fetchCard(cardId: string) {
  if (cardId) {
    return async (dispatch: DispatchAlbum | DispatchLoader) => {
      try {
        dispatch({ type: SHOW_LOADER, payload: undefined, isLoading: true });
        const response = await fetch(`${backendServer}/cards?_id=${cardId}`);
        const json = await response.json();
        dispatch({ type: FETCH_CARD_INFO, payload: json[0], isLoading: undefined });
        dispatch({ type: HIDE_LOADER, payload: undefined, isLoading: false });
      } catch (e) {
        dispatch({ type: HIDE_LOADER, payload: undefined, isLoading: false });
      }
    };
  }
}

export const cardReducer = (state: ICardState = initialState, action: ICardAction) => {
  switch (action.type) {
    case FETCH_CARD_INFO:
      const currentSize = state.currentSize;
      state = { ...action.payload };
      state.currentSize = currentSize;
      return { ...state };
    case SET_SIZE:
      return { ...state, currentSize: action.currentSize };
    default:
      return state;
  }
};

export function setSize(size: string) {
  return (dispatch: DispatchCard) => {
    dispatch({ type: SET_SIZE, currentSize: size });
  };
}
