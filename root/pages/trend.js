import React, { Component } from 'react';
import {View,Text,Button} from 'react-native';
class Trend extends Component {
    render() {
        const {navigation} = this.props; 
        console.log('@@@@trend'+JSON.stringify(this.props.navigation))
        return (
                <View>
                    <Text>
                    Trend
                    </Text>
                    <Button
                        title="改变主题"
                        onPress={()=>navigation.setParams({
                            theme:{
                                tintColor:"red",
                                updateTime:new Date().getTime()
                            }
                        })}
                    /> 
                </View>
        );
    }
}

export default Trend;