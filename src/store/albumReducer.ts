import { backendServer } from '../consts';
import { SHOW_CARDS, ADD_STAR, FETCH_CARDS, REMOVE_STAR, HIDE_LOADER, SHOW_LOADER, FETCH_CARD_INFO } from './actionTypes';
import { DispatchLoader } from './loaderReducer';

export interface ICard {
  _id: string;
  imageUrl: string;
  titleRu: string;
  titleEng: string;
  price: string;
  star: boolean;
  size?: Array<string>;
  amount: Array<[string, number]>;
}

export interface IAlbumState {
  album: {
    cards: Array<ICard>;
    color: string;
  };
  show: boolean;
}

interface IAlbumAction {
  type: string;
  payload?: {
    cards: Array<ICard>;
    color: string;
  };
  cardId?: string;
  show?: boolean;
}

export type DispatchAlbum = (args: IAlbumAction) => IAlbumAction;

let cards: Array<ICard> = [];
const savedCards = localStorage.getItem('cards');
if (savedCards !== null) {
  cards = JSON.parse(savedCards);
}

const initialState: IAlbumState = {
  album: {
    cards: cards,
    color: '',
  },
  show: false,
};

export const albumReducer = (state: IAlbumState = initialState, action: IAlbumAction) => {
  switch (action.type) {
    case FETCH_CARDS:
      action.payload.cards.forEach((card: ICard) => {
        card.star = false;
      });
      localStorage.setItem('cards', JSON.stringify(action.payload.cards));
      return { ...state, album: action.payload };
    case SHOW_CARDS:
      return { ...state, show: action.show };
    case ADD_STAR:
      return {
        ...state,
        album: {
          cards: state.album.cards.map((card: ICard) => {
            if (card._id === action.cardId) {
              card.star = true;
            }
            return card;
          }),
          color: state.album.color,
        },
      };
    case REMOVE_STAR:
      return {
        ...state,
        album: {
          cards: state.album.cards.map((card: ICard) => {
            if (card._id === action.cardId) {
              card.star = false;
            }
            return card;
          }),
          color: state.album.color,
        },
      };
    default:
      return state;
  }
};

export function fetchCards(categoryName: string) {
  return async (dispatch: DispatchAlbum | DispatchLoader) => {
    try {
      dispatch({ type: SHOW_LOADER, payload: undefined, isLoading: true });
      const response = await fetch(`${backendServer}/${categoryName}`);
      const json = await response.json();
      dispatch({ type: FETCH_CARDS, payload: { cards: json, color: categoryName }, isLoading: undefined });
      dispatch({ type: HIDE_LOADER, payload: undefined, isLoading: false });
    } catch (e) {
      dispatch({ type: HIDE_LOADER, payload: undefined, isLoading: false });
    }
  };
}
export function addStar(id: string) {
  return (dispatch: DispatchAlbum) => {
    dispatch({
      type: ADD_STAR,
      cardId: id,
    });
  };
}

export function removeStar(id: string) {
  return (dispatch: DispatchAlbum) => {
    dispatch({
      type: REMOVE_STAR,
      cardId: id,
    });
  };
}
