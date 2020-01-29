/*
 * @Author: slivens
 * @Date: 2019-11-20 14:42:48
 * @LastEditTime : 2020-01-28 12:26:43
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \reactNativeProject\myapp\root\redux\actions\index.js
 */
import Types from '../actiontypes';
import DataStore, { FLAG_STORAGE } from '../../dao/asyncStorage';
import Utils from '../../util/Utils';
import ProjectModels from '../../model/ProjectModel';
import FavoriteDao from '../../dao/FavoriteDao';
import onloadLanguage from './language';
import {onThemeChange,onThemeInit,onShowCustomThemeView} from '../actions/theme';
const onChangeTheme=(theme)=>{
    return {
        type:"CHANGE_THEME",
        theme
    }
}
/**
 * @description:获取最热数据的异步actions操作 
 * @param {type} 
 * @return: 
 */
const onLoadPopularData=(storeName,url,pageSize,favoriteDao)=>{
    return dispatch=>{
        dispatch({type:Types.POPULAR_REFRESH,storeName});
        let dataStore=new DataStore();
        dataStore.fetchData(url,FLAG_STORAGE.flag_popular)
        .then(data=>{
            handleData(Types.LOAD_POPULAR_SUCCESS,dispatch,storeName,data,pageSize,favoriteDao)
        })
        .catch(err=>{
            console.log(err)
            dispatch({
                type:Types.LOAD_POPULAR_FALL,
                storeName,
                err
            })
        })
    }
}
const handleData=(actionTypes,dispatch,storeName,data,pageSize,favoriteDao)=>{
    let fixItems=[];
    if(data&&data.data){
        if(Array.isArray(data.data)){
            fixItems=data.data;
        }else if(Array.isArray(data.data.items)){
            fixItems=data.data.items;
        }
    }
    const showItems=pageSize>fixItems.length?fixItems:fixItems.slice(0,pageSize)
    _projectModels(showItems,favoriteDao,projectModels=>{
        dispatch({
            type:actionTypes,
            items:fixItems,
            projectModels:projectModels,//第一次加载的数据
            storeName,
            pageIndex:1
        })
    })
    
}
/**
 * 
 * @param {*} storeName 
 * @param {*} pageIndex 第几页
 * @param {*} pageSize  每页多少
 * @param {*} dataArray 原始数据
 * @param {*} callBack 回调函数
 */
const onLoadMorePopular=(storeName,pageIndex,pageSize,dataArray=[],favoriteDao,callBack)=>{
    return dispatch=>{
        setTimeout(()=>{
            if((pageIndex-1)*pageSize>=dataArray.length){ //如果上一次已经加载完全部的数据
                if(typeof(callBack)==="function"){
                    callBack('no more')
                }
                dispatch({
                    type:Types.POPULAR_LOAD_MORE_FALL,
                    error:"no more",
                    storeName:storeName,
                    pageIndex:--pageIndex,
                    // projectModels:dataArray
                })
            }else{
                let max=pageSize*pageIndex>dataArray.length?dataArray.length:pageSize*pageIndex;
                _projectModels(dataArray.slice(0,max),favoriteDao,data=>{

                    dispatch({
                        type:Types.POPULAR_LOAD_MORE_SUCCESS,
                        storeName,
                        pageIndex,
                        projectModels:data
                    })
                })
            }
        },500)
    }
}
const onLoadMoreTrending=(storeName,pageIndex,pageSize,dataArray=[],favoriteDao,callBack)=>{
    return dispatch=>{
        setTimeout(()=>{
            if((pageIndex-1)*pageSize>=dataArray.length){ //如果上一次已经加载完全部的数据
                if(typeof(callBack)==="function"){
                    callBack('no more')
                }
                dispatch({
                    type:Types.TRENDING_LOAD_MORE_FAIL,
                    error:"no more",
                    storeName:storeName,
                    pageIndex:--pageIndex,
                    // projectModels:dataArray
                })
            }else{
                let max=pageSize*pageIndex>dataArray.length?dataArray.length:pageSize*pageIndex;
                _projectModels(dataArray.slice(0,max),favoriteDao,data=>{

                    dispatch({
                        type:Types.TRENDING_LOAD_MORE_SUCCESS,
                        storeName,
                        pageIndex,
                        projectModels:data
                    })
                })
            }
        },500)
    }
}
const onFreshTrending=(storeName,url,pageSize,favoriteDao)=>{
    return dispatch=>{
        dispatch({type:Types.TRENDING_REFRESH,storeName});
        let dataStore=new DataStore();
        dataStore.fetchData(url,FLAG_STORAGE.flag_trending)
        .then(data=>{
            handleData(Types.TRENDING_REFRESH_SUCCESS,dispatch,storeName,data,pageSize,favoriteDao)
        })
        .catch(err=>{
            console.log(err)
            dispatch({
                type:Types.LOAD_POPULAR_FALL,
                storeName,
                err
            })
        })
    }
}
const onLoadFavoriteData=(flag,isShowLoading)=>{
    return dispatch=>{
        if(isShowLoading){
            
            dispatch({type:Types.FAVORITE_LOAD_DATA,storeName:flag});
        }
        let dataStore=new DataStore();
        new FavoriteDao(flag).getAllItems()
        .then(items=>{
            let resultData=[];
            for (let i=0,len=items.length;i<len;i++){
                resultData.push(new ProjectModels(items[i],true))
            }
            dispatch({type:Types.FAVORITE_LOAD_SUCCESS,projectModels:resultData,storeName:flag})
        })
        .catch(e=>{
            console.log(e);
            dispatch({
                type:Types.FAVORITE_LOAD_FAIL,
                error:e,
                storeName:flag
            })
        })
    }
}
export async function _projectModels (showItems,favoriteDao,callBack) {
    let keys=[];
    try {
        //获取收藏的key
     keys=await favoriteDao.getFavoriteKeys();
        
    } catch (error) {
        console.log(error)
    }
    let projectModels=[];
    for(let i=0,len=showItems.length;i<len;i++){
        projectModels.push(new ProjectModels(showItems[i],Utils.checkFavorite(showItems[i],keys)))
    }
    if(typeof callBack=== 'function'){
        callBack(projectModels);
    }
}
export const onFreshPopularFavorite=(storeName,pageIndex,pageSize,dataArray=[],favoriteDao)=>{
    return dispatch=>{
        let max=pageSize*pageIndex>dataArray.length?dataArray.length:pageSize*pageIndex;
        _projectModels(dataArray.slice(0,max),favoriteDao,data=>{

            dispatch({
                type:Types.FLUSH_POPULAR_FAVORITE,
                storeName,
                pageIndex,
                projectModels:data
            })
        })
    }
}
export const onFreshTrendingFavorite=(storeName,pageIndex,pageSize,dataArray=[],favoriteDao)=>{
    return dispatch=>{
        let max=pageSize*pageIndex>dataArray.length?dataArray.length:pageSize*pageIndex;
        _projectModels(dataArray.slice(0,max),favoriteDao,data=>{

            dispatch({
                type:Types.FLUSH_TRENDING_FAVORITE,
                storeName,
                pageIndex,
                projectModels:data
            })
        })
    }
}
export default{
    onChangeTheme,
    onLoadPopularData,
    onLoadMorePopular,
    onLoadMoreTrending,
    onFreshTrending,
    onLoadFavoriteData,
    onFreshPopularFavorite,
    onFreshTrendingFavorite,
    onloadLanguage,
    onThemeChange,
    onThemeInit,
    onShowCustomThemeView
}