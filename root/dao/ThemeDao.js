/*
 * @Author: your name
 * @Date: 2020-01-28 12:13:49
 * @LastEditTime : 2020-01-28 12:14:05
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \reactNativeProject\myapp\root\dao\ThemeDao.js
 */
/**
 * ThemeDao
 * @flow
 */
'use strict';

import {
    AsyncStorage,
} from 'react-native';
import ThemeFactory, {ThemeFlags} from '../styles/ThemeFactory';
const THEME_KEY = 'theme_key'

export default class ThemeDao {
    getTheme() {
        return new Promise((resolve, reject)=> {
            AsyncStorage.getItem(THEME_KEY, (error, result)=> {
                if (error) {
                    reject(error);
                    return;
                }
                if (!result) {
                    this.save(ThemeFlags.Default);
                    result = ThemeFlags.Default;
                }
                resolve(ThemeFactory.createTheme(result));
            });
        });
    }

    save(themeFlag) {
        AsyncStorage.setItem(THEME_KEY, themeFlag, (error, result)=> {

        });
    }
}