/*
 * @Author: slivens
 * @Date: 2019-11-12 10:09:10
 * @LastEditTime : 2020-01-28 16:43:33
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \reactNativeProject\myapp\root\pages\my.js
 */
import React, { Component } from 'react';
import { View, Text, TextInput,Button,TouchableOpacity,ScrollView,StyleSheet} from 'react-native';
import DataStorageUntil from '../dao/asyncStorage';
import NavigatorBar from '../components/NavigationBar';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MoreMenu from '../components/MORE_MENUE';
import GlobalStyles from '../common/GlobalStyles';
import viewUtil from '../util/viewUtil';
import MORE_MENUE from '../components/MORE_MENUE';
import NavigationUtil from './dynamicTabNavigator';
import { FLAG_LANGUAGE } from '../dao/LanguageDao';
import actions from '../redux/actions';
import {connect} from 'react-redux';
import CustomeThemePage from './customeTheme';
class My extends Component {
    state={
        inputvalue:"",
        content:""
    }
   getRightBtn=()=>{
       return <View
            style={{flexDirection:"row"}}>
        <TouchableOpacity
            onPress={()=>{}}
        >
            <View style={{padding:5,marginRight:8}}>
                <Feather
                    name={'search'}
                    size={24}
                    style={{color:"white"}}
                />
            </View>
        </TouchableOpacity>
       </View>
   }
   getLeftBtn=(callback)=>{
    return <View
         style={{flexDirection:"row"}}>
        <TouchableOpacity
         onPress={()=>{}}
     >
         <View style={{padding:5,marginRight:8}}>
             <Ionicons
                 name={'ios-arrow-back'}
                 size={26}
                 style={{color:"white"}}
             />
         </View>
     </TouchableOpacity>
    
    
    </View>
}
onClick=(menu)=>{
    let RouteName,params={}
    switch (menu) {
        case MORE_MENUE.Tutorial:
            RouteName="WebviewPage";
            params.title="教程";
            params.url="https://www.cnblogs.com/slivens/"
            break;
            case MORE_MENUE.About:
                RouteName="AboutPage";
            break;
            case MoreMenu.Sort_Key:
                RouteName='SortKeyPage';
                params.flag=FLAG_LANGUAGE.flag_key;
            break;
            case MoreMenu.Sort_Language:
                RouteName='SortKeyPage';
                params.flag=FLAG_LANGUAGE.flag_language;
            break;
            case MoreMenu.Custom_theme:
                const {onShowCustomThemeView}=this.props;
                onShowCustomThemeView(true);
            break;
            case MORE_MENUE.Custom_Key:
            case MORE_MENUE.Custom_Language:
            case MORE_MENUE.Remove_Key:
                 RouteName="CustomKeyPage";
                params.isRemoveKey=menu===MORE_MENUE.Remove_Key;
                params.flag=menu!==MORE_MENUE.Custom_Language?FLAG_LANGUAGE.flag_key:FLAG_LANGUAGE.flag_language;
            break;
            case MORE_MENUE.About_Author:
                RouteName="AboutMePage";
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
rederCustomThemeView=()=>{
    const {customThemeViewVisible,onShowCustomThemeView}=this.props;
    return (
        <CustomeThemePage
            visible={customThemeViewVisible}
            {...this.props}
            onClose={()=>onShowCustomThemeView(false)}
        />
    )
}
    render() {
        const {theme}=this.props;
        const {inputvalue,content}=this.state;
        return (
            <View style={styles.container}>
            <NavigatorBar
                title="我的"
                leftButton={this.getLeftBtn()}
            />
            <ScrollView>
                <TouchableOpacity
                    style={styles.item}
                    onPress={()=>this.onClick(MoreMenu.About)}
                >   
                <View style={styles.about_left}>
                <Ionicons
                 name={MoreMenu.About.icon}
                 size={40}
                 style={{
                     marginRight:10,
                     color:"#678"
                 }}
                /> 
                <Text>GitHub Popular</Text>
                </View>
                <Ionicons
                 name={'ios-arrow-forward'}
                 size={16}
                 style={{
                     marginRight:10,
                     color:"#678",
                     alignSelf:"center"
                 }}
                /> 
                </TouchableOpacity>
                <View style={GlobalStyles.line}/>
                {this.getItem(MORE_MENUE.Tutorial)}
                {/* 趋势管理 */}
                <Text style={styles.groupTitle}> 趋势管理 </Text>
                {/* 自定义语言 */}
                {this.getItem(MoreMenu.Custom_Language)}
                {/* 语言排序 */}
                <View style={GlobalStyles.line}/>
                {this.getItem(MoreMenu.Sort_Language)}
                {/* 最热管理 */}
                <Text style={styles.groupTitle}> 最热管理 </Text>
                {this.getItem(MORE_MENUE.Custom_Key)}
                <View style={GlobalStyles.line}/>
                {this.getItem(MORE_MENUE.Sort_Key)}
                <View style={GlobalStyles.line}/>
                {this.getItem(MORE_MENUE.Remove_Key)}
                {/* 设置 */}
                <Text style={styles.groupTitle}> 关于 </Text>
                {this.getItem(MORE_MENUE.About_Author)}
                <View style={GlobalStyles.line}/>
                {/*{this.getItem(MORE_MENUE.Custom_theme)}
                <View style={GlobalStyles.line}/>
                {this.getItem(MORE_MENUE.Feedback)}*/}
            </ScrollView>
            {this.rederCustomThemeView()}
            </View>
        );
    }
}
const mapStateToProps=state=>({
    nav:state.nav,
    customThemeViewVisible:state.ThemeReducer.customThemeViewVisible,
    theme:state.ThemeReducer.theme
});
const mapDispatchToProps=dispatch=>({
    onShowCustomThemeView:show=>dispatch(actions.onShowCustomThemeView(show))
})
export default connect(mapStateToProps,mapDispatchToProps)(My);
const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#f5f5f5"
    },
    about_left:{
        alignItems:"center",
        flexDirection:"row"
    },
    item:{
        backgroundColor:"white",
        padding:10,
        height:90,
        alignItems:"center",
        justifyContent:"space-between",
        flexDirection:"row"
    },
    groupTitle:{
        marginLeft:10,
        marginTop:10,
        marginBottom:5,
        fontSize:12,
        color:"gray"
    }
})
