import React, { Component } from 'react'
import { Text, View,TouchableOpacity } from 'react-native'
import {Item, Input, Icon, Header,} from 'native-base'
import { DrawerActions } from 'react-navigation';
import styles from './styles'

export default class Headers extends Component {

    render() {
        return (
            <Header style={styles.topbarmenu}>
                <View style={{ width: 40, justifyContent:'center' }}>
                    <TouchableOpacity onPress={() =>  this.props.navigation.openDrawer()}>
                        <Icon name="menu" size={80} style={{ color: '#fdd41a' }} />
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1 }}>
                    <Item rounded style={styles.inputwrap}>
                        <Input placeholder='Enter your Email' placeholderTextColor="#727272" style={styles.inputstyle} />
                        <TouchableOpacity><Icon name='search' style={styles.iconinput} /></TouchableOpacity>
                    </Item>
                </View>
            </Header>
        )
    }
}
