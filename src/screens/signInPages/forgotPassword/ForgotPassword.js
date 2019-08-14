import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image, KeyboardAvoidingView, ScrollView, TextInput } from 'react-native';
import { Container, Button, Icon, Item } from 'native-base';
import styles from './Styles'
import { POST, endPoints } from "../../../network/api";
import Animation from 'lottie-react-native';

export default class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            errorText: "",
            isLoading: false
        };
    }

    _playAnim() {
        if (!this.animation) {
            setTimeout(() => {
                this._playAnim();
            }, 100);
        } else {
            this.animation.play();
        }
    }

    _resetField = () => {
        this.setState({ email: "" });
    }

    _onClickSendOtp = async () => {

        if (this.state.email == "") {
            this.setState({ errorText: "Please enter your email" });
            return;
        }

        const forgotPassParams = {
            emailAddress: this.state.email
        }

        this.setState({ errorText: "", isLoading: true });
        this._playAnim();

        var res = await POST(endPoints.forgotPassword, forgotPassParams);

        this.setState({ isLoading: false });

        if (res.ack == 1) {
            this._moveToOtpVerifyPage(this.state.email);
        } else if (res.ack == 0) {
            this.setState({ errorText: res.message });
        } else {
            this.setState({ errorText: "Some error happened.. Please retry!" });
        }
    }

    _moveToOtpVerifyPage = (verifyEmail) => {

        const verifyOtpParams = {
            verifyEmail: verifyEmail,
            fromPage: "ForgotPassword"
        }
        //this.props.navigation.popToTop();
        this.props.navigation.navigate('OtpVerifyScreen', { verifyOtpParams: verifyOtpParams });
    }

    render() {
        if (this.state.isLoading)
            return (
                <View style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                }}>
                    <Animation
                        ref={animation => { this.animation = animation; }}
                        style={{ width: 200, height: 200 }}
                        loop={true}
                        source={require("../../../../assets/Json/anim.json")}
                    />
                </View>
            )
        else
            return (
                <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
                    <View style={styles.topBar}></View>
                    <ScrollView>
                        <Container style={styles.bodyWrap}>
                            <View style={styles.topLogo}>
                                <Image source={require('../../../../assets/images/logo.png')} resizeMode="contain" style={styles.logo} />
                            </View>
                            <View style={styles.formData}>
                                <Text style={[styles.boldText, { marginBottom: 20, fontWeight: '400' }]}>Forgot your password?</Text>
                                <Item rounded style={styles.inputWrap}>
                                    <TextInput
                                        autoCapitalize="none"
                                        keyboardType="email-address"
                                        placeholder='Enter your Email'
                                        placeholderTextColor="#727272"
                                        style={styles.inputStyle}
                                        value={this.state.email}
                                        onChangeText={text => this.setState({ email: text })} />
                                    <TouchableOpacity onPress={() => this._resetField()}>
                                        <Icon name='close-circle' style={styles.iconInput} />
                                    </TouchableOpacity>
                                </Item>
                                <View style={styles.errorTxtView}>
                                    <Text style={styles.errorTxt}>
                                        {this.state.errorText}
                                    </Text>
                                </View>
                                <Button
                                    onPress={() => this._onClickSendOtp()}
                                    block
                                    rounded
                                    style={[styles.buttonStyle,]}>
                                    <Text style={styles.buttonText}>Send</Text>
                                </Button>
                            </View>
                        </Container>
                    </ScrollView>
                </KeyboardAvoidingView>
            )
    }
};
