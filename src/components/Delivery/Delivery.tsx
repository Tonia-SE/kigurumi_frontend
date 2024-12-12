import React from 'react';
import { useSelector } from 'react-redux';
import { ApplicationState } from '../../store/rootReducer';

export const Delivery: React.FC = () => {
  const lang = useSelector((state: ApplicationState) => state.lang);

  return lang.value === 'eng' ? (
    <div className="delivery-free">
      <div className="delivery_wrapper">
        <img className="delivery add-width" src="./assets/images/delivery.ico" alt="delivery truck" />
        <p className="delivery_message_eng">FREE SHIPPING</p>
        <p className="main_delivery">details with checkout</p>
      </div>
    </div>
  ) : (
    <div className="delivery-free">
      <div className="delivery_wrapper">
        <img className="delivery add-width" src="./assets/images/delivery.ico" alt="delivery truck" />
        <p className="delivery_message">Бесплатная доставка по России</p>
        <p className="main_delivery">подробности при оформлении заказа</p>
      </div>
    </div>
  );
};
