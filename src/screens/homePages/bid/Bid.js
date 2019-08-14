import React, { Component } from 'react'
import { Text, View, Image, KeyboardAvoidingView, ScrollView, TouchableOpacity } from 'react-native'
import { Container, Form, Button, Icon, Header, Drawer, Textarea, Input, Item } from 'native-base'
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
                        <TouchableOpacity>
                            <Icon name="arrow-round-back" size={60} style={{ color: '#fdd41a' }} />
                        </TouchableOpacity>                       
                    </View>
                    <View style={{ flex: 1 }}>
                       <Text style={styles.backHead}>Biding</Text>
                    </View>
                </Header>
                <ScrollView>
                    <Container style={styles.bodyWrap}>
                        <Form>
                            <Text style={styles.label}>Description Field</Text>
                            <Textarea rowSpan={5} bordered placeholder="Write Details" style={styles.araStyle} />
                            <Item rounded style={styles.inputWrap2}>
                                <Input placeholder='Bid Price' placeholderTextColor="#727272" style={styles.inputStyle} />
                                <TouchableOpacity><Icon name='close-circle' style={styles.iconInput}/></TouchableOpacity>
                            </Item>
                            <Button block rounded style={[styles.buttonStyle]} 
                            // onPress={()=>this.props.navigation.navigate('tab')}
                            >                        
                                <Text style={styles.buttonText}>Submit Bid</Text>
                            </Button>
                        </Form>                            
                    </Container>
                </ScrollView>
            </KeyboardAvoidingView>
        )
    }
};

