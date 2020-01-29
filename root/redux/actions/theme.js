/*
 * @Author: your name
 * @Date: 2020-01-28 12:18:11
 * @LastEditTime : 2020-01-28 15:10:18
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \reactNativeProject\myapp\root\redux\actions\theme.js
 */
import Types from  '../actiontypes';
import ThemeDao from '../../dao/ThemeDao';

export function onThemeChange(theme){
    return {
        type:Types.CHANGE_THEME,
        theme
    }
}

export function onThemeInit(){
    return dispatch=>{
        new ThemeDao().getTheme().then((data)=>{
            dispatch(onThemeChange(data))
        })
    }
}
/**
 * @description: 显示自定义主题浮层 
 * @param {type} 
 * @return: 
 */
export function onShowCustomThemeView(show){
    return {
        type:Types.SHOW_THEME_VIEW,
        customThemeViewVisible:show
    }
}
