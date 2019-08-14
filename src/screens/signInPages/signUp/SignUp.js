import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image, KeyboardAvoidingView, ScrollView, TextInput } from 'react-native';
import { Container, Button, Icon, Item, CheckBox, Picker } from 'native-base';
import styles from './Styles'
import { POST, endPoints } from "../../../network/api";
import Animation from 'lottie-react-native';

export default class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fName: "",
            lName: "",
            email: "",
            password: "",
            confirmPassword: "",
            selectedUserRoleKey: "0",
            isTermsSelected: true,
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

    _setUserType = (value) => {
        this.setState({ selectedUserRoleKey: value });
    }

    _toggleTerms = () => {
        this.setState({ isTermsSelected: !this.state.isTermsSelected });
    }

    _resetField = (type) => {
        switch (type) {
            case "fName":
                this.setState({ fName: "" });
                break;

            case "lName":
                this.setState({ lName: "" });
                break;

            case "email":
                this.setState({ email: "" });
                break;

            case "password":
                this.setState({ password: "" });
                break;

            case "confirmPassword":
                this.setState({ confirmPassword: "" });
                break;
        }
    }

    _onClickSignUp = async () => {
        this.setState({ errorText: "" });

        if (this.state.fName == "") {
            this.setState({ errorText: "Please enter your first name" });
            return;
        }

        if (!this.state.fName.match('^[a-zA-Z ]+$')) {
            this.setState({ errorText: "Please enter a valid name" });
            return;
        }

        if (this.state.lName == "") {
            this.setState({ errorText: "Please enter your last name" });
            return;
        }

        if (!this.state.lName.match('^[a-zA-Z ]+$')) {
            this.setState({ errorText: "Please enter a valid name" });
            return;
        }

        if (this.state.email == "") {
            this.setState({ errorText: "Please enter your email" });
            return;
        }

        if (!this.state.email.match("^[\\w-\\+]+(\\.[\\w]+)*@[\\w-]+(\\.[\\w]+)*(\\.[a-z]{2,})$")) {
            this.setState({ errorText: "Please enter a valid email" });
            return;
        }

        if (this.state.password == "") {
            this.setState({ errorText: "Please enter a password" });
            return;
        }

        if (!this.state.password.match("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,20}$")) {
            this.setState({
                errorText: "Password should be six characters. At least one number, one lowercase and one uppercase letter"
            });
            return;
        }

        if (this.state.confirmPassword == "") {
            this.setState({ errorText: "Please confirm your password" });
            return;
        }

        if (this.state.password != this.state.confirmPassword) {
            this.setState({ errorText: "Password doesn't match" });
            return;
        }

        if (this.state.selectedUserRoleKey === "0") {
            this.setState({ errorText: "Please select a user type" });
            return;
        }

        if (!this.state.isTermsSelected) {
            this.setState({ errorText: "Please agree with terms and condition" });
            return;
        }

        const signUpParams = {
            firstName: this.state.fName,
            lastName: this.state.lName,
            emailAddress: this.state.email,
            password: this.state.password,
            userRoleId: this.state.selectedUserRoleKey,
        }

        this.setState({ errorText: "", isLoading: true });
        this._playAnim();

        var res = await POST(endPoints.signUp, signUpParams);

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
            fromPage: "SignUp"
        }
        this.props.navigation.popToTop();
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
                                <Item rounded style={styles.inputWrap}>
                                    <TextInput
                                        placeholder='First Name'
                                        placeholderTextColor="#727272"
                                        style={styles.inputStyle}
                                        value={this.state.fName}
                                        onChangeText={text => this.setState({ fName: text })}
                                        returnKeyType="next"
                                        onSubmitEditing={() => {
                                            this.phLastName.focus();
                                        }}
                                        blurOnSubmit={false} />
                                    <TouchableOpacity>
                                        <Icon onPress={() => this._resetField("fName")}
                                            name='close-circle' style={styles.iconInput} />
                                    </TouchableOpacity>
                                </Item>

                                <Item rounded style={styles.inputWrap}>
                                    <TextInput
                                        placeholder='Last Name'
                                        placeholderTextColor="#727272"
                                        style={styles.inputStyle}
                                        value={this.state.lName}
                                        onChangeText={text => this.setState({ lName: text })}
                                        returnKeyType="next"
                                        ref={input => {
                                            this.phLastName = input;
                                        }}
                                        onSubmitEditing={() => {
                                            this.phEmail.focus();
                                        }}
                                        blurOnSubmit={false} />
                                    <TouchableOpacity>
                                        <Icon onPress={() => this._resetField("lName")}
                                            name='close-circle' style={styles.iconInput} />
                                    </TouchableOpacity>
                                </Item>

                                <Item rounded style={styles.inputWrap}>
                                    <TextInput
                                        autoCapitalize="none"
                                        placeholder='Email'
                                        keyboardType="email-address"
                                        placeholderTextColor="#727272"
                                        style={styles.inputStyle}
                                        value={this.state.email}
                                        onChangeText={text => this.setState({ email: text })}
                                        returnKeyType="next"
                                        ref={input => {
                                            this.phEmail = input;
                                        }}
                                        onSubmitEditing={() => {
                                            this.phPassword.focus();
                                        }}
                                        blurOnSubmit={false} />
                                    <TouchableOpacity>
                                        <Icon onPress={() => this._resetField("email")}
                                            name='close-circle' style={styles.iconInput} />
                                    </TouchableOpacity>
                                </Item>

                                <Item rounded style={styles.inputWrap}>
                                    <TextInput
                                        secureTextEntry={true}
                                        placeholder='Password'
                                        placeholderTextColor="#727272"
                                        style={styles.inputStyle}
                                        value={this.state.password}
                                        onChangeText={text => this.setState({ password: text })}
                                        returnKeyType="next"
                                        ref={input => {
                                            this.phPassword = input;
                                        }}
                                        onSubmitEditing={() => {
                                            this.phConfirmPassword.focus();
                                        }}
                                        blurOnSubmit={false} />
                                    <TouchableOpacity>
                                        <Icon onPress={() => this._resetField("password")}
                                            name='close-circle' style={styles.iconInput} />
                                    </TouchableOpacity>
                                </Item>

                                <Item rounded style={styles.inputWrap}>
                                    <TextInput
                                        secureTextEntry={true}
                                        placeholder='Confirm Password'
                                        placeholderTextColor="#727272"
                                        style={styles.inputStyle}
                                        value={this.state.confirmPassword}
                                        onChangeText={text => this.setState({ confirmPassword: text })}
                                        returnKeyType="done"
                                        ref={input => {
                                            this.phConfirmPassword = input;
                                        }}
                                    />
                                    <TouchableOpacity>
                                        <Icon onPress={() => this._resetField("confirmPassword")}
                                            name='close-circle' style={styles.iconInput} />
                                    </TouchableOpacity>
                                </Item>

                                <Item rounded style={[styles.inputWrap, { paddingRight: 8 }]}>
                                    <Picker
                                        iosIcon={<Icon name="arrow-round-down" />}
                                        placeholderStyle={{ color: "#727272" }}
                                        placeholderIconColor="#898989"
                                        selectedValue={this.state.selectedUserRoleKey}
                                        onValueChange={(value) => this._setUserType(value)}
                                    >
                                        <Picker.Item label="--- Select a user type ---"         value="0" style={styles.lblText} />
                                        <Picker.Item label="Music Artists"                      value="1" style={styles.lblText} />
                                    <Picker.Item label="Music Managers / Record Labels"         value="2" style={styles.lblText} />
                                        <Picker.Item label="Music Producers / DJs"              value="3" style={styles.lblText} />
                                        <Picker.Item label="Club / Festival / Events Promoters" value="4" style={styles.lblText} />
                                    </Picker>
                                </Item>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <CheckBox onPress={() => this._toggleTerms()} checked={this.state.isTermsSelected} color="#fdd41a" />
                                    <Text style={styles.grayText}>I agree with OpenMic Terms and conditions.</Text>
                                </View>

                                <View style={styles.errorTxtView}>
                                    <Text style={styles.errorTxt}>
                                        {this.state.errorText}
                                    </Text>
                                </View>

                                <Button block rounded style={styles.buttonStyle} onPress={() => this._onClickSignUp()}>
                                    <Text style={styles.buttonText}>Sign Up</Text>
                                </Button>

                            </View>
                        </Container>
                    </ScrollView>
                </KeyboardAvoidingView>
            )
    }
};