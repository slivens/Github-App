/*
 * @Author: your name
 * @Date: 2019-11-28 20:22:53
 * @LastEditTime : 2019-12-31 10:31:25
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \reactNativeProject\myapp\root\components\popularitem.js
 */
import React, { Component } from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import BaseItem from './baseItem';
class popularitem extends BaseItem {
    constructor(props){
        super(props)
    }
    render() {
        const { projectModel } = this.props;
        const {item}=projectModel;
        if (!item || !item.owner) return null;
        return (
            <TouchableOpacity
                onPress={()=>this.onItemClick()}
            >
                <View style={styles.container}>
                    <Text style={styles.title}>
                        {item.full_name}
                    </Text>
                    <Text style={styles.description}>
                        {item.description}
                    </Text>
                    <View style={styles.row}>
                        <View style={styles.row}>
                            <Text>Author:&nbsp;</Text>
                            <Image
                                style={{ height: 22, width: 22 }}
                                source={{ uri: item.owner.avatar_url }}
                            />
                        </View>
                        <View style={styles.row}>
                            <Text>Start:&nbsp;</Text>
                            <Text>{item.stargazers_count}</Text>
                        </View>
                        {this._favoriteButton()}
                    </View>
                </View>

            </TouchableOpacity>
        );
    }
}
const styles=StyleSheet.create({
    container:{
        backgroundColor:"white",
        padding:10,
        marginLeft:5,
        marginRight:5,
        marginVertical:5,
        borderColor:"#dddddd",
        borderWidth:0.5,
        borderRadius:2,
        shadowColor:"gray",
        shadowOffset:{width:0.5,height:0.5},
        shadowOpacity:0.4,
        shadowRadius:1,
        elevation:2
    },
    row:{
        justifyContent:"space-between",
        flexDirection:'row',
        alignItems:"center"
    },
    title:{
        fontSize:16,
        marginBottom:2,
        color:"#212121"
    },
    description:{
        fontSize:14,
        marginBottom:2,
        color:"#757575"
    }
})
export default popularitem;
