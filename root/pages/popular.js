import React, { Component } from 'react';
import {View,Text,Button,StyleSheet} from 'react-native';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { createAppContainer,withNavigation  } from 'react-navigation';
import NavigationUtil from './dynamicTabNavigator';
import { red } from 'ansi-colors';
class PopularTab extends Component {

    render() {
        console.log('@@@@popular'+JSON.stringify(this.props))
        return (
                <View style={styles.container}>
                    <Text>
                    {this.props.tabLabel}
                    </Text>
                    <Text>
                    PopularTab
                    </Text> 
                    <View style={styles.btn}>
                    <Button
                    title="go to detail" 
                    onPress={()=>NavigationUtil.goPage('Detail')}
                    />
                    </View>
                </View>
        );
    }
}
class PopularTab2 extends Component {
    render() {
        return (
                <View>
                    <Text>
                    PopularTab23
                    </Text> 
                </View>
        );
    }
}

export default class PopularPage extends Component{
    constructor(props){
        super(props)
        this.tabNames=["Java","Android","iOS","React","React Native","PHP"]
    }
    _getTabs=()=>{
        const tabs={};
        this.tabNames.forEach((item,index)=>{
            tabs[`tab${index}`]={
                screen:(props)=><PopularTab {...props} tabLabel={item}/>,
                navigationOptions:{
                    title:item
                }
            }
        })
        return tabs;
    }
    render(){
        const TabNavigator = createAppContainer(createMaterialTopTabNavigator(
            this._getTabs(),{
                tabBarOptions:{
                    indicatorStyle:styles.indicatorStyle,
                    tabStyle:styles.tabStyle,
                    style:{backgroundColor:"#678"},
                    upperCaseLabel:false,
                    scrollEnabled:true,
                    
            }
        }
        ))
        return (
            <TabNavigator/>
        )
    }
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        alignItems:"center",
        justifyContent:"center"
    },
    indicatorStyle:{
        backgroundColor:"white",
        height:2
    },
    tabStyle:{
        minWidth:50,
    },
    btn:{
        // width:200,
        // alignItems:"center",
        // justifyContent:"center"
    }
})