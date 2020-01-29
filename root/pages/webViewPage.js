/*
 * @Author: your name
 * @Date: 2019-12-18 17:01:36
 * @LastEditTime : 2020-01-06 09:41:32
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \reactNativeProject\myapp\root\pages\detailPage.js
 */
import React, { Component } from 'react';
import {View,Text,Platform,StyleSheet,TouchableOpacity} from 'react-native';
import { WebView } from 'react-native-webview';
import NavigatorComp from '../components/NavigationBar';
import viewUtil from '../util/viewUtil';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import NavigationUtil from './dynamicTabNavigator';
import BackPressComp from '../components/BackPressComp';
import FavoriteDao from '../dao/FavoriteDao';
const TRENDING_URL="https://github.com/";

class webviewPage extends Component { 
    constructor(props){
        super(props)
        this.params=this.props.navigation.state.params;
        const {title,url}=this.params;
        this.state={
            title:title,
            url:url,
            cangoBack:false,
        }
        this.backPress=new BackPressComp({backPress:()=>this.onBackPress()})
    }
    onBackPress=()=>{
        this.onBack();
        return true;
    }
    componentDidMount() {
        this.backPress.componentDidMount()
    }
    componentWillUnmount(){
        this.backPress.componentWillUnmount()
    }
   
    onNavigationStateChange=(navState)=>{
        this.setState({
            cangoBack:navState.canGoBack,
            url:navState.url
        })
    }
    onBack=()=>{
        if(this.state.cangoBack){
            this.webview.goBack();
        }else{
            
            NavigationUtil.goBack(this.props.navigation);
        }
    }
    render() {
        let navigatorBar=<NavigatorComp
            title={this.state.title}
            style={{backgroundColor:"#678"}}
            leftButton={viewUtil.getLeftBackButton(()=>this.onBackPress())}
        />
        return (
            <View style={styles.container}> 
                {navigatorBar}
                <WebView
                    ref={webview=>this.webview=webview}
                    startInLoadingState={true}
                    onNavigationStateChange={e=>this.onNavigationStateChange(e)}
                    source={{uri:this.state.url}}
                />
            </View>
        );
    }
}
const styles=StyleSheet.create({
    container:{
        flex:1,
       
    }
})

export default webviewPage;