import React from 'react';
import store from './root/redux/store';
import {Provider} from 'react-redux';
import AppWithNavigationState from './root/components/navigator';

export default class App extends React.Component{
  render(){
      return <Provider store={store}>
          <AppWithNavigationState/>
      </Provider>
  }
}
