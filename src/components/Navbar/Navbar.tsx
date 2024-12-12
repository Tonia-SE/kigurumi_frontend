import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ApplicationState } from '../../store/rootReducer';
import { toggleNavbarDropdownMenu } from '../../store/actions';
import { setSize } from '../../store/cardReducer';
import { changeLang } from '../../store/langReducer';
import { setCurrency } from '../../store/currencyReducer';
import { sumOfArray } from '../../store/actions';
import { LogInForm } from '../Regforms/LogInForm';
import { HIDE_ALERT } from '../../store/actionTypes';

const link = function getCurrentLink() {
  return `${window.location.pathname}${window.location.search}`;
};

export const KigurumiNavbar: React.FC = () => {
  const dispatch = useDispatch();
  const shopCart = useSelector((state: ApplicationState) => state.shopCart);
  const lang = useSelector((state: ApplicationState) => state.lang);
  const auth = useSelector((state: ApplicationState) => state.auth);
  const authClassName = auth.isLoggedIn === false ? 'nav-item active' : 'nav-item active d-none';
  const authImg = auth.isLoggedIn === false ? './assets/images/authorization.ico' : './assets/images/auth_user.ico';
  const logIn = lang.value === 'eng' ? 'Login' : 'Вход';
  const signup = lang.value === 'eng' ? 'Sign up' : 'Регистрация';
  const aboutUs = lang.value === 'eng' ? 'About us' : 'О нас';
  const delivery = lang.value === 'eng' ? 'Delivery' : 'Доставка';
  const payment = lang.value === 'eng' ? 'Payment' : 'Оплата';
  const shoppingIn = lang.value === 'eng' ? 'Shopping in' : 'Страна';
  const ru = lang.value === 'eng' ? 'Russia' : 'Россия';
  const eng = lang.value === 'eng' ? 'USA' : 'США';
  const dataToggle = auth.isLoggedIn === false ? 'collapse' : '';
  let qty = 0;
  if (shopCart.positions.length > 0) {
    const array = shopCart.positions.map((position) => position.quantity);
    qty = sumOfArray(array);
  }

  return (
    <div className="header">
      <LogInForm />
      <div className="navbar navbar-light bg-light">
        <a className="navbar-brand" href="/">
          <img id="logo" src="./assets/images/logo.svg" width="30" height="30" className="d-inline-block align-top" alt="" />
          KIGURUMI me
        </a>
        <div className="navWrapper">
          <div className="navbar navbar-expand-sm padding-none">
            <ul className="navbar-nav row-direction mr-auto">
              <li className="nav-item active">
                <div className="shoppingCard-wrapper">
                  <Link to="/shopping_cart" onClick={() => { dispatch({type: HIDE_ALERT}) }}>
                    <div className="nav-link" id="shoppingCart">
                      <img className="shoppingCart add-width" src="./assets/images/shopping-cart-empty.svg" alt="shopping cart" />
                    </div>
                  </Link>
                  <div className="shoppingCard-quantity">
                    <span id="shoppingCard-quantity">{qty}</span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <button
            className="navbar-toggler"
            type="button"
            id="icon1"
            data-toggle={dataToggle}
            data-target="#navbarSupportedRegForms"
            aria-controls="navbarSupportedRegForms"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <Link to={auth.isLoggedIn === false ? link : '/profile'} onClick={() => { dispatch({type: HIDE_ALERT}) }}>
              <img id="auth" src={authImg} alt="Authorization" />
            </Link>
          </button>
          <button
            className="navbar-toggler"
            type="button"
            id="icon"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
        <div
          className="collapse navbar-collapse"
          id="navbarSupportedRegForms"
          onClick={() => {
            toggleNavbarDropdownMenu();
          }}>
          <ul className="navbar-nav mr-auto">
            <li className={authClassName}>
              <a className="nav-link add-font-size" href="/" data-toggle="modal" data-target="#logInModal">
                {logIn}
              </a>
            </li>
            <li className={authClassName}>
              <a className="nav-link add-font-size" href="/" data-toggle="modal" data-target="#signUpModal">
                {signup}
              </a>
            </li>
          </ul>
        </div>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li
              className="nav-item react-link"
              onClick={() => {
                toggleNavbarDropdownMenu();
              }}>
              <Link to="/about">
                <div className="nav-link add-font-size active about_us">{aboutUs}</div>
              </Link>
            </li>
            <li
              className="nav-item react-link"
              onClick={() => {
                toggleNavbarDropdownMenu();
              }}>
              <Link to="/delivery">
                <div className="nav-link add-font-size active">{delivery}</div>
              </Link>
            </li>
            <li
              className="nav-item react-link"
              onClick={() => {
                toggleNavbarDropdownMenu();
              }}>
              <Link to="/payment">
                <div className="nav-link add-font-size active delivery-link">{payment}</div>
              </Link>
            </li>
            <li className="nav-item dropdown active">
              <a className="nav-link dropdown-toggle add-font-size" href="/" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {shoppingIn}
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown" id="dropdownMenuNav">
                <div
                  className="dropdown-item country"
                  onClick={() => {
                    dispatch(changeLang('ru'));
                    dispatch(setCurrency('₽'));
                    dispatch(setSize('РАЗМЕР'));
                    toggleNavbarDropdownMenu();
                  }}>
                  {ru}
                  <img id="Russia" src="./assets/images/russiaFlag.ico" alt="Russia flag" />
                </div>
                <div
                  className="dropdown-item country"
                  onClick={() => {
                    dispatch(changeLang('eng'));
                    dispatch(setCurrency('$'));
                    dispatch(setSize('SIZE'));
                    toggleNavbarDropdownMenu();
                  }}>
                  {eng}
                  <img id="USA" src="./assets/images/UnitedStatesFlag.ico" alt="USA flag" />
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
