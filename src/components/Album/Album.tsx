import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { backendServer } from '../../consts';
import { fetchCard, setSize } from '../../redux/actions';
import { ApplicationState } from '../../redux/rootReducer';
import { Star } from '../Star/Star';
//import {useSelector} from 'react-redux'

const Album = () => {

  const dispatch = useDispatch();
  const album = useSelector((state: ApplicationState)  => state.album)
  const cards = useSelector((state: ApplicationState)  => state.album.album.cards)
  const currency = useSelector((state: ApplicationState) => state.currency.info)
  //const lang = useSelector((state: ApplicationState) => state.currency.info)
  const language = useSelector((state: ApplicationState)  => state.lang)
  let buyBtn = (language.value === 'eng')? 'BUY': 'КУПИТЬ'
  let currentSize = (language.value === 'eng')? 'SIZE': 'РАЗМЕР'
  


  //const loading = useSelector(state => state.app.loading)

  // if(loading) {
  //     return (
  //         <div classNameName="spinner-border text-primary" role="status">
  //             <span classNameName="sr-only">Loading...</span>
  //         </div>
  //     )
  // }

  if (album.show) {
    return (
      <div className={`${album.album.color} pt-5`}>
        <div className="container">
          <div className="row">
            {album.album.cards.map((card) => {
              //const cardSizes = Object.entries(card.amount);
              const imageUrl = `${backendServer}${card.imageUrl}`
              let priceCurrent = `${card.price} ${currency.value}`
              let title = (language.value === 'eng')? card.titleEng: card.titleRu;
              if (currency.value !== '$') {
                priceCurrent = `${Math.trunc(parseFloat(card.price) * currency.rate)} ${currency.value}`
                //priceCurrent = `${Math.round((Math.trunc(parseFloat(card.price) * currency.rate)/100)) * 100 - 1} ${currency.value}`
              }
              //const priceValue = Math.trunc(parseFloat(card.price) * currency.rate)
              //const priceCurrent = `${priceValue} ${currency.value}`
              return (              
                  <div className="col-md-4 pt-3" key={card._id}>
                    <div className="card mb-4 shadow-sm" key={card._id}>                    
                      <Star id={card._id}/>
                      <Link to={`/card?id=${card._id}`} onClick={()=> { dispatch(setSize(currentSize)) }} >
                        <img src={imageUrl} alt="KIGURUMI me" className="bd-placeholder-img card-img-top" width="0" />
                      </Link>
                      <div className="card-body">
                        <small className="text-muted price mb-3" id="price">
                          {priceCurrent}
                        </small>
                        
                          <p className="card-text text mb-2">{title}</p>      
                          <Link to={`/card?id=${card._id}`} 
                          onClick={()=> { dispatch(setSize(currentSize)) }}>
                            <button className="btn btn-sm btn-outline-secondary card_btn-BUY" id={card._id} type="button">
                              {buyBtn}
                            </button>
                          </Link>
                      
                        {/* <Link to={{
                              pathname: "/search",
                              propsSearch: myData
                          }}>Ссылка</ Link>
                                На странице "/search" данные можно достать так:
                                import React from 'react';
                                import {Redirect} from 'react-router-dom';
                                export default function Search(props) {
                                  console.log(props.location.propsSearch); // Наши переданные данные
                                  //Но учтите, что они будут доступны только, при переходе по этой ссылке. 
                                  //Если страницу перезагрузить, то получим - undefined. 
                                  //Это решается редиректом обратно, если нет пропса:
                                    if (!props.location.propsSearch) return <Redirect to="/firstpage" />;
                                ...
                                }*/}
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
    return(<></>)
  }
};

export default Album;