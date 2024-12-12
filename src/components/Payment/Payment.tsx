import React from 'react';
import { useSelector } from 'react-redux';
import { ApplicationState } from '../../store/rootReducer';

export const Payment: React.FC = () => {
  const lang = useSelector((state: ApplicationState) => state.lang);

  return lang.value === 'eng' ? (
    <div className="payment">
      <div className="payment_wrapper">
        <img className="payment-img" src="./assets/images/payment.ico" alt="payment" />
        <p className="payment_message">ONLINE EASY PAY</p>
        <p className="main_payment">details with checkout</p>
      </div>
    </div>
  ) : (
    <div className="payment">
      <div className="payment_wrapper">
        <img className="payment-img" src="./assets/images/payment.ico" alt="payment" />
        <p className="payment_message">УДОБНАЯ ОПЛАТА ОН-ЛАЙН</p>
        <p className="main_payment">подробности при оформлении заказа</p>
      </div>
    </div>
  );
};
