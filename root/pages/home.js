/*
 * @Author: your name
 * @Date: 2019-11-12 10:08:57
 * @LastEditTime : 2020-01-29 17:19:09
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \reactNativeProject\myapp\root\pages\home.js
 */
import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { createBottomTabNavigator,BottomTabBar } from 'react-navigation-tabs';
import { createAppContainer } from "react-navigation";
import Like from '../pages/like';
import Trend from '../pages/trend';
import My from '../pages/my';
import Popular from '../pages/popular';
import Icon from 'react-native-vector-icons/Ionicons';
import NavigationUtil from './dynamicTabNavigator';
import {connect} from 'react-redux';
import EventBus from 'react-native-event-bus';
import EventTypres from '../util/EventTypes';
import CustomeThemePage from './customeTheme';
import { onShowCustomThemeView } from '../redux/actions/theme';
import actions from '../redux/actions';
const Tabs = {
    Home: {
        screen: Popular,
        navigationOptions: {
            tabBarLabel: "首页",
            tabBarIcon: ({ focused, horizontal, tintColor }) => <Icon name={"ios-home"} size={24} color={tintColor} />
        }

    },
    Trend: {
        screen: Trend,
        navigationOptions: {
            tabBarLabel: "趋势",
            tabBarIcon: ({ focused, horizontal, tintColor }) => <Icon name={"ios-trending-up"} size={24} color={tintColor} />
        }

    },
    Like: {
        screen: Like,
        navigationOptions: {
            tabBarLabel: "收藏",
            tabBarIcon: ({ focused, horizontal, tintColor }) => <Icon name={"ios-heart"} size={24} color={tintColor} />
        }
    },
    My: {
        screen: My,
        navigationOptions: {
            tabBarLabel: "我的",
            tabBarIcon: ({ focused, horizontal, tintColor }) => <Icon name={"ios-person"} size={24} color={tintColor} />
        }
    }
}
class TabBarComp extends Component{
    constructor(props){
        super(props);
        this.theme={
            tintColor:props.activeTintColor,
            updateTime:new Date().getTime(),
        }
    }
    render(){
        const {routes,index} = this.props.navigation.state;
        if(routes[index].params){
            const {theme} = routes[index].params;
            //以最新的更新时间为主，防止被其他tab之前的修改覆盖掉
            if(theme && theme.updateTime > this.theme.updateTime){
                this.theme = theme;
            }
        }
        return <BottomTabBar
        {...this.props}
        activeTintColor={this.props.theme}
        />
    }
}
 class HomePage extends Component {
    // rederCustomThemeView=()=>{
    //     const {customThemeViewVisible,onShowCustomThemeView}=this.props;
    //     return (
    //         <CustomeThemePage
    //             visible={customThemeViewVisible}
    //             {...this.props}
    //             onClose={()=>onShowCustomThemeView(false)}
    //         />
    //     )
    // }
    render() {
        NavigationUtil.navigation=this.props.navigation;
            const {Home,Trend,Like,My}=Tabs;
            const newTabs={Home,Trend,Like,My}
            if(this.BottomTab){
                return <this.BottomTab/>
            }
            this.BottomTab = createAppContainer(createBottomTabNavigator(newTabs, {
            tabBarComponent:(props)=><TabBarComp
            {...props} theme={this.props.theme}/>
        })
        )

        return(
            <View style={{flex:1}}>
                <this.BottomTab
                    onNavigationStateChange={(preState,newState,action)=>{
                        EventBus.getInstance().fireEvent(EventTypres.bottom_tab_select,{
                            from:preState.index,
                            to:newState.index
                        })
                    }}
                />
            </View>    
        )

    }
}
export default HomePage;
// const mapStateToProps=(state,ownprops)=>{
//     console.log('@@@@@@@@@state',state)
//     return{
//         nav:state.nav,
//         customThemeViewVisible:state.ThemeReducer.customThemeViewVisible
//     }
// }
// const mapDispatchToProps=dispatch=>({
//     onShowCustomThemeView:(show)=>dispatch(actions.onShowCustomThemeView(show))
// })
// export default connect(mapStateToProps,mapDispatchToProps)(HomePage)
