import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from './components/Login'
import Home from './components/Home';
import TransactionDetails from './components/TransactionDetails';
import ViewPassBook from './components/ViewPassBook';
import CurrentMonthDetails from './components/CurrentMonthDetails'

function App() {
  return (
    <BrowserRouter basename="/my-finance-manager">
      <div className="App">
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/home" component={Home} />
          <Route path="/transaction_details" component={TransactionDetails} />
          <Route path="/passbook" component={ViewPassBook} />
          <Route path="/monthly_details" component={CurrentMonthDetails} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
