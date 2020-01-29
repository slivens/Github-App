/*
 * @Author: your name
 * @Date: 2020-01-09 16:47:37
 * @LastEditTime : 2020-01-27 22:32:46
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \reactNativeProject\myapp\root\pages\SortKeyPage.js
 */
import React, { Component } from 'react';
import BackPressComp from '../components/BackPressComp';
import action from '../redux/actions';
import {connect} from 'react-redux';
import LanguageDao, { FLAG_LANGUAGE } from '../dao/LanguageDao';
import NavigationBar from '../components/NavigationBar';
import viewUtil from '../util/viewUtil';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CheckBox from 'react-native-check-box';
import SortableListView from 'react-native-sortable-listview'
import {
    Text,
    StyleSheet,
    ScrollView,
    View,
    Image,
    Alert,
    TouchableHighlight
} from 'react-native'
import { ThemeContext } from 'react-navigation';
import DynamicNavigator from './dynamicTabNavigator';
import ArrayUtils from '../util/ArrayUtils';
class SortKeyPage extends Component {
    constructor(props){
        super(props)
        this.params=this.props.navigation.state.params;
        this.backPress=new BackPressComp({backPress:(e)=>this.onBackPress(e)})
        this.languageDao=new LanguageDao(this.params.flag)
        this.state={
            checkedArray:SortKeyPage._keys(this.props)
        }
    }
  
    componentDidMount(){
        this.backPress.componentDidMount()
        //如果props中标签为空则从本地存储中获取标签
        console.log("@@@@@this.props",this.props)
       if(SortKeyPage._keys(this.props).length===0){
           let {onLoadLanguage}=this.props;
           onLoadLanguage(this.params.flag)
       }
       this.setState({
           keys:SortKeyPage._keys(this.props)
       })
    }
    componentWillUnmount(){
        this.backPress.componentWillUnmount()
    }
    onBackPress=(e)=>{
        this.onBack();
        return true;
    }
    /**
     * @description: 
     * @param {type} original 移除标签时使用，是否从props获取原始对的标签
     * @param {type} 
     * @param {type} 
     * @return: 
     */
    static _keys(props,state){
        
        if(state&&state.checkedArray&&state.checkedArray.length){
            return state.checkedArray
        }
        //是否从原始数据中获取checkedArray
        const flag=SortKeyPage._flag(props);
        let dataArray=props.language[flag]||[];
        let keys=[];
        for (let i=0, j=dataArray.length;i<j;i++){
            let data=dataArray[i];
            if(data.checked) keys.push(data);
        }
        return keys;
    }
    static _flag(props){
        const {flag}=props.navigation.state.params;
        return flag===FLAG_LANGUAGE.flag_key?"keys":"languages";
    }
    static getDerivedStateFromProps(nextProps,prevState){
        const checkedArray=SortKeyPage._keys(nextProps,null,prevState)
        if(prevState.keys!==checkedArray){
            return {
                keys:checkedArray,
            }
        }
        return null
    }
    static _flag(props){
        const {flag}=props.navigation.state.params;
        return flag===FLAG_LANGUAGE.flag_key?"keys":"languages";
    }
    onSave(hasChecked) {
        if(!hasChecked){
            //如果没有排序则直接返回
            if (ArrayUtils.isEqual(SortKeyPage._keys(this.props),this.state.checkedArray)) {
                DynamicNavigator.goBack(this.props.navigation)
                return;
            }
        }
        //更新本地数据
        this.languageDao.save(this.getSortResult());
        const {onLoadLanguage}=this.props;
        //更新store
        onLoadLanguage(this.params.flag)
        DynamicNavigator.goBack(this.props.navigation)
    }
    
    checkedImage(checked){
        const {theme}=this.params;
        return <Ionicons
            name={checked?'ios-checkbox':"md-square-outline"}
            size={20}
            style={{
                color:'#678'
            }}
        />
    }
    onClick=(data,index)=>{
        data.checked=!data.checked;
        ArrayUtils.updateArray(this.changeValues,data)
        this.state.keys[index]=data; //更新state以便显示选中状态
        this.setState({keys:this.state.keys})
    }
    renderCheckBox(data,index) {
        console.log('@@@@@data',data)
        return (
            <CheckBox
                style={{flex: 1, padding: 10}}
                onClick={()=>this.onClick(data,index)}
                isChecked={data.checked}
                leftText={data.name}
                checkedImage={this.checkedImage(true)}
                unCheckedImage={this.checkedImage(false)}
            />);
    }

    onBack=()=>{
        if (!ArrayUtils.isEqual(SortKeyPage._keys(this.props),this.state.checkedArray)) {
            Alert.alert("提示","要保存修改吗",[
                {
                    text:"否",
                    onPress:()=>{
                        DynamicNavigator.goBack(this.props.navigation)
                    }
                },
                {
                    text:"是",
                    onPress:()=>{
                        this.onSave();
                    } 
                }
            ] )
        } else {
            DynamicNavigator.goBack(this.props.navigation)
        }
    }
    getSortResult(){
        const flag=SortKeyPage._flag(this.props);
        //从原始数据中复制一份数据出来，以便对这份进行排序
        let sortResultArray=ArrayUtils.clone(this.props.language[flag])
        //获取排序之前的数据
        const originalCheckedArray=SortKeyPage._keys(this.props)
        //遍历排序之前的数据，用排序后的数据checkedArray进行替换
        for(let i=0,j=originalCheckedArray.length;i<j;i++){
            let item=originalCheckedArray[i];
            //找到要替换的元素所在的位置
            let index=this.props.language[flag].indexOf(item);
            sortResultArray.splice(index,1,this.state.checkedArray[i]);
        }
        return sortResultArray;
    }
    render() {
        let title=this.params.flag===FLAG_LANGUAGE.flag_language?'语言排序':'标签排序';
        let navigationBar=<NavigationBar
            title={title}
            style={{backgroundColor:"#678"}}
            rightButton={viewUtil.getRightButton('保存',()=>this.onSave())}
            leftButton={viewUtil.getLeftBackButton(this.onBack)}
        />
        return (
            <View style={styles.container}>
                {navigationBar}
                <SortableListView
                    data={this.state.checkedArray}
                    order={Object.keys(this.state.checkedArray)}
                    onRowMoved={(e) => {
                        this.state.checkedArray.splice(e.to, 0, this.state.checkedArray.splice(e.from, 1)[0]);
                        this.forceUpdate();
                    }}
                    renderRow={row => <SortCell data={row} {...this.props}/>}
                />
            </View>
        );
    }
}
class SortCell extends Component {
    render() {
        return <TouchableHighlight
            underlayColor={'#eee'}
            style={this.props.data.checked? styles.item:styles.hidden}
            {...this.props.sortHandlers}>
            <View style={{marginLeft:10,flexDirection:'row'}}>
               <MaterialCommunityIcons
                name={'sort'}
                size={16}
                style={{marginRight:10,color:"#678"}}
               />
               <Text>{this.props.data.name}</Text>
            </View>
        </TouchableHighlight>
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f3f2f2'
    },
    line: {
        flex: 1,
        height: 0.3,
        backgroundColor: 'darkgray',
    },
    item:{
        backgroundColor: "#F8F8F8",
        borderBottomWidth: 1,
        borderColor: '#eee',
        height:50,
        justifyContent:'center'
    },
})
const mapStateToPropsKyes=(state)=>{
    return{
        language:state.language
    }
}
const mapDispatchToPropsKeys=(dispatch)=>{
    return{
    onLoadLanguage:(flag)=>dispatch(action.onloadLanguage(flag)),
    }
}
export default connect(mapStateToPropsKyes,mapDispatchToPropsKeys)(SortKeyPage)

