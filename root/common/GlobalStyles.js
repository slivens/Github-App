/*
 * @Author: your name
 * @Date: 2020-01-05 14:54:58
 * @LastEditTime : 2020-01-06 14:21:14
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \reactNativeProject\myapp\root\common\GlobalStyles.js
 */
import {
    Dimensions,
} from 'react-native';
const {height, width} = Dimensions.get('window');
export default {
    line: {
        flex: 1,
        height: 0.8,
        opacity:0.5,
        backgroundColor: 'darkgray',
    },
    backgroundColor: '#f3f3f4',
    listView_height:(height-(20+40)),
    window_height:height,
    window_width:width,
    nav_bar_height_ios:44,
    nav_bar_height_android:50,
}