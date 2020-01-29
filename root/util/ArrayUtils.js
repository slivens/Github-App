/*
 * @Author: your name
 * @Date: 2020-01-09 15:29:39
 * @LastEditTime : 2020-01-21 15:18:47
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \reactNativeProject\myapp\root\util\ArrayUtils.js
 */


export default class ArrayUtils {
    /**
     * 更新数组,若item已存在则将其从数组中删除,若不存在则将其添加到数组
     * **/
    static updateArray(array,item){
        for (var i = 0, len = array.length; i < len; i++) {
            var temp = array[i];
            if (item=== temp) {
                array.splice(i, 1);
                return;
            }
        }
        array.push(item);
    }
    /**
     * 向数组中添加元素,若元素与存在则不添加
     * **/
    static add(array,item){
        if(!array)return;
        for(var i=0,l=array.length;i<l;i++){
            if (array===array[i])return;
        }
        array.push(item);
    }
    /**
     * 将数组中指定元素移除
     * **/
    static remove(array,item,id){
        if (!array)return;
        for(var i=0,l=array.length;i<l;i++){
            const val = array[i]
            if(item===val||val&&val[id]&&val[id]===item[id]){
                array.splice(i,1);
            }
        }
        return array;
    }
    /**
     * clone 数组
     * @return Array 新的数组
     * */
    static clone(from){
        if(!from)return [];
        let newArray=[];
        for(let i=0,l=from.length;i<l;i++){
            newArray[i]=from[i];
        }
        return newArray;
    }
    /**
     * 判断两个数组的是否相等
     * @return boolean true 数组长度相等且对应元素相等
     * */
    static isEqual(arr1,arr2){
        if(!(arr1&&arr2))return false;
        if(arr1.length!=arr2.length)return false;
        for(let i=0,l=arr1.length;i<l;i++){
            if (arr1[i]!=arr2[i])return false;
        }
        return true;
    }
}