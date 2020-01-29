/*
 * @Author: slivens
 * @Date: 2019-11-19 10:47:08
 * @LastEditTime: 2019-11-28 15:53:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \reactNativeProject\myapp\root\redux\store.js
 */
import {applyMiddleware, createStore} from 'redux';
// import thunk from 'redux-thunk'
import reducers from './reducers/index';
import {middleware} from '../components/navigator';
import thunk from 'redux-thunk';

const middlewares = [
    middleware,
    thunk
]

export default createStore(reducers,applyMiddleware(...middlewares))