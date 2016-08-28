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
    StatusBar,
    ScrollView,
    ListView,
    Console
} from 'react-native'

let REQUEST_URL = 'http://www.lwhile.com/api/0.01/client/loadMessage?';
let _navigator;

BackAndroid.addEventListener('hardwareBackPress', () => {
  if (_navigator.getCurrentRoutes().length === 1) {
    return false;
  }
  _navigator.pop();
  return true;
});

class NavMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title:null
        }
    }
    render() {
        return (
            <ScrollView  style={styles.container}>
                <ToolbarAndroid
                    navIcon={require('./back_white_16.png')}
                    onIconClicked={this._back.bind(this)}
                    title="选择频道"
                    titleColor='#F8F8FF'
                    style={styles.toolbarAndroid}
                />
            <TouchableOpacity style={styles.navemenu} onPress={()=>this._callback("校方")}
                    renderSeparator={(sectionID, rowID) => <View key={`${sectionID}-${rowID}`} style={styles.separator}/>}>
                    <Text style={styles.navmenutext}>校方</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.navemenu} onPress={()=>this._callback("计算机学院/软件学院")}
                    renderSeparator={(sectionID, rowID) => <View key={`${sectionID}-${rowID}`} style={styles.separator}/>}>
                    <Text style={styles.navmenutext}>计算机学院/软件学院</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.navemenu} onPress={()=>this._callback("音乐学院")}
                    renderSeparator={(sectionID, rowID) => <View key={`${sectionID}-${rowID}`} style={styles.separator}/>}>
                    <Text style={styles.navmenutext}>音乐学院</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.navemenu} onPress={()=>this._callback("经济与管理学院")}
                    renderSeparator={(sectionID, rowID) => <View key={`${sectionID}-${rowID}`} style={styles.separator}/>}>
                    <Text style={styles.navmenutext}>经济与管理学院</Text>
                </TouchableOpacity>

            </ScrollView>
        );
    }
    _back() {
        this.props.navigator.pop()
    }
    _callback(title) {
        //alert(title)
        this.props.navigator.resetTo({
            id:'home1',
            component:NavMain,
            params:{title:title}
        })
    }

}
class AwesomeProject extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataSource:new ListView.DataSource({
                rowHasChanged:(row1,row2) => row1 !== row2,
            }),
            loaded:false,
        };
        this.getMessageData = this.getMessageData.bind(this);
    }

    componentDidMount() {
        this.getMessageData()
    }

    render() {
        //Alert.alert(this.props.title)

        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor="#1E90FF"
                 />
                <ToolbarAndroid
                    navIcon={require('./menu16.png')}
                    onIconClicked={this.navIconCallback.bind(this)}
                    title={this.props.title}
                    actions={[{title:'设置',show:'never'}, {title:'关于',show:'never'}]}
                    onActionSelected={this.onActionSelected}
                    titleColor='#F8F8FF'
                    style={styles.toolbarAndroid}
                />
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.renderMessage}
                    style={styles.listView}
                  />
            </View>

        )

    };
    renderMessage(message) {
        return (
            <View style={styles.headerContainer}>
                <Text style={styles.headerTitle}>
                    {message.title}
                </Text>
                <Text>
                    {message.content}
                </Text>
                <Text>
                    {message.time}
                </Text>
            </View>
        )
    }
    onActionSelected(position) {
        Alert.alert('alert')
    };
    navIconCallback() {
        this.props.navigator.push({
            id:"navmenu",
            component:NavMenu,
        });
    };
    _loadView() {
        //Alert.alert('alert')
        return true
    };
    getMessageData() {
        //Alert.alert(this.props.title)
        _url = REQUEST_URL + 'organization=' + this.props.title
        console.log(_url)
        fetch(_url)
            .then((response)=>response.json())
            .then((responseData)=>{
                this.setState({
                    dataSource:this.state.dataSource.cloneWithRows(responseData),
                    loaded:true
                });
                console.log(_url)
                console.log(responseData)
            })
            .done();
    }

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
                return (<AwesomeProject {...route.params} id={"home"} title={'校方'} navigator={navigator} />)
            case 'navmenu':
                return (<NavMenu {...route.params} id={"navmenu"} navigator={navigator} />)
            case 'home1':
                return (<AwesomeProject {...route.params} id={"home"}  navigator={navigator} />)
        }

    }
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#ffffff',
    },
    listView:{

    },
    headerContainer: {
        flex: 1,
        backgroundColor: '#F6F6EF',
        flexDirection: 'column',
        paddingRight: 10,
        paddingLeft: 10,
    },
    headerTitle: {
      fontSize: 20,
      textAlign: 'left',
      marginTop: 10,
      marginBottom: 10,
      color: '#FF6600',
    },
    views:{
        flex:1,

    },
    toolbarAndroid:{
        height:46,
        backgroundColor:'#1E90FF',
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
