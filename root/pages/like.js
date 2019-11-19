import React, { Component } from 'react';
import {View,Text,Button} from 'react-native';
class Like extends Component {
    render() {
        const {navigation} = this.props;
        return (
                <View>
                    <Text>
                        Like
                    </Text> 
                    <Button
                        title="改变主题"
                        onPress={()=>navigation.setParams({
                            theme:{
                                tintColor:"blue",
                                updateTime:new Date().getTime()
                            }
                        })}
                    /> 
                </View>
        );
    }
}

export default Like;