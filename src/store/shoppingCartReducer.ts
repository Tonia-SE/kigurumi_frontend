import { backendServer } from '../consts';
import { ADD_TO_SHOPCART, REMOVE_FROM_CART, SET_QUANTITY, CLEAR_CART } from './actionTypes';
import { showAlert } from './messageReducer';

export interface IShopCartState {
  positions: Array<IPosition>;
}

export interface IPosition {
  id: string;
  size: string;
  quantity: number;
  titleEng?: string;
  titleRu?: string;
  imageUrl?: string;
  price?: number;
}

interface IShopCartAction {
  type: string;
  payload: {
    id: string;
    size: string;
    quantity: number;
    titleEng?: string;
    titleRu?: string;
    imageUrl?: string;
    price?: number;
  };
}

export type DispatchShopCart = (args: IShopCartAction) => IShopCartAction;

const initialState: IShopCartState = {
  positions: [],
};

let savedState = { ...initialState };

const savedShopCart = localStorage.getItem('shopCart');
if (savedShopCart !== null) {
  savedState.positions = JSON.parse(savedShopCart);
}

export const shopCartReducer = (state: IShopCartState = savedState, action: IShopCartAction) => {
  switch (action.type) {
    case ADD_TO_SHOPCART:
      const isPositionAlradyExists = state.positions.find((position: IPosition) => {
        if (position.id === action.payload.id && position.size === action.payload.size) {
          return true;
        }
        return false;
      });
      if (isPositionAlradyExists === undefined) {
        state.positions.push(action.payload);
      }
      localStorage.setItem('shopCart', JSON.stringify(state.positions));
      return { ...state, positions: state.positions };

    case SET_QUANTITY:
      const updatedPositions = state.positions.map((position: IPosition) => {
        if (position.id !== action.payload.id || position.size !== action.payload.size) {
          return position;
        } else {
          return { ...position, quantity: action.payload.quantity };
        }
      });
      localStorage.setItem('shopCart', JSON.stringify(updatedPositions));
      return { ...state, positions: updatedPositions };

    case REMOVE_FROM_CART:
      const afterDelPositions = state.positions.filter((position: IPosition) => {
        if (position.id === action.payload.id && position.size === action.payload.size) {
          return false;
        }
        return true;
      });
      localStorage.setItem('shopCart', JSON.stringify(afterDelPositions));
      return { ...state, positions: afterDelPositions };

    case CLEAR_CART:
      return { ...state, positions: [] };

    default:
      return state;
  }
};

export function setQuantity(quantity: number, key: string) {
  const [id, size] = key.split('_');
  return (dispatch: DispatchShopCart) => {
    if (quantity >= 0) {
      dispatch({
        type: SET_QUANTITY,
        payload: {
          id: id,
          size: size,
          quantity: quantity,
        },
      });
    } else {
    }
  };
}

export function addPosition(id: string, size: string, currentPositions: Array<IPosition>, lang: string) {
  if (size !== 'SIZE' && size !== 'РАЗМЕР') {
    const isPositionAlreadyExists = currentPositions.find((position: IPosition) => {
      if (position.id === id && position.size === size) {
        return true;
      }
      return false;
    });
    if (isPositionAlreadyExists === undefined) {
      return async (dispatch: DispatchShopCart) => {
        try {
          const response = await fetch(`${backendServer}/cards?_id=${id}`);
          const json = await response.json();

          dispatch({
            type: ADD_TO_SHOPCART,
            payload: {
              id: id,
              titleEng: json[0].titleEng,
              titleRu: json[0].titleRu,
              imageUrl: json[0].imageUrl,
              price: json[0].price,
              size: size,
              quantity: 1,
            },
          });
        } catch (e) {}
      };
    } else {
      if (lang === 'eng') {
        return showAlert('The same position is already in cart', 'my-danger', 'none');
      } else {
        return showAlert('Такой размер уже в корзине', 'my-danger', 'none');
      }
    }
  } else {
    if (lang === 'eng') {
      return showAlert('Choose a size', 'my-danger', 'none');
    } else {
      return showAlert('Выберите размер', 'my-danger', 'none');
    }
  }
}

export function removeFromCart(key: string) {
  const [id, size] = key.split('_');
  return (dispatch: DispatchShopCart) => {
    dispatch({ type: REMOVE_FROM_CART, payload: { id: id, size: size, quantity: 0 } });
  };
}
