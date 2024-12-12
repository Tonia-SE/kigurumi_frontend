import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LOGOUT_USER } from '../../store/actionTypes';
import { ApplicationState } from '../../store/rootReducer';
import { TableWishes } from './TableWishes';
import { TableOrders } from './TableOrders';

export const Profile: React.FC = () => {
  const dispatch = useDispatch();
  const lang = useSelector((state: ApplicationState) => state.lang);
  const profileName = useSelector((state: ApplicationState) => state.profile.name);

  return (
    <div className="profile-wrapper p-4">
      <div className="profile-title-wrapper p-3">
        <h2 className="main-title center mb-3">{lang.value === 'eng' ? 'Welcome to your profile' : 'Добро пожаловать в личный кабинет'}</h2>
        <div className="profile-name-wrapper mt-3 p-2">
          <a href="/">
            <button
              className="btn btn-my-danger"
              onClick={() => {
                dispatch({ type: LOGOUT_USER });
              }}>
              <p>{lang.value === 'eng' ? 'Log out' : 'Выxод'}</p>
            </button>
          </a>
          <h4 className="profile-name mb-0">{profileName}</h4>
        </div>
      </div>
      <div className="my-title p-3  mt-3">
        <h3 className="table-title left">{lang.value === 'eng' ? 'My order list' : 'Мои заказы'}</h3>
      </div>
      <TableOrders />
      <div className="my-title p-3  mt-4">
        <h3 className="table-title">{lang.value === 'eng' ? 'My whish list' : 'Избранное'}</h3>
      </div>
      <TableWishes />
    </div>
  );
};
