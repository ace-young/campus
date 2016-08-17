import React, {Component} from 'react';
import {AppRegistry, Image,Text,View} from 'react-native';


class Greeting extends Component {
    render() {
        return (
            <Text>Hello {this.props.name} !</Text>
        );
    }
}
class AwesomeProject extends Component {
    render() {
        return (
            <View style = {{alignItems:'center'}}>
                <Greeting name = 'Rexxar' />
                <Greeting name = 'LWH' />
            </View>
        );
    }
}

AppRegistry.registerComponent('AwesomeProject', ()=>AwesomeProject)
