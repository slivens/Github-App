import React, { Component } from 'react';
import {View,Text,StyleSheet} from 'react-native';
class Welcome extends Component {
    componentDidMount(){
        this.timer=setTimeout(()=>{
            const {navigation}=this.props;
            navigation.navigate("Main")
        },2000)
    }
    componentWillUnmount(){
        this.timer&&clearTimeout(this.timer)
    }
    render() {
        return (
            <View style={styles.container}>
                <Text>
                Welcome to Sliven!
                </Text>
            </View>
        );
    }
}
const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"#F5FcFF"
    }
})
export default Welcome;