import React, {Component} from 'react';
import {AppRegistry, Image,Text,View} from 'react-native';


class Blink extends Component {
    constructor(props) {
        super(props);
        this.state = {showText:true};

        //每1000毫秒对showText状态做一次取反操作
        setInterval(() => {
            this.setState({showText:!this.state.showText});
        }, 2000);
    }

    render() {
        let display = this.state.showText ? this.props.text : ' ';
        return (
            <Text>{display}</Text>
        );
    }
}

class AwesomeProject extends Component {
    render() {
        return (
            <View>
                <Blink text='LWH' />
                <Blink text='a'/>
            </View>
        );
    }
}
AppRegistry.registerComponent('AwesomeProject', ()=>AwesomeProject)
