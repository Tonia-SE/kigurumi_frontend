import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { backendServer } from '../../consts';
import { ApplicationState } from '../../store/rootReducer';
import { addPosition } from '../../store/shoppingCartReducer';
import { showAlert } from '../../store/messageReducer';
import { fetchCard, setSize } from '../../store/cardReducer';
import { Message } from '../Message/Message';
import { Star } from '../Star/Star';
import { useLocation } from 'react-router-dom';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export const Card: React.FC = () => {
  const cardId = useQuery().get('id');
  const dispatch = useDispatch();

  const lang = useSelector((state: ApplicationState) => state.lang);
  const card = useSelector((state: ApplicationState) => state.card);
  const currentPositions = useSelector((state: ApplicationState) => state.shopCart.positions);
  const currency = useSelector((state: ApplicationState) => state.currency.info);

  useEffect(() => {
      dispatch(fetchCard(cardId));
    if (!card.currentSize) {
      dispatch(setSize(lang.value === 'eng' ? 'SIZE' : 'РАЗМЕР'));
    }
  }, []);

  const currentSize = card.currentSize;
  const titleEng = card.titleEng;
  const titleRu = card.titleRu;
  const buyButton = lang.value === 'eng' ? 'BUY' : 'КУПИТЬ';
  const imageUrl = backendServer + card.imageUrl;

  let priceCurrent = `${card.price} ${currency.value}`;
  if (currency.value !== '$') {
    priceCurrent = `${Math.trunc(+card.price * currency.rate)} ${currency.value}`;
  }
  return (
    <div className="page_wrapper card-bg-color">
      <div className="card mb-4 shadow-sm single-card mt-4">
        <Star id={card._id} />
        <img src={imageUrl} alt="KIGURUMI me" className="bd-placeholder-img card-img-top single-card_img" />
        <div className="card-body">
          <small className="text-muted price mb-3" id="price">
            {priceCurrent}
          </small>
          <p className="card-text cd-txt">{lang.value === 'eng' ? titleEng : titleRu}</p>
          <Message />
          <div className="d-flex justify-content-between align-items-center">
            <div className="btn-group mt-2 mb-3">
              <button
                className="btn btn-outline-secondary card_btn-buy my-padding"
                id={card._id}
                type="button"
                onClick={() => {
                  if (currentSize.trim() === '' || currentSize === null || currentSize === undefined) {
                    dispatch(showAlert(lang.value === 'eng' ? 'Choose a size' : 'Выберите размер', 'my-danger', 'none'));
                  } else {
                    dispatch(addPosition(card._id, currentSize, currentPositions, lang.value));
                  }
                }}>
                {buyButton}
              </button>
              <button
                className="btn btn-outline-secondary dropdown-toggle dropdown card_btn-sizes my-padding"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                type="button">
                {currentSize}
              </button>
              <div className="dropdown-menu" id="sizeDroppdownMenu" aria-labelledby="dropdownMenuButton">
                {card.amount.map((element) => {
                  return (
                    <div
                      className="dropdown-item sizeItem"
                      key={element[0]}
                      id={card._id}
                      onClick={(event) => {
                        dispatch(setSize(event.currentTarget.textContent));
                      }}>
                      {element[0]}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
