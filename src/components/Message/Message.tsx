import React from 'react';
import { useSelector } from 'react-redux';
import { ApplicationState } from '../../store/rootReducer';

export const Message: React.FC = () => {
  const message = useSelector((state: ApplicationState) => state.message);

  return message.isOn === true ? (
    <div className={`alert alert-dismissible fade ${message.className} show`} id={message.id}>
      <p className="message-text">{message.text}</p>
    </div>
  ) : (
    <div className={`alert alert-dismissible fade ${message.className} none`} id={message.id}>
      <p className="message-text">{message.text}</p>
    </div>
  );
};
