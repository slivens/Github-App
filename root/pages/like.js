/*
 * @Author: your name
 * @Date: 2019-11-14 15:40:03
 * @LastEditTime : 2020-01-03 16:02:28
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \reactNativeProject\myapp\root\pages\popular.js
 */
import React, { Component } from 'react';
import {FlatList,View,Text,Button,StyleSheet,RefreshControl,ActivityIndicator } from 'react-native';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { createAppContainer,withNavigation  } from 'react-navigation';
import NavigationUtil from './dynamicTabNavigator';
import { red } from 'ansi-colors';
import {connect} from 'react-redux';
import action from '../redux/actions';
import PopularItem from '../components/popularitem';
import TrendingItem from '../components/trendingItems';
import Toast from 'react-native-easy-toast';
import NavigatorBar from '../components/NavigationBar';
import FavoriteDao from '../dao/FavoriteDao';
import { FLAG_STORAGE } from '../dao/asyncStorage';
import FavoriteUtill from '../util/FavoriteUtill';
import EventTypes from '../util/EventTypes';
const URL=`https://api.github.com/search/repositories?q=`;
import EventBus from 'react-native-event-bus';
const THEME_COLOR="red";
const QUERY_STR='&sort=stars';
const pageSize = 10;
// const favoriteDao=new FavoriteDao(FLAG_STORAGE.flag_popular)
class FavoriteTab extends Component {
    constructor(props){
        super(props)
        const {flag}=this.props;
        this.storeName=flag;
        this.favoriteDao=new FavoriteDao(flag);
    }
    componentDidMount(){
        this.loadData();
        EventBus.getInstance().addListener(EventTypes.bottom_tab_select, this.listener = data => {
            // handle the event
            if(data.to===2){
                this.loadData(false);
            }
        })
    }
    componentWillUnmount() {
        EventBus.getInstance().removeListener(this.listener);
    }
     loadData=(isShowLoading)=>{
        const {onLoadFavoriteData}=this.props;
        onLoadFavoriteData(this.storeName,isShowLoading)
    }
    renderItem=(data)=>{
        const item=data.item;
        const Item=this.storeName===FLAG_STORAGE.flag_popular?PopularItem:TrendingItem;
        return(
            <Item
            projectModel={item}
                onSelect={(callBack)=>{
                    NavigationUtil.goPage('Detail',{
                        projectModels:item,
                        flag:this.storeName,
                        callBack
                    })

                }}
                onFavorite={(item,isFavorite)=>this.onFavorite(item,isFavorite)}
            />
        ) 
    }
    onFavorite=(item,isFavorite)=>{
        FavoriteUtill.onFavorite(this.favoriteDao,item,isFavorite,this.storeName)
        if(this.storeName===FLAG_STORAGE.flag_popular){
            EventBus.getInstance().fireEvent(EventTypes.favorite_change_popular)
        }else{
            EventBus.getInstance().fireEvent(EventTypes.favorite_change_trending)
        }

    }
    _store=()=>{
        const {favorite}=this.props;
        let store=favorite[this.storeName];
        if(!store){
            store={
                items:[],
                isLoading:false,
                projectModels:[],
            }
        }
        return store
    }
    render() {
        const {popular}=this.props;
        let store=this._store();
        return (
                <View style={styles.container}>
                   <FlatList 
                        data={store.projectModels}
                        renderItem={data=>this.renderItem(data)}
                        keyExtractor={item=>""+(item.item.id||item.item.fullName)}
                        refreshControl={
                            <RefreshControl
                                title={'loading'}
                                titleColor={THEME_COLOR}
                                colors={[THEME_COLOR]}
                                refreshing={store.isLoading}
                                onRefresh={()=>this.loadData(true)}
                                tintColor={THEME_COLOR}
                            />
                            }
                   />
                   <Toast ref={"toast"}
                            position={"center"}
                   />
                </View>
        );
    }
}
export default class FavoritePage extends Component{
    constructor(props){
        super(props)
        this.tabNames=["最热","趋势"]
    }
    _getTabs=()=>{
        return {
            'Popular':{
                screen:(props)=><FavoriteTabCont {...props} flag={FLAG_STORAGE.flag_popular}/>,
                navigationOptions:{
                    title:'最热'
                }
            },
            'Trending':{
                screen:(props)=><FavoriteTabCont {...props} flag={FLAG_STORAGE.flag_trending}/>,
                navigationOptions:{
                    title:'趋势'
                }
            }
        }
        
    }
    render(){
        const TabNavigator = createAppContainer(createMaterialTopTabNavigator(
            this._getTabs(),{
                tabBarOptions:{
                    indicatorStyle:styles.indicatorStyle,
                    tabStyle:styles.tabStyle,
                    style:{backgroundColor:"#678"},
                    upperCaseLabel:false,
                    // scrollEnabled:true,
                    
            }
        }
        ))
        return (
            <View style={{flex:1}}>
            <NavigatorBar
            title="收藏"
            statusBar={{
                backgroundColor:"#678",
                barStyle:"light-content"
            }}
            style={{backgroundColor:"#678"}}
            />
            <TabNavigator/>
            </View>
        )
    }
}

const mapStateToProps=(state,ownprops)=>{
    return {
        favorite:state.FavoriteReducer
    }
}
const mapDispatchToProps=(dispatch)=>{
    return{
    onLoadFavoriteData:(storeName,isShowLoading)=>dispatch(action.onLoadFavoriteData(storeName,isShowLoading)),
    }
}

const FavoriteTabCont=connect(mapStateToProps,mapDispatchToProps)(FavoriteTab)

const styles=StyleSheet.create({
    container:{
        flex:1,
        // alignItems:"center",
        justifyContent:"center"
    },
    indicatorStyle:{
        backgroundColor:"white",
        height:2
    },
    btn:{
        // width:200,
        // alignItems:"center",
        // justifyContent:"center"
    },
    indicatorContainer:{
        alignItems:"center"
    },
    indicator:{
        
    }
})