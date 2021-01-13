// import * as React from 'react';
// import * as ReactDOM from 'react-dom';
// import App from './App';
// // import $ from 'jquery';

// ReactDOM.render(<App />, document.querySelector('#body'));

// $('#carouselExampleControls').carousel({
//   interval: 3000
// })
import React from 'react';
import { render } from 'react-dom';
import App from './App';
import { rootReducer } from './redux/rootReducer';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { compose, createStore, applyMiddleware, Store } from 'redux';
// import { spamWordsMiddleWare } from './redux/middleWare';

//import createSagaMiddleWare from 'redux-saga'
//import { sagaWatcher } from './redux/sagas';

//const saga = createSagaMiddleWare()

const store = createStore(
  rootReducer,
  compose(
    // applyMiddleware(thunk, spamWordsMiddleWare),
    applyMiddleware(thunk)
    //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

//saga.run(sagaWatcher)

const app = (
  <Provider store={store}>
    <App />
  </Provider>
);

render(app, document.getElementById('body'));
