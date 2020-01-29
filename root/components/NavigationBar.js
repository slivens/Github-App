/*
 * @Author: your name
 * @Date: 2019-12-09 15:06:59
 * @LastEditTime : 2020-01-10 15:58:06
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \reactNativeProject\myapp\root\components\NavigationBar.js
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    ViewPropTypes,  
    StyleSheet,
    Navigator,
    Platform,
    TouchableOpacity,
    Image,
    StatusBar,
    Text,
    View} from 'react-native';
const NAV_BAR_HEIGHT_IOS = 40;
const NAV_BAR_HEIGHT_ANDROID = 50;
const STATUS_BAR_HEIGHT = 20;
const StatusBarShape={
    barStyle:PropTypes.oneOf(['light-content','default']),
    hidden:PropTypes.bool,
    backgroundColor:PropTypes.string
}
class NavigationBar extends Component {
    getButtonElement=(data = {}, style)=> {
        return (
            <View style={styles.navBarButton}>
                {(!!data.props) ? data : (
                    <NavBarButton
                        title={data.title}
                        style={[data.style, style,]}
                        tintColor={data.tintColor}
                        handler={data.handler}/>
                )}
            </View>
        );
    }
    render() {
        let statusBar = !this.props.statusBar.hidden ?
            <View style={styles.statusBar}>
                <StatusBar {...this.props.statusBar} barStyle="light-content" style={styles.statusBar}/>
            </View>: null;

        let titleView = this.props.titleView ? this.props.titleView :
            <Text style={styles.title} ellipsizeMode="head" numberOfLines={1} >{this.props.title}</Text>;

        let content = this.props.hide ? null :
            <View style={styles.navBar}>
                {/*{this.leftView()}*/}
                {this.getButtonElement(this.props.leftButton)}
                <View style={[styles.navBarTitleContainer,this.props.titleLayoutStyle]}>
                    {titleView}
                </View>
                {/*{this.rightView()}*/}
                {this.getButtonElement(this.props.rightButton, {marginRight: 8,})}
            </View>;
        return (
            <View style={[styles.container, this.props.style]}>
                {statusBar}
                {content}
            </View>
        )
    }
}
class NavBarButton extends Component {
    render() {
        const {style, tintColor, margin, title, handler} = this.props;

        return (
            <TouchableOpacity style={styles.navBarButton} onPress={handler}>
                <View style={style}>
                    <Text style={[styles.title, {color: tintColor,}]}>{title}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    static propTypes = {
        style: PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.array,
        ]),
        tintColor: PropTypes.string,
        title: PropTypes.string,
        handler: PropTypes.func,
    };

    static defaultProps = {
        style: {},
        title: '',
        tintColor: '#0076FF',
        onPress: () => ({}),
    };
}
NavigationBar.propTypes={
    style:ViewPropTypes.style,
    title:PropTypes.string,
    titleView:PropTypes.element,
    titleLayoutStyle:ViewPropTypes.style,
    hide:PropTypes.bool,
    statusBar:PropTypes.shape(StatusBarShape),
    rightButton:PropTypes.element,
    leftButton:PropTypes.element
}
NavigationBar.defaultProps={
    statusBar: {
        barStyle: 'default',
        hidden: false,
        translucent:false,
        animated:false,
    },
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#678',
    },
    navBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: Platform.OS === 'ios' ? NAV_BAR_HEIGHT_IOS : NAV_BAR_HEIGHT_ANDROID,
     
    },
    navBarTitleContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        left: 40,
        top: 0,
        right: 40,
        bottom: 0,
    },
    title: {
        fontSize: 20,
        color: '#FFFFFF',
        // backgroundColor:'blue',
    },
    navBarButton: {
        alignItems: 'center',
    },
    statusBar: {
        height: Platform.OS === 'ios' ? STATUS_BAR_HEIGHT:0,

    },
})
export default NavigationBar;