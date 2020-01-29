/*
 * @Author: your name
 * @Date: 2019-12-25 16:21:39
 * @LastEditTime: 2019-12-26 11:10:09
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \reactNativeProject\myapp\root\util\Utils.js
 */


export default class Utils {
    static objectIsValueEqual(object1, object2) {
        for (var _key in object1) {
            if (object1._key !== object2._key)return false;
        }
        return true;
    }
    /**
     * 检查该Item是否被收藏
     * **/
    static checkFavorite(item,keys=[]) {
        if (!keys) return false;
        for (var i = 0, len = keys.length; i < len; i++) {
            let id=item.id?item.id:item.fullName;
            if (id.toString() === keys[i]) {
                return true;
            }
        }
        return false;
    }
}