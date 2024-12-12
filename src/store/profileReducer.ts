import { FETCH_WISHES, FETCH_ORDERS, ADD_TO_WHISHES, REMOVE_FROM_WHISHES, REMOVE_ORDER, SET_NAME } from './actionTypes';
import { IOrderState } from './orderReducer';
import { IPosition } from './shoppingCartReducer';
import { showAlert } from './messageReducer';
import { backendServer } from '../consts';

export interface IProfileState {
  name: string;
  wishes?: Array<IPosition>;
  orders?: Array<IOrderState>;
}

interface IProfileAction {
  type: string;
  name?: string;
  wish?: IPosition;
  wishId?: string;
  wishSize?: string;
  order?: IOrderState;
  orderId?: string;
  orders?: Array<IOrderState>
  wishes?: Array<IPosition>
}

export type DispatchProfile = (args: IProfileAction) => IProfileAction;

const initialState: IProfileState = {
  name: '',
  wishes: [],
  orders: [],
};

let profileState = { ...initialState }

const savedName = localStorage.getItem('userName');
if (savedName !== null) {
  profileState.name = savedName
}

// const savedState = localStorage.getItem('profile');
// if (savedState !== null) {
//   profileState = JSON.parse(savedState);
// }

export const profileReducer = (state: IProfileState = profileState, action: IProfileAction) => {
  switch (action.type) {
    // case ADD_ORDER:
    //   state.orders.push(action.order);
    //   localStorage.setItem('profile', JSON.stringify(state));
    //   return { ...state };
    case FETCH_ORDERS:
      return { ...state, orders: action.orders };

    case REMOVE_ORDER:
      const newOrders = state.orders.filter((order) => {
        if (order.orderId !== action.orderId) {
          return true;
        }
        return false;
      });
      const newState = { ...state, orders: newOrders };
      //localStorage.setItem('profile', JSON.stringify(newState));
      return { ...newState };

    case SET_NAME:
      localStorage.setItem('userName', action.name);
      return { ...state, name: action.name };      

    case ADD_TO_WHISHES:
      state.wishes.push(action.wish);
      const updatedProfileState = { ...state, wishes: state.wishes };
      //localStorage.setItem('profile', JSON.stringify(updatedProfileState));
      return { ...updatedProfileState };

    case FETCH_WISHES:
      return { ...state, wishes: action.wishes };

    case REMOVE_FROM_WHISHES:
      const newWishes = state.wishes.filter((wish) => {
        if (wish.id === action.wishId && wish.size === action.wishSize) {
          return false;
        }
        return true;
      });
      const newProfileState = { ...state, wishes: newWishes };
      //localStorage.setItem('profile', JSON.stringify(newProfileState));
      return { ...newProfileState };

    default:
      return state;
  }
};


export function fetchWishes(user: string) {
  return async (dispatch: DispatchProfile) => {    
    try {
      const response = await fetch(`${backendServer}/profile/whish_list?user=${user}`);
      const json = await response.json();
      dispatch({ type: FETCH_WISHES, wishes: json });
    } catch (e) {}
  };
}

export function fetchOrders(user: string) {
  return async (dispatch: DispatchProfile) => {    
    try {
      const response = await fetch(`${backendServer}/profile/orders?user=${user}`);
      const json = await response.json();
      dispatch({ type: FETCH_ORDERS, orders: json });
    } catch (e) {}
  };
}

export function deleteOrder(user: string, orderId: string) {
  return async (dispatch: DispatchProfile) => {
    dispatch({ type: REMOVE_ORDER, orderId: orderId });
    try {
      await fetch(`${backendServer}/profile/orders`, {
        method: 'DELETE',
        cache: 'no-cache',
        body: JSON.stringify({
          user: user,
          orderId: orderId,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
      });
    } catch (e) {}
  };
}

export function addToWishList(user: string, id: string, size: string, currentWhishes: Array<IPosition>, lang: string) {
  if (size !== 'SIZE' && size !== 'РАЗМЕР') {
    const isWishAlreadyExists = currentWhishes.find((whish: IPosition) => {
      if (whish.id === id && whish.size === size) {
        return true;
      }
      return false;
    });
    if (isWishAlreadyExists === undefined) {
      return async (dispatch: DispatchProfile) => {
        try {
          const response = await fetch(`${backendServer}/cards?_id=${id}`);
          const json = await response.json();

          dispatch({
            type: ADD_TO_WHISHES,
            wish: {
              id: id,
              titleEng: json[0].titleEng,
              titleRu: json[0].titleRu,
              imageUrl: json[0].imageUrl,
              price: json[0].price,
              size: size,
              quantity: 1,
            },
          });

          await fetch(`${backendServer}/profile/wish_list`, {
            method: 'POST',
            cache: 'no-cache',
            body: JSON.stringify({
              user: user,
              id: id,
              titleEng: json[0].titleEng,
              titleRu: json[0].titleRu,
              imageUrl: json[0].imageUrl,
              price: json[0].price,
              size: size,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
          });
        } catch (e) {}
      };
    } else {
      if (lang === 'eng') {
        return showAlert('The same position is already in whish list', 'my-danger', 'none');
      } else {
        return showAlert('Такой размер уже в избранном', 'my-danger', 'none');
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

export function deleteWish(user: string, wishId: string, size: string) {
  return async (dispatch: DispatchProfile) => {
    dispatch({ type: REMOVE_FROM_WHISHES, wishId: wishId, wishSize: size });
    try {
      await fetch(`${backendServer}/profile/wish_list`, {
        method: 'DELETE',
        cache: 'no-cache',
        body: JSON.stringify({
          user: user,
          wishId: wishId,
          size: size,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
      });
    } catch (e) {}
  };
}
