import React, { Component } from 'react';
import {View,Text} from 'react-native';
class DynamicNavigator  {
    static goPage(page,params={}){
        const navigation=DynamicNavigator.navigation;
        if(!navigation){
            console.log('@@@@@navigation can not be null')
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