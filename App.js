import React from 'react';
import { View, Text, Button } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createSwitchNavigator } from 'react-navigation';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import HomePage from './root/pages/home';
import Detail from './root/pages/detail';
import Welcome from './root/pages/welcome';
import {createReduxContainer, createReactNavigationReduxMiddleware,createNavigationReducer} from 'react-navigation-redux-helpers';
import {connect, Provider} from 'react-redux';
import store from './root/redux/store';
import { createAppContainer } from 'react-navigation';
const InitNavigator = createStackNavigator(
  {
    WelcomePage: {
      screen: Welcome,
      navigationOptions: {
        header: null
      }
    }
  }
)
const MainNavigator = createStackNavigator(
  {
    Home: {
      screen: HomePage,
      navigationOptions: {
        header: null
      }
    },
    Detail: {
      screen: Detail
    }
  }
)
 export const RootNavigator  = createAppContainer(createSwitchNavigator({
  Init: InitNavigator,
  Main: MainNavigator
}, {
  navigationOptions: {
    header: null
  }
}))
//注册中间件
 export const middleware = createReactNavigationReduxMiddleware(
   state => state.nav,
  "root",
)
//使用中间件
const RN = createReduxContainer(MainNavigator, 'root')
const mapStateToProps = (state) => ({
    state: state.nav,
})
const AppWithNavigationState = connect(mapStateToProps)(RN)

export default class App extends React.Component{
  render(){
      return <Provider store={store}>
          <AppWithNavigationState/>
      </Provider>
  }
}
