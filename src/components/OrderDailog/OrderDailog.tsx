import React from 'react';
import { Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { CLEAR_CART } from '../../store/actionTypes';
import { ApplicationState } from '../../store/rootReducer';

interface IProperties {
  show: boolean;
  onHide: () => void;
}

export const OrderDailog: React.FC<IProperties> = (properties) => {
  const dispatch = useDispatch();
  const lang = useSelector((state: ApplicationState) => state.lang);
  const orderId = useSelector((state: ApplicationState) => state.order.orderId);
  const orderDate = useSelector((state: ApplicationState) => state.order.orderDate);
  const orderTotal = useSelector((state: ApplicationState) => state.order.total);
  const modalTitleText = lang.value === 'eng' ? 'Thanks for shopping!' : 'Спасибо за покупку!';
  const modalBodyTextTitle = lang.value === 'eng' ? 'Order №' : 'Заказ №';
  const modalBodyText =
    lang.value === 'eng'
      ? `total price ${orderTotal} has been successfully issued ${orderDate}. Our manager will contact you within half an hour to check the details.`
      : `oт ${orderDate} на сумму ${orderTotal} успешно оформлен. Наш менеджер свяжется с вами в течение получаса для уточнения деталей заказа.`;

  return (
    <Modal {...properties} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">{modalTitleText}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>
          {modalBodyTextTitle}
          {orderId}
        </h4>
        <p>{modalBodyText}</p>
      </Modal.Body>
      <Modal.Footer>
        <button
          type="button"
          className="okBtn btn btn-primary"
          onClick={() => {
            {
              properties.onHide;
            }
            dispatch({ type: CLEAR_CART });
          }}>
          ОК
        </button>
      </Modal.Footer>
    </Modal>
  );
};
