import React from 'react';
import { useSelector } from 'react-redux';
import { ApplicationState } from '../../store/rootReducer';

export const About: React.FC = () => {
  const lang = useSelector((state: ApplicationState) => state.lang);
  return lang.value === 'eng' ? (
    <div className="about">
      <div className="about_wrapper">
        <img className="about-img" src="./assets/images/about_us.ico" alt="about us" />
        <p className="about_message">We are with you</p>
        <p className="main_about">since 2020</p>
      </div>
    </div>
  ) : (
    <div className="about">
      <div className="about_wrapper">
        <img className="about-img" src="./assets/images/about_us.ico" alt="about us" />
        <p className="about_message">Мы работаем для Вас</p>
        <p className="main_about">с 2020 года</p>
      </div>
    </div>
  );
};
