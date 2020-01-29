/*
 * @Author: your name
 * @Date: 2019-11-14 15:40:03
 * @LastEditTime : 2020-01-20 20:24:25
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
import Toast from 'react-native-easy-toast';
import NavigatorBar from '../components/NavigationBar';
import FavoriteDao from '../dao/FavoriteDao';
import { FLAG_STORAGE } from '../dao/asyncStorage';
import FavoriteUtill from '../util/FavoriteUtill';
import EventBus from 'react-native-event-bus';
import EventTypes from '../util/EventTypes';
import { FLAG_LANGUAGE } from '../dao/LanguageDao';
const URL=`https://api.github.com/search/repositories?q=`;
const THEME_COLOR="red";
const QUERY_STR='&sort=stars';
const pageSize = 10;
const favoriteDao=new FavoriteDao(FLAG_STORAGE.flag_popular)
class PopularTab extends Component {
    constructor(props){
        super(props)
        const {tabLabel}=this.props;
        this.storeName=tabLabel;
        
    }
    componentDidMount(){
        this.loadData();
        EventBus.getInstance().addListener(EventTypes.favorite_change_popular,this.favoriteChangeListener=()=>{
            this.isFavoriteChanged=true;
        })
        EventBus.getInstance().addListener(EventTypes.bottom_tab_select,this.bottomTabSelectListener=(data)=>{
            if(data.to===0&&this.isFavoriteChanged){
                this.loadData(null,true)
            }
        })
    }
    componentWillUnmount(){
        EventBus.getInstance().removeListener(this.favoriteChangeListener);
        EventBus.getInstance().removeListener(this.bottomTabSelectListener);
    }
     loadData=(loadMore,refreshFavorite)=>{
        const {onLoadPopularData,onLoadMorePopular,onFlushPopularFavorite}=this.props;
        const store=this._store();
        const url=this.getFetchUrl(this.storeName);
        if(loadMore){
            const callBack=()=>{
                this.refs.toast.show('没有更多了')
            }
            onLoadMorePopular(this.storeName,++store.pageIndex,pageSize,store.items,favoriteDao,callBack)
        }else if(refreshFavorite){
            onFlushPopularFavorite(this.storeName,store.pageIndex,pageSize,store.items,favoriteDao)
        }
        else{
            onLoadPopularData(this.storeName,url,pageSize,favoriteDao)
        }
    }
     getFetchUrl=(key)=>{
        return URL+key+QUERY_STR;
    }
    renderItem=(data)=>{
        const item=data.item;
        return(
            <PopularItem
            projectModel={item}
                onSelect={(callBack)=>{
                    NavigationUtil.goPage('Detail',{
                        projectModels:item,
                        flag:"popular",
                        callBack
                    })

                }}
                onFavorite={(item,isFavorite)=>FavoriteUtill.onFavorite(favoriteDao,item,isFavorite,FLAG_STORAGE.flag_popular)}
            />
        ) 
    }
    _store=()=>{
        const {popular}=this.props;
        let store=popular[this.storeName];
        if(!store){
            store={
                items:[],
                isLoading:false,
                projectModels:[],
                hideLoadingMore:true,
            }
        }
        return store
    }
    genIndicator=()=>{
        const load=this._store().hideLoadingMore;
        return this._store().hideLoadingMore?null:
        <View style={styles.indicatorContainer}>
            <ActivityIndicator 
                style={styles.indicator}
            />
            <Text>正在加载更多</Text>
        </View>
    }
    render() {
        const {popular}=this.props;
        let store=this._store();
        return (
                <View style={styles.container}>
                   <FlatList 
                        data={store.projectModels}
                        renderItem={data=>this.renderItem(data)}
                        keyExtractor={item=>""+item.item.id}
                        refreshControl={
                            <RefreshControl
                                title={'loading'}
                                titleColor={THEME_COLOR}
                                colors={[THEME_COLOR]}
                                refreshing={store.isLoading}
                                onRefresh={()=>this.loadData()}
                                tintColor={THEME_COLOR}
                            />
                            }
                            ListFooterComponent={()=>this.genIndicator()}
                            onEndReached={()=>{
                                setTimeout(()=>{   //一般情况，先执行onMomentumScrollBegin，再onEndReached，但是存在意外。
                                    if(this.canLoadMore){
                                        this.loadData(true)
                                        this.canLoadMore=false
                                    }
                                },100)
                            }}
                            onMomentumScrollBegin={()=>{
                                this.canLoadMore=true
                            }}
                            onEndReachedThreshold={0.5}
                   />
                   <Toast ref={"toast"}
                            position={"center"}
                   />
                </View>
        );
    }
}
const mapStateToProps=(state,ownprops)=>{
    return {
        popular:state.FetchData
    }
}
const mapDispatchToProps=(dispatch)=>{
    return{
    onLoadPopularData:(storeName,url,pageSize,favoriteDao)=>dispatch(action.onLoadPopularData(storeName,url,pageSize,favoriteDao)),
    onLoadMorePopular:(storeName,pageIndex,pageSize,items,favoriteDao,callBack)=>dispatch(action.onLoadMorePopular(storeName,pageIndex,pageSize,items,favoriteDao,callBack)),
    onFlushPopularFavorite:(storeName,pageIndex,pageSize,items,favoriteDao)=>dispatch(action.onFreshPopularFavorite(storeName,pageIndex,pageSize,items,favoriteDao))
    }
}

 const PopularPageCont=connect(mapStateToProps,mapDispatchToProps)(PopularTab)

 class PopularPage extends Component{
    constructor(props){
        super(props)
        const {onLoadLanguage}=this.props;
        onLoadLanguage(FLAG_LANGUAGE.flag_key)
        this.tabNames=["Java","Android","iOS","React","React Native","PHP"]
    }
    _getTabs=()=>{
        const tabs={};
        const {keys}=this.props;
        keys.forEach((item,index)=>{
            if(item.checked){
                tabs[`tab${index}`]={
                    screen:(props)=><PopularPageCont {...props} tabLabel={item.name}/>,
                    navigationOptions:{
                        title:item.name
                    }
                }
            }
        })
        return tabs;
    }
    render(){
        const {keys}=this.props;
        const TabNavigator = keys.length?createAppContainer(createMaterialTopTabNavigator(
            this._getTabs(),{
                tabBarOptions:{
                    indicatorStyle:styles.indicatorStyle,
                    tabStyle:styles.tabStyle,
                    style:{backgroundColor:"#678"},
                    upperCaseLabel:false,
                    scrollEnabled:true,
                    
            },
            lazy:true
        }
        )):null
        return (
            <View style={{flex:1}}>
            <NavigatorBar
            title="最热"
            statusBar={{
                backgroundColor:"#678",
                barStyle:"light-content"
            }}
            style={{backgroundColor:"#678"}}
            />
            {
                TabNavigator&&<TabNavigator/>
            }
            </View>
        )
    }
}
const mapStateToPropsKyes=(state)=>{
    return{
        keys:state.language.keys
    }
}
const mapDispatchToPropsKeys=(dispatch)=>{
    return{
    onLoadLanguage:(flag)=>dispatch(action.onloadLanguage(flag)),
    }
}
export default connect(mapStateToPropsKyes,mapDispatchToPropsKeys)(PopularPage)

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
        width:120,
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