import { FETCH_CATEGORIES, HIDE_LOADER, SHOW_LOADER } from './actionTypes';
import { backendServer } from '../consts';
import { DispatchLoader } from './loaderReducer';

export interface ICategory {
  _id: string;
  titleEng: string;
  titleRu: string;
  color: string;
  __v: number;
}

export interface ICategoryState {
  fetchedCategoires: Array<ICategory>;
}

interface ICategoryAction {
  type: string;
  payload: Array<ICategory>;
}

export type DispatchCategory = (args: ICategoryAction) => ICategoryAction;

const initialState: ICategoryState = {
  fetchedCategoires: [],
};
export const controlsReducer = (state: ICategoryState = initialState, action: ICategoryAction) => {
  switch (action.type) {
    case FETCH_CATEGORIES:
      return { ...state, fetchedCategoires: action.payload };
    default:
      return state;
  }
};

export function fetchCategories() {
  return async (dispatch: DispatchCategory | DispatchLoader) => {
    try {
      dispatch({ type: SHOW_LOADER, payload: undefined, isLoading: true });
      const response = await fetch(`${backendServer}/categories`);
      const json = await response.json();
      dispatch({ type: FETCH_CATEGORIES, payload: json, isLoading: undefined });
      dispatch({ type: HIDE_LOADER, payload: undefined, isLoading: false });
    } catch (e) {}
  };
}
