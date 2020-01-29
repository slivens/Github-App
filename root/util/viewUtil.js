/*
 * @Author: your name
 * @Date: 2019-12-18 16:55:32
 * @LastEditTime : 2020-01-15 16:40:44
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \reactNativeProject\myapp\root\util\viewUtil.js
 */
import React, { Component } from 'react';
import { TouchableOpacity,Text,View,StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
     class viewUtil {
    static getLeftBackButton(callBack){
        return <TouchableOpacity
            style={{padding:8,paddingLeft:12}}
            onPress={callBack}
        >
        <Ionicons
            name={'ios-arrow-back'}
            size={26}
            style={{color:"white"}}
        />
        </TouchableOpacity>
    }
    static getShareButton(callBack){
        return <TouchableOpacity
        underlayColor={'transparent'}
        onPress={callBack}
    >
    <Ionicons
        name={'md-share'}
        size={26}
        style={{opacity:0.9,marginRight:10,color:"white"}}
    />
    </TouchableOpacity>
    }
    static getRightButton(title,callBack){
        return <TouchableOpacity
        underlayColor={'transparent'}
        onPress={callBack}
        style={{alignItems:"center"}}
    >
    <Text style={{fontSize:20,color:"#fff",marginRight:10}}>{title}</Text>
    </TouchableOpacity>
    }
    static getSettingItem(callBack,text,color,Icons,icon,expandableIco){
        return (
            <TouchableOpacity
            onPress={callBack}
            style={styles.setting_item_container}
            >   
                <View style={{alignItems:"center",flexDirection:"row"}}>
                    {
                        Icons&&icon?
                        <Icons
                            name={icon}
                            size={16}
                            style={{color:color,marginRight:10}}
                        />:
                        <View style={{opacity:1,width:16,height:16,marginRight:10}}/>
                    }
                    <Text>{text}</Text>
                    </View>
                    <Ionicons
                        name={expandableIco||'ios-arrow-forward'}
                        size={16}
                        style={{
                            marginRight:10,
                            alignSelf:"center",
                            color: color||'back' 
                            }}
                    />
            </TouchableOpacity>
        )
    }
    static getMenuItem(callBack,menu,color,expandableIco){
        return viewUtil.getSettingItem(callBack,menu.name,color,menu.Icons,menu.icon,expandableIco)
    }
 
}
const styles = StyleSheet.create({
    setting_item_container: {
        backgroundColor: 'white',
        padding: 10, height: 60,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
})
export default viewUtil;