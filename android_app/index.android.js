import React, {Component} from 'react'
import {
    AppRegistry,
    Text,
    View,
    Alert,
    ToolbarAndroid,
    StyleSheet
} from 'react-native'

class AwesomeProject extends Component {
    render() {
        return (
            <View>
            <ToolbarAndroid
                navIcon={require('./menu16.png')}
                onIconClicked={this.navIconCallback}
                title="计算机学院/软件学院"
                actions={[{title:'设置',show:'never'}, {title:'关于',show:'never'}]}
                onActionSelected={this.onActionSelected}
                titleColor='#F8F8FF'
                style={styles.toolbarAndroid}
            />
        </View>


        )
    };
    onActionSelected(position) {
        Alert.alert('alert')
    };
    navIconCallback() {
        Alert.alert('alert')
    };
}

const styles = StyleSheet.create({
    toolbarAndroid:{
        height:46,
        backgroundColor:'#00CD00',
        shadowColor:'#F5F5F5',
    }
})

AppRegistry.registerComponent('AwesomeProject',()=>AwesomeProject)
