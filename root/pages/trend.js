/*
 * @Author: your name
 * @Date: 2019-11-14 15:40:03
 * @LastEditTime : 2020-01-29 16:57:15
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \reactNativeProject\myapp\root\pages\popular.js
 */
import React, { Component } from 'react';
import {FlatList,View,Text,Button,StyleSheet,RefreshControl,ActivityIndicator,TouchableOpacity,DeviceEventEmitter } from 'react-native';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { createAppContainer,withNavigation  } from 'react-navigation';
import NavigationUtil from './dynamicTabNavigator';
import { red } from 'ansi-colors';
import {connect} from 'react-redux';
import action from '../redux/actions';
import TrendingItem from '../components/trendingItems';
import Toast from 'react-native-easy-toast';
import NavigatorBar from '../components/NavigationBar';
import TrendingModal,{TimeSpans,TimeSpansArr} from '../components/trendingModal';
import FavoriteDao from '../dao/FavoriteDao';
import { FLAG_STORAGE } from '../dao/asyncStorage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import EventBus from 'react-native-event-bus';
import EventTypes from '../util/EventTypes';
const URL=`https://github.com/trending/`;
const THEME_COLOR="red";
const QUERY_STR='&sort=stars';
const pageSize = 10;
import FavoriteUtill from '../util/FavoriteUtill';
import { FLAG_LANGUAGE } from '../dao/LanguageDao';
import ArrayUtils from '../util/ArrayUtils';
const favoriteDao=new FavoriteDao(FLAG_STORAGE.flag_trending)
class TrendingTab extends Component {
    constructor(props){
        super(props)
        const {tabLabel,timeSpan}=this.props;
        this.storeName=tabLabel;
        this.timeSpan=timeSpan;
    }
    componentDidMount(){
        this.loadData();
        EventBus.getInstance().addListener(EventTypes.favorite_change_trending,this.favoriteChangeListener=()=>{
            this.isFavoriteChanged=true;
        })
        EventBus.getInstance().addListener(EventTypes.bottom_tab_select,this.bottomTabSelectListener=(data)=>{
            if(data.to===1&&this.isFavoriteChanged){
                this.loadData(null,true)
            }
        })
        this.timeSpanListener=DeviceEventEmitter.addListener("CHANGE_TABS",(timeSpan)=>{ //添加监听事件，实现因为避免tab渲染导致无法刷新数据的问题。
            this.timeSpan=timeSpan;
            this.loadData();
        })
    }
    componentWillUnmount(){
        if(this.timeSpanListener){
            this.timeSpanListener.remove();
        }
    }
     loadData=(loadMore,refreshFavorite)=>{
        const {onLoadTrendingData,onLoadMoreTrending,onFreshTrendingFavorite}=this.props;
        const store=this._store();
        const url=this.getFetchUrl(this.storeName);
        if(loadMore){
            const callBack=()=>{
                this.refs.toast.show('没有更多了')
            }
            onLoadMoreTrending(this.storeName,++store.pageIndex,pageSize,store.items,favoriteDao,callBack)
        }else if(refreshFavorite){
            onFreshTrendingFavorite(this.storeName,store.pageIndex,pageSize,store.items,favoriteDao)
        }
        else{
            onLoadTrendingData(this.storeName,url,pageSize,favoriteDao)
        }
    }
     getFetchUrl=(key)=>{
        return URL+key+this.timeSpan.searchText;
    }
    renderItem=(data)=>{
        const item=data.item;
        return(
            <TrendingItem
            projectModel={item}
            onSelect={(callBack)=>{
                NavigationUtil.goPage('Detail',{
                    projectModels:item,
                    flag:"trending",
                    callBack
                })

            }}
            onFavorite={(item,isFavorite)=>FavoriteUtill.onFavorite(favoriteDao,item,isFavorite,FLAG_STORAGE.flag_trending)}
            />
        ) 
    }
    _store=()=>{
        const {trending}=this.props;
        let store=trending[this.storeName];
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
        const {trending}=this.props;
        let store=this._store();
        return (
                <View style={styles.container}>
                   <FlatList 
                        data={store.projectModels}
                        renderItem={data=>this.renderItem(data)}
                        // keyExtractor={item=>""+(item.id||item.fullName)}
                        keyExtractor={item=>{
                            return ""+item.item.fullName;
                        }}
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
        trending:state.FetchDataTrending
    }
}
const mapDispatchToProps=(dispatch)=>{
    return{
    onLoadTrendingData:(storeName,url,pageSize,favoriteDao)=>dispatch(action.onFreshTrending(storeName,url,pageSize,favoriteDao)),
    onLoadMoreTrending:(storeName,pageIndex,pageSize,items,favoriteDao,callBack)=>dispatch(action.onLoadMoreTrending(storeName,pageIndex,pageSize,items,favoriteDao,callBack)),
    onFreshTrendingFavorite:(storeName,pageIndex,pageSize,items,favoriteDao)=>dispatch(action.onFreshTrendingFavorite(storeName,pageIndex,pageSize,items,favoriteDao))
    }
}

const TrendingPageCont=connect(mapStateToProps,mapDispatchToProps)(TrendingTab)

class TrendingPage extends Component{
    constructor(props){
        super(props)
        this.tabNames=["JAVA","C","C#","PHP"]
        this.state={
            timeSpan:TimeSpansArr[0]
        }
        this.preKeys=[];
        const {onLoadLanguage}=this.props;
        onLoadLanguage(FLAG_LANGUAGE.flag_language)
    }
    _getTabs=()=>{
        const tabs={};
        const {keys}=this.props;
        this.preKeys=keys;
        keys.forEach((item,index)=>{
            if(item.checked){
            tabs[`tab${index}`]={
                screen:(props)=><TrendingPageCont timeSpan={this.state.timeSpan} {...props} tabLabel={item.name}/>,
                navigationOptions:{
                    title:item.name
                }
            }
        }
        })
        return tabs;
    }
    renderTitleView=()=>{
        return <View>
                <TouchableOpacity
                    underlayColor="transparent"
                    onPress={()=>this.dialog.onShow()}
                >
                <View style={{flexDirection:"row",alignItems:"center"}}>
                <Text
                    style={{
                        fontSize:18,
                        color:"#ffffff",
                        fontWeight:"400"
                    }}
                >
                    趋势 {this.state.timeSpan.showText}
                </Text>
                <MaterialIcons
                    name={'arrow-drop-down'}
                    size={22}
                    style={{color:"white"}}
                />
                </View>
                </TouchableOpacity>
        </View>
    }
    onSelectTimeSpan=(tab)=>{
        this.dialog.dismiss();
        this.setState({
            timeSpan:tab
        })
        DeviceEventEmitter.emit("CHANGE_TABS",tab)
    }
    renderTrendingDialog=()=>{
        return <TrendingModal
                    ref={dialog=>this.dialog=dialog}
                    onSelect={tab=>this.onSelectTimeSpan(tab)}
        />
    }
    _tabNav=()=>{
        if(!this.tabNav||!ArrayUtils.isEqual(this.preKeys,this.props.keys)){
            this.tabNav = createAppContainer(createMaterialTopTabNavigator(
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
            ))
        }
        return this.tabNav;
    }
    render(){
         const {keys}=this.props;
         const TabNavigator=keys.length?this._tabNav():null;
        return (
            <View style={{flex:1}}>
            <NavigatorBar
            titleView={this.renderTitleView()}
            statusBar={{
                backgroundColor:"#678",
                barStyle:"light-content"
            }}
            style={{backgroundColor:"#678"}}
            />
            {TabNavigator&&<TabNavigator/>}
            {this.renderTrendingDialog()}
            </View>
        )
    }
}

const mapStateToPropsKyes=(state)=>{
    return{
        keys:state.language.languages
    }
}
const mapDispatchToPropsKeys=(dispatch)=>{
    return{
    onLoadLanguage:(flag)=>dispatch(action.onloadLanguage(flag)),
    }
}
export default connect(mapStateToPropsKyes,mapDispatchToPropsKeys)(TrendingPage)

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