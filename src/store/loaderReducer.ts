import { HIDE_LOADER, SHOW_LOADER } from './actionTypes';

export interface ILoaderState {
  isLoading: boolean;
}

interface ILoaderAction {
  type: string;
  isLoading: boolean;
}

const initialState: ILoaderState = {
  isLoading: false,
};

export type DispatchLoader = (args: ILoaderAction) => ILoaderAction;

export const loaderReducer = (state: ILoaderState = initialState, action: ILoaderAction) => {
  switch (action.type) {
    case SHOW_LOADER:
      return { ...state, isLoading: action.isLoading };
    case HIDE_LOADER:
      return { ...state, isLoading: action.isLoading };
    default:
      return state;
  }
};
