import React, { Component } from 'react'
import { Text, View, Image, KeyboardAvoidingView, ScrollView, TouchableOpacity } from 'react-native'
import { Container, Thumbnail, Button, Icon, Header, Drawer, Left, Body, Footer, Item, Input } from 'native-base'
import styles from "./Styles";

// import SideBar from '../../components/sidebar'

export default class HomeScreen extends Component {
    static navigationOptions = {
        header: null,
    };   
    render() {
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
                <Header style={styles.topBarMenu}>
                    <View style={{ width: 40 }}>
                        <TouchableOpacity onPress={()=>this.props.navigation.navigate('ChatScreen')}>
                            <Icon name="arrow-round-back" size={60} style={{ color: '#fdd41a' }} />
                        </TouchableOpacity>                       
                    </View>
                    <View style={{flexDirection:'row', justifyContent:'flex-start', alignItems:'center', flex:1}}>                        
                        <Thumbnail source={require('../../../../assets/images/thumb2.png')} />
                        <View style={{marginLeft:10}}>
                            <Text style={styles.themeText}>S DAS</Text>
                            <Text style={styles.blackhead}>Music Director</Text>
                        </View> 
                    </View>
                </Header>
                <ScrollView>
                    <Container style={styles.bodyWrap}>
                        <View style={styles.leftChat}>
                            <Thumbnail source={require('../../../../assets/images/thumb2.png')} small />
                            <View style={styles.chLeft}>
                                <Text style={styles.chatText}>Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Text>                           
                            </View> 
                            <Text style={styles.dateLeft}>MON 16:18</Text>
                        </View>               
                        <View style={[styles.leftChat, styles.rightChat]}>                            
                            <View style={styles.chRight}>
                                <Text style={[styles.chatText, {textAlign:'right'}]}>Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Text>                           
                            </View> 
                            <Thumbnail source={require('../../../../assets/images/thumb3.png')} small />
                            <Text style={[styles.dateLeft, {right:'auto',left:10}]}>MON 16:18</Text>
                        </View>               
                        
                        
                        
                    </Container>
                </ScrollView>
                <Footer style={styles.footerI}>
                    <Item style={styles.footerInput}>
                        <Input placeholder='Type A Message' placeholderTextColor={'#777'} />
                        <TouchableOpacity><Icon active name='paper-plane' size={40} style={{color:'#6a6969'}} /></TouchableOpacity>
                    </Item>
                </Footer>
            </KeyboardAvoidingView>
        )
    }
};


