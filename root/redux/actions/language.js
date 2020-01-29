/*
 * @Author: your name
 * @Date: 2020-01-08 16:41:46
 * @LastEditTime : 2020-01-09 11:12:44
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \reactNativeProject\myapp\root\redux\actions\language.js
 */
import LanguageDao from '../../dao/LanguageDao';
import Types from '../actiontypes';
 const onloadLanguage=(flagKey)=>{
     console.log('@@@@`111111',flagKey)
    return async dispatch=>{
        try {
            let language=await new LanguageDao(flagKey).fetch();
            console.log('@@@@@@@language',language)
            dispatch({type:Types.LANGUAGE_LOAD_SUCCESS,language,flagKey})
        } catch (error) {
            console.log(error)
        }
    }
    }
    export default onloadLanguage;