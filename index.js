/*
 * @Author: your name
 * @Date: 2019-11-10 13:58:58
 * @LastEditTime: 2019-11-19 19:51:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \reactNativeProject\myapp\index.js
 */
/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { createAppContainer } from 'react-navigation';

AppRegistry.registerComponent(appName, () => App);
