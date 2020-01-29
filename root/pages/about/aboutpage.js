/*
 * @Author: slivens
 * @Date: 2019-11-12 10:09:10
 * @LastEditTime : 2020-01-07 17:07:40
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \reactNativeProject\myapp\root\pages\my.js
 */
import React, { Component } from 'react';
import { View, Text, TextInput,Button,TouchableOpacity,ScrollView,StyleSheet,Linking} from 'react-native';
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
class AboutPage extends Component {
  constructor(props){
    super(props)
    this.params=this.props.navigation.state.params;
    this.state={
        data:config
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
getItem=(menu)=>{
    return viewUtil.getMenuItem(()=>this.onClick(menu),menu,'#678')
}
    render() {
        const content=<View>
            {this.getItem(MORE_MENUE.Tutorial)}
            <View style={GlobalStyles.line}/>
            {this.getItem(MORE_MENUE.About_Author)}
            <View style={GlobalStyles.line}/>
            {this.getItem(MORE_MENUE.Feedback)}
        </View>
        return this.aboutCommon.render(content,this.state.data.app)
    }
}

export default AboutPage;