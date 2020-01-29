
# GitHub APP

为了更加好的巩固RN相关知识，做个App实战是再好不过的，这里偶然看到一个关于Github的App，创意来源于，作者：贾鹏辉 [传送地址](https://www.devio.org/tags/#React%20Native),本项目使用的版本是"react-native": "0.61.4",因为再0.59版本后有了许多很大的改动，故此大家需自己参照使用的版本做改动。暂且开发安卓客户端，ios端还未完成，大同小异，可以自行发挥。


## 目录

* [技术栈](#技术栈)
* [功能](#功能)
* [待完善功能](#待完善功能)
* [环境安装](#环境安装)
* [预览图](#预览图)
* [运行调试](#运行调试)


## 技术栈

react-native redux-thunk redux react React Navigation4.x。

## 功能

* 标签排序、删除
* 自定义标签
* 收藏喜欢的项目
* tab筛选
* 拖拽选项

## 待完善功能

* 登陆页、搜索、分享

## 环境安装

[RN、android studio、相关环境安装](https://www.cnblogs.com/slivens/p/11654539.html)

## 预览图

![GitHub APP](./root/assets/images/github.gif)


# 运行调试

```
1. git clone git@github.com:slivens/Github-App.git.
2. yarn add
3. 启动你的模拟器，我用的是夜神（推荐） adb connect localhost:62001 (连接夜神端口)
3. react-native run-android
4.RN中还有许多坑位，包括关于 React Navigation4.x 导航器，以及相关环境的，可提issues，共同进步。

```




