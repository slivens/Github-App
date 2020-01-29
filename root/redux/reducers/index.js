/*
 * @Author: your name
 * @Date: 2019-11-19 10:39:27
 * @LastEditTime : 2020-01-28 14:37:19
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \reactNativeProject\myapp\root\redux\reducers\index.js
 */
import { combineReducers } from 'redux';
import { navReducer } from '../../components/navigator';
import Types from '../actiontypes';
import language from './lang';
import ThemeReducer from './themeReducer';
const defaultState = {
    theme: "blue"
}
/**
 * popular:{
 *      java:{
 *              items:[],
 *              isLoading:false
 * }
 * }
 * @param {*} state 
 * @param {*} action 
 */
const ChangeTheme = (state = defaultState, action) => {
    switch (action.type) {
        case "CHANGE_THEME":
            return {
                ...state,
                theme: action.theme
            }
        default:
            return state;
    }
}
const FetchData = (state={}, action) => {
    switch (action.type) {
        case Types.LOAD_POPULAR_SUCCESS:
            return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    items: action.items, //原始数据
                    projectModels:action.projectModels, //此次加载的数据
                    isLoading: false,
                    hideLoadingMore:false,
                    pageIndex:action.pageIndex
                }
            };
            case Types.POPULAR_REFRESH:
                return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    isLoading: true,
                    hideLoadingMore:true,

                }
            };
            case Types.LOAD_POPULAR_FALL:
                return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    isLoading: false
                }
            };
            case Types.POPULAR_LOAD_MORE_SUCCESS:
                return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    projectModels:action.projectModels,
                    hideLoadingMore: false,
                    pageIndex:action.pageIndex,
                }
            };
            case Types.POPULAR_LOAD_MORE_FALL:
                return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    hideLoadingMore: true,
                    pageIndex:action.pageIndex,
                }
            };
            case Types.FLUSH_POPULAR_FAVORITE:
                return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    projectModels:action.projectModels,
                }
            };
        default:
            return state;
    }
}
const FetchDataTrending = (state={}, action) => {
    switch (action.type) {
        case Types.TRENDING_REFRESH_SUCCESS:
            return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    items: action.items, //原始数据
                    projectModels:action.projectModels, //此次加载的数据
                    isLoading: false,
                    hideLoadingMore:false,
                    pageIndex:action.pageIndex
                }
            };
            case Types.TRENDING_REFRESH:
                return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    isLoading: true,
                    hideLoadingMore:true,

                }
            };
            case Types.TRENDING_REFRESH_FAIL:
                return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    isLoading: false
                }
            };
            case Types.TRENDING_LOAD_MORE_SUCCESS:
                return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    projectModels:action.projectModels,
                    hideLoadingMore: false,
                    pageIndex:action.pageIndex,
                }
            };
            case Types.TRENDING_LOAD_MORE_FAIL:
                return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    hideLoadingMore: true,
                    pageIndex:action.pageIndex,
                }
            };
            case Types.FLUSH_TRENDING_FAVORITE:
                return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    projectModels:action.projectModels,
                }
            };
        default:
            return state;
    }
}
const FavoriteReducer=(state={}, action)=>{
    switch (action.type) {
        case Types.FAVORITE_LOAD_DATA:
            return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    items: action.items, //原始数据
                    projectModels:action.projectModels, //此次加载的数据
                    isLoading: true,
                }
            };
            case Types.FAVORITE_LOAD_SUCCESS:
                return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    projectModels:action.projectModels,
                    isLoading: false,
                  

                }
            };
            case Types.FAVORITE_LOAD_FAIL:
                return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    isLoading: false
                }
            };
          
        default:
            return state;
    }
}
const index = combineReducers({
    nav: navReducer,
    ChangeTheme,
    FetchData,
    FetchDataTrending,
    FavoriteReducer,
    language,
    ThemeReducer
})

export default index;