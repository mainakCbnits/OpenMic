import React, { Component } from 'react'
import { Text, View, Image, KeyboardAvoidingView, ScrollView } from 'react-native'
import { Container } from 'native-base'
import styles from './Styles'

export default class ThankYou extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
                <View style={styles.topBar}></View>
                <ScrollView>
                    <Container style={styles.bodyWrap}>
                        <View style={styles.topLogo}>
                            <Image source={require('../../../../assets/images/logo.png')} resizeMode="contain" style={styles.logo} />
                        </View>
                        <View style={styles.formData}>
                            <View style={styles.imgHold}>
                                <Image source={require('../../../../assets/images/check.png')} resizeMode="contain" style={styles.imgCheck} />
                            </View>
                            <View style={styles.imgHold}>
                                <Image source={require('../../../../assets/images/thank.png')} resizeMode="contain" style={styles.imgThankYou} />
                            </View>
                            <View style={{}}>
                                <Text style={styles.iconInput}>Email Address Verified</Text>
                            </View>
                        </View>
                    </Container>
                </ScrollView>
            </KeyboardAvoidingView>
        )
    }
};
