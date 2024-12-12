import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { backendServer } from '../../consts';
import { ApplicationState } from '../../store/rootReducer';
import { deleteWish, fetchWishes } from '../../store/profileReducer';
import { Link } from 'react-router-dom';
import { HIDE_ALERT } from '../../store/actionTypes';

export const TableWishes: React.FC = () => {
  const dispatch = useDispatch();
  const lang = useSelector((state: ApplicationState) => state.lang);
  const profileWishes = useSelector((state: ApplicationState) => state.profile.wishes);
  const currency = useSelector((state: ApplicationState) => state.currency.info);
  const userName = useSelector((state: ApplicationState) => state.auth.userName);

  useEffect(() => {
    dispatch(fetchWishes(userName))
  },[])

  return profileWishes.length > 0 ? (
    <table className="table table-hover responsive mb-5">
      <thead>
        <tr>
          <th scope="col"></th>
          <th scope="col">{lang.value === 'eng' ? 'Title' : 'Модель'}</th>
          <th scope="col">{lang.value === 'eng' ? 'Size' : 'Размер'}</th>
          <th scope="col">{lang.value === 'eng' ? 'Price' : 'Цена'}</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        {profileWishes.map((wish) => {
          const imageUrl = backendServer + wish.imageUrl;
          let price = +wish.price;
          if (currency.value !== '$') {
            price = Math.trunc(+wish.price * currency.rate);
          }
          return (
            <tr className="tr-hover" key={`${wish.id}${wish.size}`}>
              <td>
              <Link to={`/card?id=${wish.id}`} onClick={() => { 
                console.log(wish.id);
                dispatch({type: HIDE_ALERT}) }}>
                <img className="wishes-image" src={imageUrl} />
              </ Link>
              </td>
              <td>{lang.value === 'eng' ? wish.titleEng : wish.titleRu}</td>
              <td>{wish.size}</td>
              <td>
                {price} {currency.value}
              </td>
              <td
                className="txt-right"
                onClick={() => {
                  dispatch(deleteWish(userName, wish.id, wish.size));
                }}>
                <img className="trashbin mr-4" src="./assets/images/trashbin.ico" />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  ) : (
    <table className="table table-hover responsive mb-3">
      <thead>
        <tr>
          <th scope="col"></th>
          <th scope="col">{lang.value === 'eng' ? 'Title' : 'Модель'}</th>
          <th scope="col">{lang.value === 'eng' ? 'Size' : 'Размер'}</th>
          <th scope="col">{lang.value === 'eng' ? 'Price' : 'Цена'}</th>
          <th scope="col"></th>
        </tr>
      </thead>
    </table>
  );
};
