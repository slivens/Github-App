/*
 * @Author: your name
 * @Date: 2019-11-19 10:39:27
 * @LastEditTime: 2019-11-19 16:57:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \reactNativeProject\myapp\root\redux\reducers\index.js
 */
import {combineReducers} from 'redux';
import theme from './theme';
import {RootNavigator} from '../../../App';
import {createNavigationReducer} from 'react-navigation-redux-helpers';


const navReducer = createNavigationReducer(RootNavigator);
export default combineReducers({
    nav:navReducer,
    // theme
})