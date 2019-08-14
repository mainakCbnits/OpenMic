import React, { Component } from 'react'
import { Text, View, Image, KeyboardAvoidingView, ScrollView, TouchableOpacity } from 'react-native'
import { Container, Card, CardItem, Body, Left, Thumbnail } from 'native-base'
import Headers from '../../../components/Header';
import styles from "./Styles";

export default class HomeScreen extends Component {
    static navigationOptions = {
        header: null,
    };  
    
    constructor(props){
        super(props);
    }

    render() {
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
                <Headers {...this.props}/>
                <ScrollView>
                    <Container style={styles.bodyWrap}>
                        <TouchableOpacity 
                        onPress={()=>this.props.navigation.navigate('EventScreen')}>
                            <Card style={styles.cardImage}>                           
                                <CardItem cardBody>
                                    <Image source={require('../../../../assets/images/card1.jpg')} style={styles.imageCard} />                                
                                </CardItem>
                                <CardItem>
                                    <Text style={styles.imageTitle}>Music Concert</Text>
                                </CardItem>
                                <CardItem style={styles.topBorder}>                               
                                    <Left>
                                        <Thumbnail source={require('../../../../assets/images/thumbnail.jpg')} small />
                                        <Body>
                                            <Text style={styles.blackText}>User Name</Text>
                                            <Text style={styles.mutedText}>Music Producers</Text>
                                        </Body>
                                    </Left>
                                </CardItem>
                            </Card>
                        </TouchableOpacity>
                        <Card style={styles.cardImage}>                           
                            <CardItem cardBody>
                                <Image source={require('../../../../assets/images/card2.jpg')} style={styles.imageCard} />                                
                            </CardItem>
                            <CardItem>
                                <Text style={styles.imageTitle}>Music Concert</Text>
                            </CardItem>
                            <CardItem style={styles.topBorder}>                               
                                <Left>
                                    <Thumbnail source={require('../../../../assets/images/thumbnail.jpg')} small />
                                    <Body>
                                        <Text style={styles.blackText}>User Name</Text>
                                        <Text style={styles.mutedText}>Music Producers</Text>
                                    </Body>
                                </Left>
                            </CardItem>
                        </Card>
                        <Card style={styles.cardImage}>                           
                            <CardItem cardBody>
                                <Image source={require('../../../../assets/images/card3.jpg')} style={styles.imageCard} />                                
                            </CardItem>
                            <CardItem>
                                <Text style={styles.imageTitle}>Music Concert</Text>
                            </CardItem>
                            <CardItem style={styles.topBorder}>                               
                                <Left>
                                    <Thumbnail source={require('../../../../assets/images/thumbnail.jpg')} small />
                                    <Body>
                                        <Text style={styles.blackText}>User Name</Text>
                                        <Text style={styles.mutedText}>Music Producers</Text>
                                    </Body>
                                </Left>
                            </CardItem>
                        </Card>
                    </Container>
                </ScrollView>
            </KeyboardAvoidingView>
        )
    }
};


