import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ApplicationState } from '../../store/rootReducer';

export const Footer: React.FC = () => {
  const lang = useSelector((state: ApplicationState) => state.lang);

  return lang.value === 'eng' ? (
    <div className="container-fluid text-center text-md-left pt-4 page-footer">
      <div className="row">
        <div className="col-md-6 mt-md-0 pl-4 font-16 my-margin" id="text-column-1">
          <h5>KIGURUMI</h5>
          <p>
            In Japanese, a kigurumi (着ぐるみ) is a costumed performer who represents a cartoon character. It is very important in the Harajuku fashion. The name literally
            translates to "wearing a soft toy". The costumed characters at Disneyland are considered kigurami.
          </p>
        </div>
        <div className="col-md-3 mb-md-0 mb-3 font-16" id="text-column-2">
          <h5 className="text-uppercase">Contacts</h5>
          <ul className="list-unstyled">
            <li>www.google.com</li>
            <li>+7-499-951-84</li>
          </ul>
        </div>
        <div className="col-md-3 mb-md-0 mb-3 font-16" id="text-column-3">
          <h5>KIGURUMI me</h5>
          <ul className="list-unstyled">
            <li>
              <Link to="/about">About us: we are awesome!!!</Link>
            </li>
            <li>
              <Link to="/delivery">Delivery: anywhere you wish</Link>
            </li>
            <li>
              <Link to="/payment">Payment: by card</Link>
            </li>
            <li>
              <Link to="/warranty">Warranty: 100%</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-copyright py-5 font-16">
        <div className="inline">
          © 2021 Copyright:
          <a href="https://github.com/Tonia-SE" target="blank">
            https://github.com/Tonia-SE
          </a>
        </div>
        <a target="blank" href="https://rs.school/">
          <img id="logo" alt="RS school" src="https://rs.school/images/rs_school_js.svg" />
        </a>
      </div>
    </div>
  ) : (
    <div className="container-fluid text-center text-md-left pt-4 page-footer">
      <div className="row">
        <div className="col-md-6 pl-4 font-16 mb-2" id="text-column-1">
          <h5 className="text-uppercase">КИГУРУМИ</h5>
          <p className="">
            Это мега популярная одежда для дома и сна родом из Японии. Она представляет собой удобный цельный комбинезон, изображающий животного или персонажа мультфильма. Есть
            даже кигуруми в виде фруктов. С японского название переводится как «носить мягкую игрушку».
          </p>
        </div>
        <div className="col-md-3 mb-3 font-16" id="text-column-2">
          <h5 className="text-uppercase">Контакты</h5>
          <ul className="list-unstyled">
            <li>www.google.com</li>
            <li>+7-499-951-84</li>
          </ul>
        </div>
        <div className="col-md-3 mb-md-0 mb-3 font-16" id="text-column-3">
          <h5>KIGURUMI me</h5>
          <ul className="list-unstyled">
            <li>
              <Link to="/about">О нас: мы великолепны!!!</Link>
            </li>
            <li>
              <Link to="/delivery">Доставка: куда пожелаете</Link>
            </li>
            <li>
              <Link to="/payment">Оплата: картой</Link>
            </li>
            <li>
              <Link to="/warranty">Гарантия: 100%</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-copyright py-5 font-16">
        <div className="inline">
          © 2021 Copyright: 
          <a href="https://github.com/Tonia-SE" target="blank">
            https://github.com/Tonia-SE
          </a>
        </div>
        <a target="blank" href="https://rs.school/">
          <img id="logo" alt="RS school" src="https://rs.school/images/rs_school_js.svg" />
        </a>
      </div>
    </div>
  );
};
