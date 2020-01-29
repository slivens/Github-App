/*
 * @Author: slivens
 * @Date: 2019-11-12 10:09:10
 * @LastEditTime : 2020-01-27 20:36:38
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \reactNativeProject\myapp\root\pages\my.js
 */
import React, { Component } from 'react';
import { View, Text, TextInput,Button,TouchableOpacity,ScrollView,StyleSheet,Linking,Clipboard} from 'react-native';
import DataStorageUntil from '../../dao/asyncStorage';
import NavigatorBar from '../../components/NavigationBar';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MoreMenu from '../../components/MORE_MENUE';
import GlobalStyles from '../../common/GlobalStyles';
import viewUtil from '../../util/viewUtil';
import MORE_MENUE from '../../components/MORE_MENUE';
import NavigationUtil from '../dynamicTabNavigator';
import AboutCommon, { FLAG_ABOUT } from './AboutCommon';
import config from '../../data/github.json';
import ViewUtils from '../../util/viewUtil';
import DynamicNavigator from '../dynamicTabNavigator';
import Toast from 'react-native-easy-toast';
class AboutmePage extends Component {
  constructor(props){
    super(props)
    this.params=this.props.navigation.state.params;
    this.state={
        data:config,
            author: {},
            showRepository: false,
            showTurial:true,
            showBlog: false,
            showQQ: false,
            showContact: false,
    }
    this.aboutCommon=new AboutCommon({
        ...this.params,
        navigation:this.props.navigation,
        flagAbout:FLAG_ABOUT.flag_about_me,
    },data=>this.setState({data:{...data}}))
  }
onClick=(menu)=>{
    let RouteName,params={}
    switch (menu) {
        case MORE_MENUE.Tutorial:
            RouteName="WebviewPage";
            params.title="教程";
            params.url="https://www.cnblogs.com/slivens/";
            break;
            case MORE_MENUE.Feedback:
            const url='mailto://460529511@qq.com';
            Linking.canOpenURL(url).then(res=>{
                if(!res){
                    console.log('can not support!')
                }else{
                    Linking.openURL(url)
                }
            }).catch(e=>{
                console.log(e)
            })
            break;
        default:
            break;
    }
    if(RouteName){
        NavigationUtil.goPage(RouteName,params)
    }
}
ItemClick=(tab)=>{
    if(!tab) return;
    if(tab.url){
        DynamicNavigator.goPage('WebviewPage',{
            title:tab.title,
            url:tab.url
        })
        return;
    }
    if(tab.account&&tab.account.indexOf('@')>-1){
        let url='mailto://'+tab.account;
        Linking.canOpenURL(url).then(res=>{
            if(!res){
                console.log('not do')
            }else{
                return Linking.openURL(url)
            }
        }).catch(err=>console.error("an error occurred",err))
    }
    if(tab.account){
        Clipboard.setString(tab.account);
        this.toast.show(tab.title+tab.account+'已复制到剪贴板。')
    }
}
getItem=(menu)=>{
    return viewUtil.getMenuItem(()=>this.onClick(menu),menu,'#678')
}
_item=(data,isShow,key)=>{
    return viewUtil.getSettingItem(()=>{
        this.setState({
            [key]:!this.state[key]
        })
    },data.name,"#678",Ionicons,data.icon,isShow?"ios-arrow-up":"ios-arrow-down")
}
renderItems(dic,isShowAccount){
    if(!dic) return null;
    let views=[];
    for(let i in dic){
        let title = isShowAccount ? dic[i].title + ':' + dic[i].account : dic[i].title;
        views.push(
            <View key={i}>
            {ViewUtils.getSettingItem(()=>this.ItemClick(dic[i]), title, '#678')}
            <View style={GlobalStyles.line}/>
            </View>
        )
    }
    return views;
}
    render() {
        const content=<View>
            {this._item(this.state.data.aboutMe.Tutorial,this.state.showTurial,'showTurial') }
            <View style={GlobalStyles.line}/>
            {this.state.showTurial?this.renderItems(this.state.data.aboutMe.Tutorial.items):null}
            {this._item(this.state.data.aboutMe.Contact,this.state.Contact,'Contact') }
            <View style={GlobalStyles.line}/>
            {this.state.Contact?this.renderItems(this.state.data.aboutMe.Contact.items,true):null}
        </View>
        return <View style={{flex:1}}>
                {this.aboutCommon.render(content,this.state.data.author)}
                <Toast 
                    ref={ref=>this.toast=ref}
                    position={'center'}
                />
            </View>
    }
}

export default AboutmePage;