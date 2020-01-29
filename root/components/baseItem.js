/*
 * @Author: your name
 * @Date: 2019-12-25 11:23:59
 * @LastEditTime : 2020-01-29 17:14:37
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \reactNativeProject\myapp\root\components\baseItem.js
 */
import React, { Component } from 'react';
import {PropTypes} from 'prop-types';
import { TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
class baseItem extends Component {
    static propTypes={
        projectModel:PropTypes.object,
        onSelect:PropTypes.func,
        onFavorite:PropTypes.func
    }
    constructor(props){
        super(props)
        this.state={
            isFavorite:this.props.projectModel.isFavorite,
        }
    }
    static getDerivedStateFromProps (nextProps,prevState) {
        const isFavorite=nextProps.projectModel.isFavorite;
        if(prevState.isFavorite!==isFavorite){
            return{
                isFavorite:isFavorite
            }
        }
        return null;
    }
    setFavoriteState=(isFavorite)=>{
        this.props.projectModel.isFavorite=isFavorite;
        this.setState({
            isFavorite:isFavorite
        })
    }
    onPressFavorite=()=>{
        this.setFavoriteState(!this.state.isFavorite)
        console.log('@@@@@@@baseItem',!this.state.isFavorite,this.props.projectModel.item)
        console.log('@@@@@@@baseItem11111111',!this.state.isFavorite)
        this.props.onFavorite(this.props.projectModel.item,!this.state.isFavorite)
    }
    onItemClick=()=>{
            this.props.onSelect(isFavorite=>{
                this.setFavoriteState(isFavorite)
            })
    }
   _favoriteButton=()=>{
        return <TouchableOpacity
            style={{color:"#678"}}
            size={26}
            onPress={()=>{this.onPressFavorite()}}
            underlayColor={'transparent'}
        >
            <FontAwesome name={this.state.isFavorite?'star':"star-o"} size={26} style={{color:"red"}}/>
        </TouchableOpacity>
   }
}

export default baseItem;