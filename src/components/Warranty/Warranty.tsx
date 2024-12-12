import React from 'react';
import { useSelector } from 'react-redux';
import { ApplicationState } from '../../store/rootReducer';

export const Warranty: React.FC = () => {
  const lang = useSelector((state: ApplicationState) => state.lang);
  return lang.value === 'eng' ? (
    <div className="warranty">
      <div className="warranty_wrapper">
        <img className="warranty-img" src="./assets/images/warranty.ico" alt="warranty" />
        <p className="warranty_message">100% MONEY BACK</p>
        <p className="main_warranty">details with checkout</p>
      </div>
    </div>
  ) : (
    <div className="warranty">
      <div className="warranty_wrapper">
        <img className="warranty-img" src="./assets/images/warranty.ico" alt="warranty" />
        <p className="warranty_message">100% ГАРАНТИЯ ВОЗВРАТА</p>
        <p className="main_warranty">подробности при оформлении заказа</p>
      </div>
    </div>
  );
};
