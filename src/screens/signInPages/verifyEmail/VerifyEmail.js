import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Image, KeyboardAvoidingView, ScrollView } from 'react-native'
import { Container, Button, Icon, Item, Input } from 'native-base'
import styles from './Styles'

export default class VerifyEmail extends Component {

    moveToPage = () => {
        this.props.navigation.navigate('OtpVerifyScreen');
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
                            <Text style={styles.boldText}>Enter the email address that you want to verify</Text>
                            <Item rounded style={styles.inputWrap}>
                                <Input placeholder='Enter your Email' placeholderTextColor="#727272" style={styles.inputStyle} />
                                <TouchableOpacity><Icon name='close-circle' style={styles.iconInput} /></TouchableOpacity>
                            </Item>
                            <Button block rounded style={[styles.buttonStyle]} onPress={() => this.moveToPage()}>
                                <Text style={styles.buttonText}>Send OTP</Text>
                            </Button>
                        </View>

                    </Container>
                </ScrollView>
            </KeyboardAvoidingView>
        )
    }
};
