import React, {Component} from 'react'
import {
    AppRegistry,
    Text,
    View,
    Alert,
    ToolbarAndroid,
    StyleSheet,
    TouchableHighlight,
    Navigator,
    BackAndroid,
    TouchableOpacity,
    StatusBar
} from 'react-native'

let _navigator;

BackAndroid.addEventListener('hardwareBackPress', () => {
  if (_navigator.getCurrentRoutes().length === 1) {
    return false;
  }
  _navigator.pop();
  return true;
});

class NavMenu extends Component {
    render() {
        return (
            <View style={styles.container}>
                <ToolbarAndroid
                    navIcon={require('./back_white_16.png')}
                    onIconClicked={this._back.bind(this)}
                    title="选择频道"
                    titleColor='#F8F8FF'
                    style={styles.toolbarAndroid}
                />
                <TouchableOpacity style={styles.navemenu}
                    renderSeparator={(sectionID, rowID) => <View key={`${sectionID}-${rowID}`} style={styles.separator}/>}>
                    <Text style={styles.navmenutext}>学校官方</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.navemenu}
                    renderSeparator={(sectionID, rowID) => <View key={`${sectionID}-${rowID}`} style={styles.separator}/>}>
                    <Text style={styles.navmenutext}>计算机学院/软件学院</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.navemenu}
                    renderSeparator={(sectionID, rowID) => <View key={`${sectionID}-${rowID}`} style={styles.separator}/>}>
                    <Text style={styles.navmenutext}>音乐学院</Text>
                </TouchableOpacity>

            </View>
        );
    }
    _back() {
        this.props.navigator.pop()
    }
    _renderSeparator(sectionID: number, rowID: number, adjacentRowHighlighted: bool) {
        return (
         <View
           key={`${sectionID}-${rowID}`}
           style={{
             height: adjacentRowHighlighted ? 4 : 1,
             backgroundColor: adjacentRowHighlighted ? '#3B5998' : '#CCCCCC',
           }}
         />
   );
    }
}
class AwesomeProject extends Component {

    render() {
        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor="#00CD00"
                 />
                <ToolbarAndroid
                    navIcon={require('./menu16.png')}
                    onIconClicked={this.navIconCallback.bind(this)}
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
        this.props.navigator.push({
            id:"navmenu",
            component:NavMenu
        });
    };

}

class NavMain extends Component {
    render() {
        return (
            <Navigator
                initialRoute={{id:"home"}}
                renderScene={this.navigatorRenderScene.bind(this)}
            />
        )
    }
    navigatorRenderScene(route,navigator) {
        _navigator = navigator;
        switch (route.id) {
            case 'home':
                return (<AwesomeProject id={"home"} navigator={navigator} />)
            case 'navmenu':
                return (<NavMenu id={"navmenu"} navigator={navigator} />)
        }

    }
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#ffffff',
    },
    toolbarAndroid:{
        height:46,
        backgroundColor:'#00CD00',
        shadowColor:'#F5F5F5',
    },
    navemenu:{
        paddingTop: 10,
        paddingBottom: 20
    },
    navmenutext:{
        color:"gray",
        fontSize:15,
        fontWeight: '100',
        fontFamily: 'sans-serif',
        paddingRight: 15,
        paddingLeft: 10,
        flexDirection: 'row',
    },
    separator:{
        height: 10,
        backgroundColor: '#43CD80',
    }
})

AppRegistry.registerComponent('AwesomeProject',()=>NavMain)
