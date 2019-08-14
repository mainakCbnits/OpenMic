import React, { Component } from 'react';
import { Text, View, Image, KeyboardAvoidingView, ScrollView, TouchableOpacity } from 'react-native';
import { Container, Button } from 'native-base';
import CodeInput from 'react-native-confirmation-code-input';
import styles from './Styles'
import { POST, endPoints } from "../../../network/api";
import Animation from 'lottie-react-native';

export default class OtpVerify extends Component {
    constructor(props) {
        super(props);
        this.state = {
            verifyEmail: this.props.navigation.getParam('verifyOtpParams').verifyEmail,
            fromPage: this.props.navigation.getParam('verifyOtpParams').fromPage,
            enteredOtpCode: "",
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

    _onPressVerifyOtp = async () => {

        if (this.state.enteredOtpCode == "") {
            this.setState({ errorText: "Please enter the otp" });
            return;
        }

        const otpVerifyParams = {
            emailAddress: this.state.verifyEmail,
            otp: this.state.enteredOtpCode
        }

        this.setState({ errorText: "", isLoading: true });
        this._playAnim();

        var res = await POST(
            this.state.fromPage === "SignUp"
                ? endPoints.otpVerifySignUp
                : endPoints.otpVerifyForgotPassword
            , otpVerifyParams
        );

        this.setState({ isLoading: false });

        if (res.ack == 1) {
            this.props.navigation.popToTop();

            if (this.state.fromPage === "SignUp") {
                this.props.navigation.navigate('_ThankYouScreen');
            } else {
                const resetPasswordParams = {
                    resetFromEmail: this.state.verifyEmail
                }

                this.props.navigation.navigate('ResetPasswordScreen', { resetPasswordParams, resetPasswordParams });
            }

        } else if (res.ack == 0) {
            this.setState({ errorText: res.message });
        } else {
            this.setState({ errorText: "Some error happened.. Please retry!" });
        }
    }

    _onPressResendOtp = async () => {

        const resendVerifyOtpParam = {
            emailAddress: this.state.verifyEmail
        }

        this.setState({ errorText: "", isLoading: true });
        this._playAnim();

        var res = await POST(
            this.state.fromPage === "SignUp"
                ? endPoints.resendVerifyOtp
                : endPoints.resendResetPasswordOtp
            , resendVerifyOtpParam
        );

        this.setState({ isLoading: false });

        if (res.ack == 1) {
            this.setState({ errorText: res.message });
        } else if (res.ack == 0) {
            this.setState({ errorText: res.message });
        } else {
            this.setState({ errorText: "Some error happened.. Please retry!" });
        }
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
                                <Text style={[styles.boldText, { marginBottom: 20, fontWeight: '400' }]}>Enter the 4 digit code we sent you via email to continue</Text>
                                <View>
                                    <CodeInput
                                        keyboardType="numeric"
                                        secureTextEntry
                                        className={'border-b'}
                                        space={10}
                                        size={50}
                                        inactiveColor={'#fdd41a'}
                                        activeColor={'#000'}
                                        codeLength={4}
                                        inputPosition='center'
                                        onFulfill={(enteredOtpCode) => this.setState({ enteredOtpCode })}
                                    />
                                </View>
                                <View style={styles.errorTxtView}>
                                    <Text style={styles.errorTxt}>
                                        {this.state.errorText}
                                    </Text>
                                </View>
                                <Button block rounded style={styles.buttonStyle} onPress={() => this._onPressVerifyOtp()}>
                                    <Text style={styles.buttonText}>Verify</Text>
                                </Button>

                                <TouchableOpacity onPress={() => this._onPressResendOtp()}>
                                    <Text style={[styles.grayText, { marginTop: 10 }]}>Didn’t get the code? <Text style={styles.boldText}>Resend Code</Text></Text>
                                </TouchableOpacity>
                            </View>

                        </Container>
                    </ScrollView>
                </KeyboardAvoidingView>
            )
    }
};
