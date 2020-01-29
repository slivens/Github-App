/*
 * @Author: your name
 * @Date: 2019-12-25 16:58:43
 * @LastEditTime : 2019-12-31 15:22:52
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \reactNativeProject\myapp\root\util\FavoriteUtill.js
 */
import {FLAG_STORAGE} from '../dao/asyncStorage';
export default class FavoriteUtill{
    static onFavorite(favoriteDao,item,isFavorite,flag){
        const key=flag===FLAG_STORAGE.flag_trending?item.fullName:item.id.toString();
        if(isFavorite){
            favoriteDao.saveFavoriteItem(key,JSON.stringify(item))
        }else{
            favoriteDao.removeFavoriteItem(key)
        }
    }
}