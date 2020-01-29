/*
 * @Author: your name
 * @Date: 2019-11-25 16:44:25
 * @LastEditTime: 2019-11-25 17:18:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \reactNativeProject\myapp\root\pages\dataStorage.js
 */
import React, { Component } from 'react';
import { View,Text } from 'react-native';
import DataStorageUntil from '../dao/asyncStorage';
class dataStorage extends Component {
    render() {
        return (
            <View >
                <Text>
                    离线缓存机制
                </Text>
            </View>
            
        );
    }
}

export default dataStorage;