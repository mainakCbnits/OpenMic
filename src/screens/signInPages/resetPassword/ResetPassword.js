import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image, KeyboardAvoidingView, ScrollView, TextInput } from 'react-native';
import { Container, Button, Icon, Item } from 'native-base';
import styles from './Styles'
import { POST, endPoints } from "../../../network/api";
import Animation from 'lottie-react-native';

export default class ResetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            holderEmail: this.props.navigation.getParam('resetPasswordParams').resetFromEmail,
            holderNewPass: "",
            holderConfirmPass: "",
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

    _onPressResetPassword = async () => {

        if (this.state.holderNewPass === "") {
            this.setState({ errorText: "Please enter your new password" });
            return;
        }

        if (!this.state.holderNewPass.match("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,20}$")) {
            this.setState({
                errorText: "Password should be six characters. At least one number, one lowercase and one uppercase letter"
            });
            return;
        }

        if (this.state.holderConfirmPass == "") {
            this.setState({ errorText: "Please confirm your password" });
            return;
        }

        if (this.state.holderNewPass != this.state.holderConfirmPass) {
            this.setState({ errorText: "Password doesn't match" });
            return;
        }

        const resetPassParams = {
            emailAddress: this.state.holderEmail,
            password: this.state.holderNewPass
        }

        this.setState({ errorText: "", isLoading: true });
        this._playAnim();

        var res = await POST(endPoints.passwordUpdate, resetPassParams);

        this.setState({ isLoading: false });

        if (res.ack == 1) {
            //this.props.navigation.pop();
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
                                <Text style={styles.boldText}>Reset your password?</Text>
                                <Item rounded style={styles.inputWrap}>
                                    <TextInput
                                        secureTextEntry={true}
                                        placeholder='New Password'
                                        placeholderTextColor="#727272"
                                        style={styles.inputStyle}
                                        value={this.state.holderNewPass}
                                        onChangeText={text => this.setState({ holderNewPass: text })} />

                                    <TouchableOpacity><Icon name='close-circle' style={styles.iconInput} /></TouchableOpacity>
                                </Item>
                                <Item rounded style={styles.inputWrap}>
                                    <TextInput
                                        secureTextEntry={true}
                                        placeholder='Confirm Password'
                                        placeholderTextColor="#727272"
                                        style={styles.inputStyle}
                                        value={this.state.holderConfirmPass}
                                        onChangeText={text => this.setState({ holderConfirmPass: text })} />
                                    <TouchableOpacity><Icon name='close-circle' style={styles.iconInput} /></TouchableOpacity>
                                </Item>

                                <View style={styles.errorTxtView}>
                                    <Text style={styles.errorTxt}>
                                        {this.state.errorText}
                                    </Text>
                                </View>

                                <Button block rounded style={styles.buttonStyle} onPress={() => this._onPressResetPassword()}>
                                    <Text style={styles.buttonText}>Done</Text>
                                </Button>
                            </View>
                        </Container>
                    </ScrollView>
                </KeyboardAvoidingView>
            )
    }
};
