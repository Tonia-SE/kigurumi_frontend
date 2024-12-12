import { combineReducers, Reducer } from 'redux';
import { albumReducer, IAlbumState } from './albumReducer';
import { cardReducer, ICardState } from './cardReducer';
import { controlsReducer, ICategoryState } from './controlsReducer';
import { currencyReducer, ICurrencyState } from './currencyReducer';
import { messageReducer, IMessageState } from './messageReducer';
import { regFormMessageReducer, IRegFormMessageState } from './regFormsMessageReducer';
import { shopCartReducer, IShopCartState } from './shoppingCartReducer';
import { langReducer, ILangState } from './langReducer';
import { authReducer, IAuthState } from './authReducer';
import { orderReducer, IOrderState } from './orderReducer';
import { profileReducer, IProfileState } from './profileReducer';
import { loaderReducer, ILoaderState } from './loaderReducer';

export interface ApplicationState {
  controls: ICategoryState;
  album: IAlbumState;
  card: ICardState;
  currency: ICurrencyState;
  shopCart: IShopCartState;
  message: IMessageState;
  regFormMessage: IRegFormMessageState;
  lang: ILangState;
  auth: IAuthState;
  order: IOrderState;
  profile: IProfileState;
  loader: ILoaderState;
}

export const rootReducer: Reducer<ApplicationState> = combineReducers<ApplicationState>({
  controls: controlsReducer,
  album: albumReducer,
  card: cardReducer,
  currency: currencyReducer,
  shopCart: shopCartReducer,
  message: messageReducer,
  regFormMessage: regFormMessageReducer,
  lang: langReducer,
  auth: authReducer,
  order: orderReducer,
  profile: profileReducer,
  loader: loaderReducer,
});
