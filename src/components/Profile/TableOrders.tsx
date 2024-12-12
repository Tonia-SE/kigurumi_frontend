import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteOrder, fetchOrders } from '../../store/profileReducer';
import { ApplicationState } from '../../store/rootReducer';

export const TableOrders: React.FC = () => {
  const dispatch = useDispatch();
  const lang = useSelector((state: ApplicationState) => state.lang);
  const userName = useSelector((state: ApplicationState) => state.auth.userName);
  const profileOrders = useSelector((state: ApplicationState) => state.profile.orders);

  useEffect(() => {
    dispatch(fetchOrders(userName))
  },[])

  return profileOrders.length > 0 ? (
    <table className="table table-hover responsive mb-3">
      <thead>
        <tr>
          <th scope="col">{lang.value === 'eng' ? '№' : '№'}</th>
          <th scope="col">{lang.value === 'eng' ? 'Date' : 'Дата'}</th>
          <th scope="col">{lang.value === 'eng' ? 'Total' : 'Сумма'}</th>
          <th scope="col">{lang.value === 'eng' ? 'Status' : 'Статус'}</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        {profileOrders.map((order) => {
          return (
            <tr className="tr-hover" key={order.orderId}>
              <td>{order.orderId}</td>
              <td>{order.orderDate}</td>
              <td>{order.total}</td>
              <td>{lang.value === 'eng' ? ' processing' : 'cборка'}</td>
              <td
                className="txt-right"
                onClick={() => {
                  dispatch(deleteOrder(userName, order.orderId));
                  //dispatch({ type: REMOVE_ORDER, orderId: order.orderId });
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
          <th scope="col">{lang.value === 'eng' ? '№' : '№'}</th>
          <th scope="col">{lang.value === 'eng' ? 'Date' : 'Дата'}</th>
          <th scope="col">{lang.value === 'eng' ? 'Total' : 'Сумма'}</th>
          <th scope="col">{lang.value === 'eng' ? 'Status' : 'Статус'}</th>
          <th scope="col"></th>
        </tr>
      </thead>
    </table>
  );
};
