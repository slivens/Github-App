/*
 * @Author: your name
 * @Date: 2020-01-08 16:50:19
 * @LastEditTime : 2020-01-14 16:56:54
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \reactNativeProject\myapp\root\redux\reducers\lang.js
 */
import Types from '../actiontypes';
import { FLAG_LANGUAGE } from '../../dao/LanguageDao';
const defaultState={
    languages:[],
    keys:[]
}
export default function onAction(state=defaultState,action){
    switch (action.type) {
        case Types.LANGUAGE_LOAD_SUCCESS:
            if(FLAG_LANGUAGE.flag_key===action.flagKey){
                return {
                    ...state,
                    keys:action.language
                }
            }else{
                console.log('####1111222333')
                return {
                    ...state,
                    languages:action.language
                }
            }
        default:
            return state;
    }
}