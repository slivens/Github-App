/*
 * @Author: slivens
 * @Date: 2019-11-20 10:24:36
 * @LastEditTime : 2020-01-27 21:45:26
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \reactNativeProject\myapp\root\components\navigator\index.js
 */
import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createSwitchNavigator } from 'react-navigation';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import HomePage from '../../pages/home';
import Detail from '../../pages/detailPage';
import Welcome from '../../pages/welcome';
import WebviewPage from '../../pages/webViewPage';
import AboutPage from '../../pages/about/aboutpage';
import AboutMePage from '../../pages/about/aboutmePage';
import {createReduxContainer, createReactNavigationReduxMiddleware,createNavigationReducer} from 'react-navigation-redux-helpers';
import { createAppContainer } from 'react-navigation';
import {connect} from 'react-redux';
import Storage from '../../pages/dataStorage';
import CustomKeyPage from '../../pages/customKeyPage';
import SortKeyPage from '../../pages/sortkeypage';
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
      screen: Detail,
      navigationOptions: {
        header: null
      }
    },
    WebviewPage: {
      screen: WebviewPage,
      navigationOptions: {
        header: null
      }
    },
    AboutPage: {
      screen: AboutPage,
      navigationOptions: {
        header: null
      }
    },
    AboutMePage: {
      screen: AboutMePage,
      navigationOptions: {
        header: null
      }
    },
    CustomKeyPage: {
      screen: CustomKeyPage,
      navigationOptions: {
        header: null
      }
    },
    SortKeyPage: {
      screen: SortKeyPage,
      navigationOptions: {
        header: null
      }
    },
    Storage:{
      screen:Storage
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
export const navReducer = createNavigationReducer(RootNavigator);
//注册中间件
 export const middleware = createReactNavigationReduxMiddleware(
   state => state.nav,
  "root",
)
//使用中间件
const RN = createReduxContainer(RootNavigator, 'root')
const mapStateToProps = (state) => ({
    state: state.nav,
})
export default connect(mapStateToProps)(RN)