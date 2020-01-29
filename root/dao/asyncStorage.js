/*
 * @Author: your name
 * @Date: 2019-11-25 14:30:39
 * @LastEditTime: 2019-12-17 16:34:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \reactNativeProject\myapp\root\dao\asyncStorage.js
 */
// import { AsyncStorage } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Trending from 'GitHubTrending';
export const FLAG_STORAGE={flag_popular:"popular",flag_trending:"trending"};
export default class DataStore {
    saveData(url, data, callback) {
        if (!data || !url) return;
        AsyncStorage.setItem(url, JSON.stringify(this._wrapData(data)), callback)
    }
    _wrapData(data) { 
        return { data: data, timestamp: new Date().getTime() };
    }

    /**
     * @description: 本地获取数据
     * @param {type} 
     * @return: 
     */    
    fetchLocalData(url) {
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem(url, (err, res) => {
                if (!err) {
                    try { 
                        resolve(JSON.parse(res))
                    }catch(e){
                        reject(e);
                        console.error(e)
                    }
                }else{
                    reject(err);
                    console.error(err)
                }
            })
        })
    }
/**
 * @description:网络获取数据 
 * @param {type} 
 * @return: 
 */
    fetchNetData(url,flag){
        return new Promise((resolve,reject)=>{
            if(flag!==FLAG_STORAGE.flag_trending){
                fetch(url)
                .then(res=>{
                    if(res.ok){
                        return res.json();
                    }
                    throw new Error('Network response was not ok.')
                })
                .then(res=>{
                    this.saveData(url,res);
                    resolve(res);
                })
                .catch(err=>{
                    reject(err);
                })
            }else{
                new Trending().fetchTrending(url)
                .then(items=>{
                    if(!items){
                        throw new Error('response is null')
                    }
                    this.saveData(url,items)
                    resolve(items);
                })
                .catch(err=>{
                    reject(err)
                })
            }
            })
    }
/**
 * @description: 先获取本地数据，本地数据不在有效期内或者不存在，再获取网络数据然后存储再本地数据中。 
 * @param {type} 
 * @return: 
 */    
 fetchData(url,flag){
    return new Promise((resolve,reject)=>{
        this.fetchLocalData(url,flag)
        .then(wrapData=>{
            if(wrapData&&DataStore.checkTimestampValid(wrapData.timestamp)){
                resolve(wrapData)
            }else{
                
                this.fetchNetData(url,flag)
                .then(res=>{
                    resolve(this._wrapData(res))
                })
                .catch(err=>{
                    reject(err);
                })
            }
        }).catch(err=>{
            this.fetchNetData(url,flag)
                .then(res=>{
                    resolve(this._wrapData(res))
                })
                .catch(err=>{
                    reject(err);
                })
        })
    })
 }
/**
 * @description:是否再有效期内 
 * @param {type} 
 * @return: true 不需要更新,false需要更新
 */ 
 static checkTimestampValid(timestamp){
     const currentDate=new Date();
     const targetDate=new Date();
     targetDate.setTime(timestamp);
     if(currentDate.getMonth()!==targetDate.getMonth()) return false;
     if(currentDate.getDate()!==targetDate.getDate()) return false;
     if(currentDate.getHours() - targetDate.getHours()>4) return false;
     return true;
 }
}