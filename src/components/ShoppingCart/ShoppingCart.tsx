import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { backendServer } from '../../consts';
import { ApplicationState } from '../../store/rootReducer';
import { IPosition } from '../../store/shoppingCartReducer';
import { removeFromCart } from '../../store/shoppingCartReducer';
import { proceedToCheckout } from '../../store/actions';
import { setOrder } from '../../store/orderReducer';
import { setQuantity } from '../../store/shoppingCartReducer';
import { Message } from '../Message/Message';
import { OrderDailog } from '../OrderDailog/OrderDailog';
import { HIDE_ALERT, SET_NAME } from '../../store/actionTypes';
import { Link } from 'react-router-dom';
import { sumOfArray } from '../../store/actions';

export const ShoppingCart: React.FC = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const dispatch = useDispatch();
  const cart = useSelector((state: ApplicationState) => state.shopCart);
  const currency = useSelector((state: ApplicationState) => state.currency.info);
  const userName = useSelector((state: ApplicationState) => state.auth.userName);
  const auth = useSelector((state: ApplicationState) => state.auth.isLoggedIn);
  const lang = useSelector((state: ApplicationState) => state.lang);
  const date =
    new Date().getMonth() < 9
      ? `${new Date().getDate()}.0${new Date().getMonth() + 1}.${new Date().getFullYear()}`
      : `${new Date().getDate()}.${new Date().getMonth() + 1}.${new Date().getFullYear()}`;
  const orderId = (Date.now() + '').slice(-6);
  const colSpanOrder = 1;
  const colSpanMessage = 4;
  const title = lang.value === 'eng' ? 'Title' : 'Модель';
  const size = lang.value === 'eng' ? 'Size' : 'Размер';
  const quantity = lang.value === 'eng' ? 'Quantity' : 'Количество';
  const price = lang.value === 'eng' ? 'Price' : 'Цена';
  const checkout = lang.value === 'eng' ? 'CHECKOUT' : 'КУПИТЬ';
  const total = lang.value === 'eng' ? 'Total:' : 'Сумма:';
  const totalOrderPrice: Array<number> = [];
  const countTotal = () => {
    const total = sumOfArray(totalOrderPrice);
    let result = `${total} ${currency.value}`;
    if (currency.value === '$') {
      result = `${total.toFixed(2)} ${currency.value}`;
    }
    return result;
  };

  if (cart.positions.length === 0) {
    return lang.value === 'eng' ? (
      <div className="empty-shoppingCart">
        <div className="empty-shoppingCart_wrapper">
          <img className="shoppingCart add-width big-size" src="./assets/images/shopping-cart-empty.svg" alt="shopping cart" />
          <p className="empty-shoppingCart_message">Your cart is empty...</p>
          <a className="main-page-link" href="/">
            SHOP NOW
          </a>
        </div>
      </div>
    ) : (
      <div className="empty-shoppingCart">
        <div className="empty-shoppingCart_wrapper">
          <img className="shoppingCart add-width big-size" src="./assets/images/shopping-cart-empty.svg" alt="shopping cart" />
          <p className="empty-shoppingCart_message">Ваша корзина пуста...</p>
          <a className="main-page-link" href="/">
            К ПОКУПКАМ
          </a>
        </div>
      </div>
    );
  } else {
    return (
      <div className="table-wrapper">
        <OrderDailog show={modalShow} onHide={() => setModalShow(false)} />
        <table className="table mt-3 mb-3">
          <thead className="light">
            <tr>
              <th scope="col"></th>
              <th scope="col">{title}</th>
              <th scope="col">{size}</th>
              <th scope="col">{quantity}</th>
              <th scope="col">{price}</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {cart.positions.map((position: IPosition) => {
              const positionTitle = lang.value === 'eng' ? position.titleEng : position.titleRu;
              const imageUrl = backendServer + position.imageUrl;
              let total = '';
              if (currency.value !== '$') {
                const totalPrice = Math.trunc(+(position.price * currency.rate)) * position.quantity;
                totalOrderPrice.push(totalPrice);
                total = `${totalPrice} ${currency.value}`;
              }
              if (currency.value === '$') {
                totalOrderPrice.push(position.quantity * position.price);
                total = `${(position.quantity * position.price).toFixed(2)} ${currency.value}`;
              }
              const key = `${position.id}_${position.size}`;
              return (
                <tr key={key} id={key} className="position">
                  <td scope="row" className="align-middle">
                    <Link to={`/card?id=${position.id}`} onClick={() => { dispatch({type: HIDE_ALERT}) }}>
                      <img className="shoppingCart-image" src={imageUrl} />
                    </Link>
                  </td>
                  <td className="align-middle number">{positionTitle}</td>
                  <td className="align-middle number">{position.size}</td>
                  <td className="align-middle number" id="quantity">
                    <div className="quantity-wrapper number">
                      {position.quantity}
                      <div className="btn-group column">
                        <div className="dropup">
                          <button
                            type="button"
                            className="btn dropdown-toggle arrow"
                            onClick={() => {
                              dispatch(setQuantity(position.quantity + 1, key));
                            }}></button>
                        </div>
                        <div>
                          <button
                            type="button"
                            className="btn dropdown-toggle arrow"
                            onClick={() => {
                              dispatch(setQuantity(position.quantity - 1, key));
                            }}></button>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="align-middle number">{total}</td>
                  <td
                    className="align-middle"
                    onClick={() => {
                      dispatch(removeFromCart(key));
                    }}>
                    <div className="center">
                      <img className="trashbin" src="./assets/images/trashbin.ico" />
                    </div>
                  </td>
                </tr>
              );
            })}
            <tr className="total">
              <td></td>
              <td></td>
              <td></td>
              <td className="align-middle">
                <div className="right">{total}</div>
              </td>
              <td className="align-middle total-price">{countTotal()}</td>
              <td className="align-middle center"></td>
            </tr>
            <tr className="table-borderless">
              <td colSpan={colSpanMessage} id="shopCart-message">
                <Message />
              </td>
              <td colSpan={colSpanOrder} className="align-middle">
                <button
                  className="btn checkout center"
                  onClick={() => {
                    if (!auth) {
                      dispatch(proceedToCheckout(lang.value));
                    } else {
                      setModalShow(true);
                      dispatch(setOrder(userName, orderId, countTotal(), cart.positions, date));
                      localStorage.removeItem('shopCart');
                      dispatch({ type: SET_NAME, name: userName });
                    }
                  }}>
                  {checkout}
                </button>
              </td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
};
