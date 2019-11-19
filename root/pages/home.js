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
        console.log('@@@@@@@props'+JSON.stringify(props,null,2))
        this.theme={
            tintColor:props.activeTintColor,
            updateTime:new Date().getTime(),
        }
    }
    render(){
        console.log('@@@@@@@slw4444'+JSON.stringify(this.props.navigation.state,null,2))
        const {routes,index} = this.props.navigation.state;
        console.log('#####'+JSON.stringify(this.props.navigation,null,2))
        if(routes[index].params){
            const {theme} = routes[index].params;
            //以最新的更新时间为主，防止被其他tab之前的修改覆盖掉
            if(theme && theme.updateTime > this.theme.updateTime){
                this.theme = theme;
            }
        }
        return <BottomTabBar
        {...this.props}
        activeTintColor={this.theme.tintColor}
        />
    }
}
export default class HomePage extends Component {
    render() {
        NavigationUtil.navigation=this.props.navigation;
        const BottomTab = createAppContainer(createBottomTabNavigator(Tabs, {
            tabBarComponent:TabBarComp
        })
        )

        return <BottomTab/>

    }
}