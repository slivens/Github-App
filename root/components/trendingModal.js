/*
 * @Author: your name
 * @Date: 2019-12-17 17:15:45
 * @LastEditTime : 2019-12-30 15:20:25
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \reactNativeProject\myapp\root\components\trendingModal.js
 */
import React, { Component } from 'react';
import {Modal,Text,StatusBar,StyleSheet,View,TouchableOpacity,Platform} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
 export function TimeSpans (showText,searchText) {
    this.showText=showText;
    this.searchText=searchText;
}
export const TimeSpansArr=[new TimeSpans('今天','?since=daily'),new TimeSpans('本周','?since=weekly'),new TimeSpans('本月','?since=monthly')]
class trendingModal extends Component {
    constructor(props){
        super(props)
        this.state={
            visible:false
        }
    }
    onShow=()=>{
        this.setState({visible:true})
    }
    dismiss=()=>{
        this.setState({visible:false})
    }
    render() {
        const {onClose,onSelect}=this.props;
        return (
            <Modal 
                transparent={true}
                visible={this.state.visible}
                onRequestClose={()=>onClose}
            >
                <TouchableOpacity
                    style={styles.container}
                    onPress={()=>this.dismiss()}
                >
                    <MaterialIcons
                        name={'arrow-drop-up'}
                        size={36}
                        style={styles.arrow}
                    />
                    <View style={styles.content}>
                    {
                        TimeSpansArr.map((result,i,arr)=>{
                            return <TouchableOpacity
                                key={i}
                                onPress={()=>onSelect(arr[i])}
                                underlayColor="transparent"
                            >
                            <View style={styles.text_container}>
                                <Text
                                    style={styles.text}
                                >
                                    {arr[i].showText}
                                </Text>
                            </View>
                            </TouchableOpacity>
                        })   
                    }
                    </View>
                </TouchableOpacity>
            </Modal>
        );
    }
}

const styles=StyleSheet.create({
    container:{
        backgroundColor:'rgba(0,0,0,0.6)',
        flex:1,
        alignItems:'center',
    },
    arrow:{
        marginTop:40,
        color:"white",
        padding:0,
        margin:-16
    },
    content:{
        backgroundColor:"white",
        borderRadius:3,
        paddingTop:3,
        paddingBottom:3,
        marginRight:3
    },
    text_container:{
        alignItems:"flex-start",
        flexDirection:"row"
    },
    text:{
        fontSize:16,
        color:"black",
        fontWeight:"400",
        padding:8,
        paddingLeft:26,
        paddingRight:26
    }
})
export default trendingModal;