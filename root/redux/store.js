/*
 * @Author: slivens
 * @Date: 2019-11-19 10:47:08
 * @LastEditTime: 2019-11-19 11:01:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \reactNativeProject\myapp\root\redux\store.js
 */
import {applyMiddleware, createStore} from 'redux';
// import thunk from 'redux-thunk'
import reducers from './reducers';
import {middleware} from '../../App';

const middlewares = [
    middleware
]

export default createStore(reducers,applyMiddleware(...middlewares))