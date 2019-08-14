import React, { Component } from 'react'
import { Text, View, Image, KeyboardAvoidingView, ScrollView, TouchableOpacity } from 'react-native'
import { Container, Card, CardItem, Body, Left, Icon, Thumbnail } from 'native-base'
import Headers from '../../../components/Header'
import styles from "./Styles";

export default class Chat extends Component {
    static navigationOptions = {
        header: null,
    };
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
                <Headers {...this.props} />
                <ScrollView>
                    <Container style={styles.bodyWrap}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('ChatListScreen')}>
                            <Card style={styles.cardImage}>
                                <CardItem>
                                    <Left>
                                        <Thumbnail source={require('../../../../assets/images/thumb1.png')} large />
                                        <Body>
                                            <Text style={styles.blackText}>P Sen</Text>
                                            <Text style={styles.mutedText}><Icon name="briefcase" style={styles.txtIcon} /> Worked with ABC technology</Text>
                                        </Body>
                                        <Text style={styles.absDate}>16:30</Text>
                                    </Left>
                                </CardItem>
                            </Card>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Card style={styles.cardImage}>
                                <CardItem>
                                    <Left>
                                        <Thumbnail source={require('../../../../assets/images/thumb2.png')} large />
                                        <Body>
                                            <Text style={styles.blackText}>P Sen</Text>
                                            <Text style={styles.mutedText}><Icon name="briefcase" style={styles.txtIcon} /> Worked with ABC technology</Text>
                                        </Body>
                                        <Text style={styles.absDate}>16:30</Text>
                                    </Left>
                                </CardItem>
                            </Card>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Card style={styles.cardImage}>
                                <CardItem>
                                    <Left>
                                        <Thumbnail source={require('../../../../assets/images/thumb3.png')} large />
                                        <Body>
                                            <Text style={styles.blackText}>P Sen</Text>
                                            <Text style={styles.mutedText}><Icon name="briefcase" style={styles.txtIcon} /> Worked with ABC technology</Text>
                                        </Body>
                                        <Text style={styles.absDate}>16:30</Text>
                                    </Left>
                                </CardItem>
                            </Card>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Card style={styles.cardImage}>
                                <CardItem>
                                    <Left>
                                        <Thumbnail source={require('../../../../assets/images/thumb4.png')} large />
                                        <Body>
                                            <Text style={styles.blackText}>P Sen</Text>
                                            <Text style={styles.mutedText}><Icon name="briefcase" style={styles.txtIcon} /> Worked with ABC technology</Text>
                                        </Body>
                                        <Text style={styles.absDate}>16:30</Text>
                                    </Left>
                                </CardItem>
                            </Card>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Card style={styles.cardImage}>
                                <CardItem>
                                    <Left>
                                        <Thumbnail source={require('../../../../assets/images/thumb2.png')} large />
                                        <Body>
                                            <Text style={styles.blackText}>P Sen</Text>
                                            <Text style={styles.mutedText}><Icon name="briefcase" style={styles.txtIcon} /> Worked with ABC technology</Text>
                                        </Body>
                                        <Text style={styles.absDate}>16:30</Text>
                                    </Left>
                                </CardItem>
                            </Card>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Card style={styles.cardImage}>
                                <CardItem>
                                    <Left>
                                        <Thumbnail source={require('../../../../assets/images/thumb3.png')} large />
                                        <Body>
                                            <Text style={styles.blackText}>P Sen</Text>
                                            <Text style={styles.mutedText}><Icon name="briefcase" style={styles.txtIcon} /> Worked with ABC technology</Text>
                                        </Body>
                                        <Text style={styles.absDate}>16:30</Text>
                                    </Left>
                                </CardItem>
                            </Card>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Card style={styles.cardImage}>
                                <CardItem>
                                    <Left>
                                        <Thumbnail source={require('../../../../assets/images/thumb2.png')} large />
                                        <Body>
                                            <Text style={styles.blackText}>P Sen</Text>
                                            <Text style={styles.mutedText}><Icon name="briefcase" style={styles.txtIcon} /> Worked with ABC technology</Text>
                                        </Body>
                                        <Text style={styles.absDate}>16:30</Text>
                                    </Left>
                                </CardItem>
                            </Card>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Card style={styles.cardImage}>
                                <CardItem>
                                    <Left>
                                        <Thumbnail source={require('../../../../assets/images/thumb4.png')} large />
                                        <Body>
                                            <Text style={styles.blackText}>P Sen</Text>
                                            <Text style={styles.mutedText}><Icon name="briefcase" style={styles.txtIcon} /> Worked with ABC technology</Text>
                                        </Body>
                                        <Text style={styles.absDate}>16:30</Text>
                                    </Left>
                                </CardItem>
                            </Card>
                        </TouchableOpacity>
                    </Container>
                </ScrollView>
            </KeyboardAvoidingView>
        )
    }
};


