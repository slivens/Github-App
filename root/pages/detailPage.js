/*
 * @Author: your name
 * @Date: 2019-12-18 17:01:36
 * @LastEditTime : 2019-12-31 10:29:24
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

class detailPage extends Component { 
    constructor(props){
        super(props)
        this.params=this.props.navigation.state.params;
        const {projectModels,flag}=this.params;
        const {item}=projectModels;
        this.favoriteDao=new FavoriteDao(flag);
        this.url=item.html_url||TRENDING_URL+item.fullName;
        const title=item.full_name||item.fullName;
        this.state={
            title:title,
            url:this.url,
            cangoBack:false,
            isFavorite:projectModels.isFavorite
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
    onFavoriteButtonClick=()=>{
        const {projectModels,callBack}=this.params;
        const isFavorite=projectModels.isFavorite=!projectModels.isFavorite;
        callBack(isFavorite)  //更新item收藏状态
        this.setState({isFavorite:isFavorite})
        let key=projectModels.item.fullName?projectModels.item.fullName:projectModels.item.id.toString()
        if(projectModels.isFavorite){
            this.favoriteDao.saveFavoriteItem(key,JSON.stringify(projectModels.item))
        }else{
            this.favoriteDao.removeFavoriteItem(key); 
        }
    }
    renderRightButton=()=>{
        return <View
            style={{flexDirection:"row"}}
        >
        <TouchableOpacity style={{flexDirection:"row"}} 
        onPress={()=>{
            this.onFavoriteButtonClick()
        }}>
        <FontAwesome
            name={this.state.isFavorite?'star':'star-o'}
            size={26}
            style={{color:"white",marginRight:10}}
        />
            {
                viewUtil.getShareButton(()=>{

                })
            }
        </TouchableOpacity>
        </View>
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
        const titleLayoutStyle=this.state.title.length>20?{paddingRight:30}:null;
        let navigatorBar=<NavigatorComp
            leftButton={viewUtil.getLeftBackButton(()=>this.onBack())}
            title={this.state.title}
            titleLayoutStyle={titleLayoutStyle}
            style={{backgroundColor:"#678"}}
            rightButton={this.renderRightButton(()=>{})}
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

export default detailPage;