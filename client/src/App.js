import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Home from './components/Home/Home';
import Channel from './components/Channel/Channel';
import Test from './components/Test/Test';
import { Provider } from 'react-redux';
import store from './store';
import {
  receiveRoomMessage,
  receiveMessage,
  getUserRooms,
  getOnline
} from './redux/actions/appActions';

function App() {
  store.dispatch(receiveRoomMessage());
  store.dispatch(receiveMessage());
  store.dispatch(getUserRooms());
  store.dispatch(getOnline());
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
