/*
 * @Author: your name
 * @Date: 2020-01-28 12:58:40
 * @LastEditTime : 2020-01-28 15:38:57
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \reactNativeProject\myapp\root\pages\customeTheme.js
 */
import React, { Component } from 'react';
import { Modal,View,Text,ScrollView ,StyleSheet,TouchableHighlight} from 'react-native';
import ThemeDao from '../dao/ThemeDao';
import GlobalStyles from '../styles/GlobalStyles';
import ThemeFactory,{ThemeFlags} from '../styles/ThemeFactory';
import actions from '../redux/actions';
import {connect} from 'react-redux';
class customeTheme extends Component {
    constructor(props){
        super(props)
        this.themeDao=new ThemeDao();
    }
    show(){
        this.setState({
            visible:true
        })
    }
    dismiss(){
        this.setState({
            visible:false
        })
    }
    onSelectTheme(themeKey) {
        this.props.onClose();
        this.themeDao.save(ThemeFlags[themeKey]);
        const {onThemeChange}=this.props;
        onThemeChange(ThemeFactory.createTheme(ThemeFlags[themeKey]));
    }
    getThemeItem(themeKey) {
        return (
            <TouchableHighlight
                style={{flex: 1}}
                underlayColor='white'
                onPress={()=>this.onSelectTheme(themeKey)}>
                <View style={[{backgroundColor: ThemeFlags[themeKey]}, styles.themeItem]}>
                    <Text style={styles.themeText}>{themeKey}</Text>
                </View>
            </TouchableHighlight>
        );
    }
    renderThemeItems() {
        var views = [];
        for (let i = 0, keys = Object.keys(ThemeFlags), l = keys.length; i < l; i += 3) {
            key1 = keys[i], key2 = keys[i + 1], key3 = keys[i + 2];
            views.push(<View key={i} style={{flexDirection: 'row'}}>
                {this.getThemeItem(key1)}
                {this.getThemeItem(key2)}
                {this.getThemeItem(key3)}
            </View>)
        }
        return views;
    }
    renderCustomThemeView() {
        return (<Modal
            animationType={"slide"}
            transparent={true}
            visible={this.props.visible}
            onRequestClose={() => {
                this.props.onClose();
            }}
        >
            <ScrollView style={styles.modalContainer}>
                {this.renderThemeItems()}
            </ScrollView>
        </Modal>)
    }
    render() {
        console.log('@@@@@@@@@@this.props.visible',this.props.visible)
        let view = this.props.visible ? <View style={GlobalStyles.listView_container}>
            {this.renderCustomThemeView()}
        </View> : null;
        return view
    }
}
const mapStateToProps=state=>({
})
const mapDispatchToProps=dispatch=>({
    onThemeChange:(theme)=>dispatch(actions.onThemeChange(theme))
})
export default connect(mapStateToProps,mapDispatchToProps)(customeTheme);
const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        margin: 10,
        marginTop: Platform.OS === 'ios' ? 20 : 10,
        backgroundColor: 'white',
        borderRadius: 3,
        shadowColor: 'gray',
        shadowOffset: {width: 2, height: 2},
        shadowOpacity: 0.5,
        shadowRadius: 2,
        padding: 3
    },
    themeItem: {
        flex: 1,
        height: 120,
        margin: 3,
        padding: 3,
        borderRadius: 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    themeText: {
        color: 'white',
        fontWeight: '500',
        fontSize: 16,
    }
})