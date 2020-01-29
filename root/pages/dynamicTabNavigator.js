/*
 * @Author: your name
 * @Date: 2019-11-15 10:22:50
 * @LastEditTime : 2020-01-06 09:15:36
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \reactNativeProject\myapp\root\pages\dynamicTabNavigator.js
 */
import React, { Component } from 'react';
import {View,Text} from 'react-native';
class DynamicNavigator  {
    static goPage(page,params={}){
        const navigation=DynamicNavigator.navigation;
        if(!navigation){
            return 
        }
        navigation.navigate(
            page,
            {...params}
        )
    }
    static goBack(navigation){
        navigation.goBack()
    }
}

export default DynamicNavigator;