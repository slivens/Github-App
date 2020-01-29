/*
 * @Author: your name
 * @Date: 2020-01-06 10:46:22
 * @LastEditTime : 2020-01-07 13:57:15
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \reactNativeProject\myapp\root\pages\about\AboutCommon.js
 */
import { View,Text,Image,StyleSheet,Dimensions,Platform} from 'react-native';
import React, { Component } from 'react';
import BackPressComp from '../../components/BackPressComp';
import NavigationUtil from '../dynamicTabNavigator';
import GithubData from '../../data/github.json';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import GlobalStyles from '../../common/GlobalStyles';
import viewUtil from '../../util/viewUtil';
export const FLAG_ABOUT={flag_about:"about",flag_about_me:"about_me"}
class AboutCommon  {
    constructor(props,updateState){
        this.props=props;
        this.updateState=updateState;
        this.backPress=new BackPressComp({backPress:()=>this.onBackPress()})
        this.updateState({GithubData})
    }
    onBackPress(){
        NavigationUtil.goBack(this.props.navigation)
        return true;
    }
    componentDidMount() {
        this.backPress.componentDidMount();
    }
    getParallaxScrollConfig(params){
        let config={};
        let avatar=typeof(params.avatar)==='string' ? {uri:params.avatar}:params.avatar;
        config.renderBackground = () => (
            <View key="background">
                <Image source={{uri: params.backgroundImg,
                                width: window.width,
                                height: PARALLAX_HEADER_HEIGHT}}/>
                <View style={{position: 'absolute',
                              top: 0,
                              width: window.width,
                              backgroundColor: 'rgba(0,0,0,.4)',
                              height: PARALLAX_HEADER_HEIGHT}}/>
              </View>
        );
        config.renderForeground = () => (
            <View key="parallax-header" style={ styles.parallaxHeader }>
            <Image style={ styles.avatar }
             source={avatar}/>
            <Text style={ styles.sectionSpeakerText }>
              {params.name}
            </Text>
            <Text style={ styles.sectionTitleText }>
              {params.description}
            </Text>
          </View>
        );
        config.renderStickyHeader = () => (
            <View key="sticky-header" style={styles.stickySection}>
                <Text style={styles.stickySectionText}>{params.name}</Text>
            </View>
        );
        config.renderFixedHeader = () => (
            <View key="fixed-header" style={styles.fixedSection}>
                {viewUtil.getLeftBackButton(()=>NavigationUtil.goBack(this.props.navigation))}
                {viewUtil.getShareButton(()=>this.onShare())}
            </View>
        );
        return config;
    }
    componentWillUnmount(){
        this.backPress.componentWillUnmount();
    }
    render(contentView,params) {
        const renderConfig=this.getParallaxScrollConfig(params);
        return (
            <ParallaxScrollView
                backgroundColor={"#678"}
                contentBackgroundColor={GlobalStyles.backgroundColor}
                parallaxHeaderHeight={PARALLAX_HEADER_HEIGHT}
                stickyHeaderHeight={STICKY_HEADER_HEIGHT}
                backgroundScrollSpeed={10}
               {...renderConfig}
                >
                {contentView}
            </ParallaxScrollView>
        );
    }
}

const window = Dimensions.get('window');
const AVATAR_SIZE = 90;
const PARALLAX_HEADER_HEIGHT = 270;
const STICKY_HEADER_HEIGHT =(Platform.OS === 'ios') ? GlobalStyles.nav_bar_height_ios+20:GlobalStyles.nav_bar_height_android;
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'black'
    },
    background: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: window.width,
      height: PARALLAX_HEADER_HEIGHT
    },
    stickySection: {
      height: STICKY_HEADER_HEIGHT,
      width: 300,
      justifyContent: 'flex-end'
    },
    stickySectionText: {
      color: 'white',
      fontSize: 20,
      margin: 10,
      marginLeft:40
    },
    fixedSection: {
      position: 'absolute',
      left:0,
      right:0,
      top:0,
      bottom:0,
      paddingRight:8,
      paddingTop:(Platform.OS==='ios')?20:0,
      flexDirection:"row",
      alignItems:"center",
      justifyContent:"space-between"

    },
    fixedSectionText: {
      color: '#999',
      fontSize: 20
    },
    parallaxHeader: {
      alignItems: 'center',
      flex: 1,
      flexDirection: 'column',
      paddingTop: 100
    },
    avatar: {
      marginBottom: 10,
      borderRadius: AVATAR_SIZE / 2
    },
    sectionSpeakerText: {
      color: 'white',
      fontSize: 24,
      paddingVertical: 5
    },
    sectionTitleText: {
      color: 'white',
      fontSize: 18,
      paddingVertical: 5
    },
    row: {
      overflow: 'hidden',
      paddingHorizontal: 10,
      backgroundColor: 'white',
      borderColor: '#ccc',
      borderBottomWidth: 1,
      justifyContent: 'center'
    },
    rowText: {
      fontSize: 20
    }
  });
export default AboutCommon;