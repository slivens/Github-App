/*
 * @Author: your name
 * @Date: 2020-01-09 16:47:37
 * @LastEditTime : 2020-01-21 15:02:14
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \reactNativeProject\myapp\root\pages\customKeyPage.js
 */
import React, { Component } from 'react';
import BackPressComp from '../components/BackPressComp';
import action from '../redux/actions';
import {connect} from 'react-redux';
import LanguageDao, { FLAG_LANGUAGE } from '../dao/LanguageDao';
import NavigationBar from '../components/NavigationBar';
import viewUtil from '../util/viewUtil';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CheckBox from 'react-native-check-box';
import {
    StyleSheet,
    ScrollView,
    View,
    Image,
    Alert
} from 'react-native'
import { ThemeContext } from 'react-navigation';
import DynamicNavigator from './dynamicTabNavigator';
import ArrayUtils from '../util/ArrayUtils';
class customKeyPage extends Component {
    constructor(props){
        super(props)
        this.params=this.props.navigation.state.params;
        this.backPress=new BackPressComp({backPress:(e)=>this.onBackPress(e)})
        this.changeValues=[];
        this.isRemoveKey=!!this.params.isRemoveKey;
        this.languageDao=new LanguageDao(this.params.flag)
        this.state={
            keys:[]
        }
    }
    componentDidMount(){
        this.backPress.componentDidMount()
        //如果props中标签为空则从本地存储中获取标签
        console.log("@@@@@this.props",this.props)
        if(customKeyPage._keys(this.props).length===0){
            let {onLoadLanguage}=this.props;
            onLoadLanguage(this.params.flag)
            console.log('@@@@@enter')
        }
        this.setState({keys:customKeyPage._keys(this.props)})
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
    static _keys(props,original,state){
        console.log('@@@@@@props',props)
        const {flag,isRemoveKey}=props.navigation.state.params;
        console.log('@@@@@@@@@@sssssssss',flag)
        let key=flag===FLAG_LANGUAGE.flag_key?"keys":"languages";
        console.log('@@@@@key',key)
        if(isRemoveKey&&!original){
            return state && state.keys && state.keys.length !==0 && state.keys || props.language[key].map((val)=>
            {
                return {
                    ...val,
                    checked:false
                }
            })
        }else{
            return props.language[key]
        }
    }
    static getDerivedStateFromProps(nextProps,prevState){
        if(prevState.keys!==customKeyPage._keys(nextProps,null,prevState)){
            return {
                keys:customKeyPage._keys(nextProps,null,prevState)
            }
        }
        return null
    }
    onSave() {
        if (this.changeValues.length ===0){
            DynamicNavigator.goBack(this.props.navigation)
            return;
        }
        let keys;
        if(this.isRemoveKey){
            for(let i=0,l=this.changeValues.length;i<l;i++){
                ArrayUtils.remove(keys=customKeyPage._keys(this.props,true),this.changeValues[i],"name")
            }
        }
        //更新本地数据
        this.languageDao.save(keys||this.state.keys);
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
        if (this.changeValues.length > 0) {
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
    renderView() {
        let dataArray=this.state.keys;
        if (!dataArray || dataArray.length === 0)return;
        var len = dataArray.length;
        var views = [];
        for (var i = 0, l = len; i < l; i += 2) {
            views.push(
                <View key={i}>
                    <View style={styles.item}>
                        {this.renderCheckBox(dataArray[i],i)}
                        {i+1<len&&this.renderCheckBox(dataArray[i + 1],i+1)}
                    </View>
                    <View style={styles.line}/>
                </View>
            )
        }
        return views;
    }
    render() {
        let title=this.isRemoveKey?"标签移除":"自定义标签";
        title=this.params.flag===FLAG_LANGUAGE.flag_language?'自定义语言':title;
        let rightButtonTitle=this.isRemoveKey?"移除":"保存";
        let navigationBar=<NavigationBar
            title={title}
            style={{backgroundColor:"#678"}}
            rightButton={viewUtil.getRightButton(rightButtonTitle,()=>this.onSave())}
            leftButton={viewUtil.getLeftBackButton(this.onBack)}
        />
        return (
            <View style={styles.container}>
                {navigationBar}
                <ScrollView>
                    {this.renderView()}
                </ScrollView>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f3f2f2'
    },
    item: {
        flexDirection: 'row',
    },
    line: {
        flex: 1,
        height: 0.3,
        backgroundColor: 'darkgray',
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
export default connect(mapStateToPropsKyes,mapDispatchToPropsKeys)(customKeyPage)

