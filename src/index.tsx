import React from 'react';
import thunk from 'redux-thunk';
import { render } from 'react-dom';
import { rootReducer } from './store/rootReducer';
import { Provider } from 'react-redux';
import { compose, createStore, applyMiddleware } from 'redux';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { Main } from './Main';
import { ShoppingCart } from './components/ShoppingCart/ShoppingCart';
import { KigurumiNavbar } from './components/Navbar/Navbar';
import { Card } from './components/Card/Card';
import { Delivery } from './components/Delivery/Delivery';
import { Warranty } from './components/Warranty/Warranty';
import { Footer } from './components/Footer/Footer';
import { LogInForm } from './components/Regforms/LogInForm';
import { SignUpForm } from './components/Regforms/SignUpForm';
import { Payment } from './components/Payment/Payment';
import { About } from './components/About/About';
import { Profile } from './components/Profile/Profile';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, compose(applyMiddleware(thunk), composeEnhancers()));

const routing = (
  <Router>
    <Provider store={store}>
      <div className="body">
        <KigurumiNavbar />
        <LogInForm />
        <SignUpForm />
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/shopping_cart" component={ShoppingCart} />
          <Route exact path="/card" component={Card} />
          <Route exact path="/delivery" component={Delivery} />
          <Route exact path="/warranty" component={Warranty} />
          <Route exact path="/payment" component={Payment} />
          <Route exact path="/about" component={About} />
          <Route exact path="/profile" component={Profile} />
        </Switch>
        <Footer />
      </div>
    </Provider>
  </Router>
);
render(routing, document.querySelector('#root'));
