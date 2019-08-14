import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image, KeyboardAvoidingView, ScrollView, TextInput } from 'react-native';
import { Container, Button, Icon, Item, CheckBox } from 'native-base';
import styles from './Styles'
import { POST, endPoints } from "../../../network/api";
import Animation from 'lottie-react-native';
import { KEY_NAMES, FETCH_LOCAL_STORAGE, SAVE_LOCAL_STORAGE, CLEAR_LOCAL_STORAGE } from "../../../utils/localStorage";

//loginPage

export default class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isRememberMe: true,
            email: "mainak10@mailinator.com",
            password: "Test@12",
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

    _toggleRememberMe = () => {
        this.setState({ isRememberMe: !this.state.isRememberMe });
    }

    _resetField = (type) => {
        switch (type) {
            case "email":
                this.setState({ email: "" });
                break;

            case "password":
                this.setState({ password: "" });
                break;
        }
    }

    _onClickLogIn = async () => {

        if (this.state.email == "") {
            this.setState({ errorText: "Please enter your email" });
            return;
        }

        if (this.state.password == "") {
            this.setState({ errorText: "Please enter your password" });
            return;
        }

        const loginParams = {
            emailAddress: this.state.email,
            password: this.state.password
        }

        this.setState({ errorText: "", isLoading: true });
        this._playAnim();

        var res = await POST(endPoints.login, loginParams);

        this.setState({ isLoading: false });

        if (res.ack == 1) {

            await SAVE_LOCAL_STORAGE(KEY_NAMES.LOGIN_STATUS, "true");
            await SAVE_LOCAL_STORAGE(KEY_NAMES.USER_DETAILS, JSON.stringify(res.userDetails));
            
            // await SAVE_LOCAL_STORAGE(KEY_NAMES.USER_ID, JSON.stringify(res.userDetails.user_id));
            // await SAVE_LOCAL_STORAGE(KEY_NAMES.USER_EMAIL, JSON.stringify(res.userDetails.email_address));
            // await SAVE_LOCAL_STORAGE(KEY_NAMES.USER_ROLE_ID, JSON.stringify(res.userDetails.user_role_id));
            // await SAVE_LOCAL_STORAGE(KEY_NAMES.USER_FIRST_NAME, JSON.stringify(res.userDetails.first_name));
            // await SAVE_LOCAL_STORAGE(KEY_NAMES.USER_LAST_NAME, JSON.stringify(res.userDetails.last_name));
            // await SAVE_LOCAL_STORAGE(KEY_NAMES.USER_IMAGE, JSON.stringify(res.userDetails.user_image));
            // await SAVE_LOCAL_STORAGE(KEY_NAMES.USER_COVER_IMAGE, JSON.stringify(res.userDetails.user_cover_image));


            this._moveToHomePage();

        } else if (res.ack == 0) {
            this.setState({ errorText: res.message });
        } else {
            this.setState({ errorText: "Some error happened.. Please retry!" });
        }
    };

    _moveToHomePage = () => {
        this.props.navigation.navigate('Home');
    }

    _onClickMoveToSignUpPage = () => {
        this.props.navigation.navigate('SignUpScreen');
    }

    _onClickMoveToForgotPasswordPage = () => {
        this.props.navigation.navigate('ForgotPasswordScreen');
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
                                        autoCapitalize="none"
                                        keyboardType="email-address"
                                        placeholder='Enter your Email'
                                        placeholderTextColor="#727272"
                                        style={styles.inputStyle}
                                        value={this.state.email}
                                        onChangeText={text => this.setState({ email: text })} />
                                    <TouchableOpacity>
                                        <Icon onPress={() => this._resetField("email")}
                                            name='close-circle'
                                            style={styles.iconInput} />
                                    </TouchableOpacity>
                                </Item>
                                <Item rounded style={styles.inputWrap}>
                                    <TextInput
                                        secureTextEntry={true}
                                        placeholder='Password'
                                        placeholderTextColor="#727272"
                                        style={styles.inputStyle}
                                        value={this.state.password}
                                        onChangeText={text => this.setState({ password: text })} />

                                    <TouchableOpacity>
                                        <Icon onPress={() => this._resetField("password")}
                                            name='close-circle'
                                            style={styles.iconInput} />
                                    </TouchableOpacity>
                                </Item>
                                <View style={styles.justifyContainer}>
                                    <TouchableOpacity onPress={() => this._onClickMoveToForgotPasswordPage()}>
                                        <Text style={styles.boldText} >Forgot password?</Text>
                                    </TouchableOpacity>

                                    <View style={{ flexDirection: 'row' }}>

                                        <CheckBox onPress={() => this._toggleRememberMe()}
                                            checked={this.state.isRememberMe}
                                            color="#fdd41a" />
                                        <TouchableOpacity>
                                            <Text style={[styles.boldText, { paddingLeft: 16 }]}>Remember me</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                 <View style={styles.errorTxtView}>
                                    <Text style={styles.errorTxt}>
                                        {this.state.errorText}
                                    </Text>
                                </View>

                                <Button
                                    onPress={() => this._onClickLogIn()}
                                    block
                                    transparent
                                    rounded
                                    style={styles.buttonStyle}>
                                    <Text style={styles.buttonText}>Sign In</Text>
                                </Button>

                            </View>
                            <TouchableOpacity
                                onPress={() => this._onClickMoveToSignUpPage()}
                                style={styles.blackBg}>
                                <Text style={styles.nText}>Not a member <Text style={styles.btnTxt}>SIGN UP</Text> here</Text>
                            </TouchableOpacity>
                        </Container>
                    </ScrollView>
                </KeyboardAvoidingView>
            )
    }
};