/*
 * @Author: your name
 * @Date: 2019-12-24 15:45:04
 * @LastEditTime : 2019-12-24 16:47:21
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \reactNativeProject\myapp\root\components\BackPressComp.js
 */
import React, { Component } from 'react';
import { BackHandler } from 'react-native';
class BackPressComp  {
    constructor(props){
        this.props=props;
        this.onHardwareBackPress=this.onHardwareBackPress.bind(this);
    }
    componentDidMount(){
        if(this.props.backPress){
            BackHandler.addEventListener('hardwareBackPress',this.onHardwareBackPress)
        }
    }
    componentWillUnmount(){
        if(this.props.backPress){
            BackHandler.removeEventListener('hardwareBackPress',this.onHardwareBackPress)
        }
    }
    onHardwareBackPress (e) {
        return this.props.backPress(e);
    }
}

export default BackPressComp;