import React, { useEffect, useState } from 'react';
import './App.css';
import { Route, Switch, Link } from 'react-router-dom';
import Home from './components/Home/Home';
import Channel from './components/Channel/Channel';
import Test from './components/Test/Test';
import { Provider } from 'react-redux';
import store from './store';
import socket from './socket';

function App() {
  return (
    <div className='App'>
      <Provider store={store}>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/channel' component={Channel} />
          <Route exact path='/test/:name' component={Test} />
        </Switch>
      </Provider>
    </div>
  );
}

export default App;
