/*
 * @Author: your name
 * @Date: 2020-01-28 12:29:12
 * @LastEditTime : 2020-01-28 12:34:50
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \reactNativeProject\myapp\root\redux\reducers\themeReducer.js
 */
import Types from '../actiontypes';
import ThemeFactory, { ThemeFlags } from '../../styles/ThemeFactory';
const defaultState={
    theme:ThemeFactory.createTheme(ThemeFlags.Default),
    onShowCustomThemeView:false
}
export default function onAction(state=defaultState,action){
    switch (action.type) {
        case Types.CHANGE_THEME:
            return {
                ...state,
                theme:action.theme
            }
        case Types.SHOW_THEME_VIEW:
            return {
                ...state,
                customThemeViewVisible:action.customThemeViewVisible
            }
        default:
            return state;
    }
}