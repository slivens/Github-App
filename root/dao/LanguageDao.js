/*
 * @Author: your name
 * @Date: 2020-01-08 16:31:54
 * @LastEditTime : 2020-01-09 16:11:28
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \reactNativeProject\myapp\root\dao\LanguageDao.js
 */
/**
 * RespositoryDao
 * @flow
 */
'use strict';

import {
    AsyncStorage,
} from 'react-native';
import langsData from '../data/langs.json'
import keysData from '../data/keys.json'

export var FLAG_LANGUAGE = {flag_language: 'language_dao_language', flag_key: 'language_dao_key'}

export default class LanguageDao{
    constructor(flag) {
        this.flag = flag;
    }
    fetch(){
        return new Promise((resolve,reject)=>{
            // AsyncStorage.removeItem(this.flag)
            AsyncStorage.getItem(this.flag,(error,result)=>{
                if(error){
                    reject(error);
                    return;
                }
                if (!result){
                    var data=this.flag===FLAG_LANGUAGE.flag_language? langsData:keysData;
                    console.log('@@@@@@@@datra',data)
                    this.save(data);
                    resolve(data);
                }else {
                    try {
                        resolve(JSON.parse(result));
                    } catch (e) {
                        reject(error);
                    }
                }
        });
        });
    }
    save(objectData){
        var stringData=JSON.stringify(objectData);
        AsyncStorage.setItem(this.flag,stringData,(error,result)=>{

        });
    }
}