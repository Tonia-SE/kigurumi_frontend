import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { backendServer } from '../../consts';
import { HIDE_ALERT } from '../../store/actionTypes';
import { setSize } from '../../store/cardReducer';
import { ApplicationState } from '../../store/rootReducer';
import { Spinner } from '../Spinner/Spinner';

export const Album: React.FC = () => {
  const dispatch = useDispatch();
  const album = useSelector((state: ApplicationState) => state.album);
  const currency = useSelector((state: ApplicationState) => state.currency.info);
  const language = useSelector((state: ApplicationState) => state.lang);
  const isLoader = useSelector((state: ApplicationState) => state.loader.isLoading);
  const buttonClassName = `btn btn-sm btn-outline-secondary card_btn-buy-${album.album.color}`;
  const buyButton = language.value === 'eng' ? 'BUY' : 'КУПИТЬ';
  const currentSize = language.value === 'eng' ? 'SIZE' : 'РАЗМЕР';
  if (album.show) {
    return isLoader ? (
      <Spinner />
    ) : (
      <div className={`${album.album.color} pt-5`}>
        <div className="container">
          <div className="row">
            {album.album.cards.map((card) => {
              const imageUrl = `${backendServer}${card.imageUrl}`;
              let priceCurrent = `${card.price} ${currency.value}`;
              const title = language.value === 'eng' ? card.titleEng : card.titleRu;
              if (currency.value !== '$') {
                priceCurrent = `${Math.trunc(Number.parseFloat(card.price) * currency.rate)} ${currency.value}`;
              }
              return (
                <div className="col-md-4 pt-3" key={card._id}>
                  <div className="card mb-4 shadow-sm" key={card._id}>
                    <Link to={`/card?id=${card._id}`}>
                      {isLoader && Spinner}
                      <img src={imageUrl} alt="KIGURUMI me" className="bd-placeholder-img card-img-top p-2" width="0" />
                    </Link>
                    <div className="card-body">
                      <small className="text-muted price mb-3" id="price">
                        {priceCurrent}
                      </small>
                      <p className="card-text text mb-2">{title}</p>
                      <Link
                        to={`/card?id=${card._id}`}
                        onClick={() => {
                          dispatch(setSize(currentSize));
                        }}>
                        <button className={buttonClassName} id={card._id} type="button">
                          {buyButton}
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  } else {
    return <></>;
  }
};
