import React, { Component } from 'react'
import { Text, View, Image, KeyboardAvoidingView, ScrollView, TouchableOpacity } from 'react-native'
import { Container, Card, CardItem, Body, Left, Icon, } from 'native-base'
import Headers from '../../../components/Header'
import styles from './Styles'

export default class NotifyScreen extends Component {
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
                        <Card style={styles.cardImage} transparent>
                            <CardItem>                               
                                <Left>
                                    <Icon name="notifications" style={styles.notify} />
                                    <Body>                                       
                                        <Text style={styles.mutedText}>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</Text>
                                    </Body>
                                </Left>
                            </CardItem>
                        </Card>
                        <Card style={styles.cardImage} transparent>
                            <CardItem>                               
                                <Left>
                                    <Icon name="notifications" style={styles.notify} />
                                    <Body>                                       
                                        <Text style={styles.mutedText}>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, Lorem Ipsum has been the industry's Lorem.</Text>
                                    </Body>
                                </Left>
                            </CardItem>
                        </Card>
                        <Card style={styles.cardImage} transparent>
                            <CardItem>                               
                                <Left>
                                    <Icon name="notifications" style={styles.notify} />
                                    <Body>                                       
                                        <Text style={styles.mutedText}>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</Text>
                                    </Body>
                                </Left>
                            </CardItem>
                        </Card>
                        <Card style={styles.cardImage} transparent>
                            <CardItem>                               
                                <Left>
                                    <Icon name="notifications" style={styles.notify} />
                                    <Body>                                       
                                        <Text style={styles.mutedText}>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</Text>
                                    </Body>
                                </Left>
                            </CardItem>
                        </Card>
                        <Card style={styles.cardImage} transparent>
                            <CardItem>                               
                                <Left>
                                    <Icon name="notifications" style={styles.notify} />
                                    <Body>                                       
                                        <Text style={styles.mutedText}>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</Text>
                                    </Body>
                                </Left>
                            </CardItem>
                        </Card>
                        <Card style={styles.cardImage} transparent>
                            <CardItem>                               
                                <Left>
                                    <Icon name="notifications" style={styles.notify} />
                                    <Body>                                       
                                        <Text style={styles.mutedText}>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</Text>
                                    </Body>
                                </Left>
                            </CardItem>
                        </Card>
                        <Card style={styles.cardImage} transparent>
                            <CardItem>                               
                                <Left>
                                    <Icon name="notifications" style={styles.notify} />
                                    <Body>                                       
                                        <Text style={styles.mutedText}>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, Lorem Ipsum has been the industry's Lorem.</Text>
                                    </Body>
                                </Left>
                            </CardItem>
                        </Card>
                        <Card style={styles.cardImage} transparent>
                            <CardItem>                               
                                <Left>
                                    <Icon name="notifications" style={styles.notify} />
                                    <Body>                                       
                                        <Text style={styles.mutedText}>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</Text>
                                    </Body>
                                </Left>
                            </CardItem>
                        </Card>
                        <Card style={styles.cardImage} transparent>
                            <CardItem>                               
                                <Left>
                                    <Icon name="notifications" style={styles.notify} />
                                    <Body>                                       
                                        <Text style={styles.mutedText}>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</Text>
                                    </Body>
                                </Left>
                            </CardItem>
                        </Card>
                        <Card style={styles.cardImage} transparent>
                            <CardItem>                               
                                <Left>
                                    <Icon name="notifications" style={styles.notify} />
                                    <Body>                                       
                                        <Text style={styles.mutedText}>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, Lorem Ipsum has been the industry's Lorem.</Text>
                                    </Body>
                                </Left>
                            </CardItem>
                        </Card>
                        <Card style={styles.cardImage} transparent>
                            <CardItem>                               
                                <Left>
                                    <Icon name="notifications" style={styles.notify} />
                                    <Body>                                       
                                        <Text style={styles.mutedText}>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, Lorem Ipsum has been the industry's Lorem.</Text>
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


