import React, { Component } from 'react';
import { Text, View, Image, KeyboardAvoidingView, ScrollView, TouchableOpacity, TouchableNativeFeedback } from 'react-native';
import { Container, Card, CardItem, Icon, Thumbnail } from 'native-base';
import Headers from '../../../components/Header';
import styles from './Styles'
import { Permissions } from 'expo';
import Constants from 'expo-constants'
import * as ImagePicker from 'expo-image-picker';
import { KEY_NAMES, FETCH_LOCAL_STORAGE, SAVE_LOCAL_STORAGE, CLEAR_LOCAL_STORAGE } from "../../../utils/localStorage";
import { baseURL, POST, endPoints } from "../../../network/api";
import Animation from 'lottie-react-native';
import Overlay from 'react-native-modal-overlay';

import { Ionicons } from '@expo/vector-icons';
import { Video } from 'expo-av';



export default class MyProfileScreen extends Component {
    static navigationOptions = {
        header: null,
    };
    constructor(props) {
        super(props);
        this.state = {
            userName: "",
            userProfileImage: null,
            userCoverImage: null,
            userRole: "",
            isLoading: false,
            pickedUri: null,
            isCameraDialogVisible: false,
            uploadFor: "",

            isPortrait: true
        }
    }

    async componentDidMount() {
        this.getPermissionAsync();

        const userDetails = JSON.parse(await (FETCH_LOCAL_STORAGE(KEY_NAMES.USER_DETAILS)));
        console.log(userDetails);


        this.setState({
            userName: userDetails.first_name + " " + userDetails.last_name,
            userRole: this._getUserRoleName(userDetails.user_role_id - 1),
            userProfileImage: baseURL + userDetails.user_image,
            userCoverImage: baseURL + userDetails.user_cover_image,
        });

        console.log("updated url from storage::  ", baseURL + userDetails.user_cover_image);
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

    _getUserRoleName = (roleId) => {
        var roleNameArr = [
            "Music Artists",
            "Music Managers / Record Labels",
            "Music Producers / DJs",
            "Club / Festival / Events Promoters"
        ];
        return roleNameArr[roleId];
    }

    getPermissionAsync = async () => {
        if (Constants.platform.ios) {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
    }

    _uploadVideo = async () => {

        await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Videos, // <Type> is one of: Images, Videos, All (only on iOS). Defaults to Images
            allowsEditing: true, // Whether to show a UI to edit the image after it is picked. On Android the user can crop and rotate the image and on iOS simply crop it. Defaults to false.
            aspect: [4, 3], // An array with two entries [x, y] specifying the aspect ratio to maintain if the user is allowed to edit the image (by passing allowsEditing: true). This is only applicable on Android, since on iOS the crop rectangle is always a square.
        })

    }

    _uploadImage = async (uploadType) => {
        this.setState({ isCameraDialogVisible: false });

        let result = uploadType === "camera"
            ? await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images, // <Type> is one of: Images, Videos, All (only on iOS). Defaults to Images
                allowsEditing: true, // Whether to show a UI to edit the image after it is picked. On Android the user can crop and rotate the image and on iOS simply crop it. Defaults to false.
                aspect: [4, 3], // An array with two entries [x, y] specifying the aspect ratio to maintain if the user is allowed to edit the image (by passing allowsEditing: true). This is only applicable on Android, since on iOS the crop rectangle is always a square.
            })

            : await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images, // <Type> is one of: Images, Videos, All (only on iOS). Defaults to Images
                allowsEditing: true, // Whether to show a UI to edit the image after it is picked. On Android the user can crop and rotate the image and on iOS simply crop it. Defaults to false.
                aspect: [4, 3], // An array with two entries [x, y] specifying the aspect ratio to maintain if the user is allowed to edit the image (by passing allowsEditing: true). This is only applicable on Android, since on iOS the crop rectangle is always a square.
            });

        console.log(result);

        // If the user cancelled the picking, returns { cancelled: true }.

        if (!result.cancelled) {
            const userDetails = await FETCH_LOCAL_STORAGE(KEY_NAMES.USER_DETAILS)
            const userId = JSON.parse(userDetails).user_id;
            console.log("userDetails:  ", userDetails);

            // ImagePicker saves the taken photo to disk and returns a local URI to it

            let filename = result.uri.split('/').pop();

            // Infer the type of the image
            let match = /\.(\w+)$/.exec(filename);
            let type = match ? `image/${match[1]}` : `image`;
            

            // // Upload the image using the fetch and FormData APIs
            
            // // Assume "photo" is the name of the form field the server expects
            var imageFormData = new FormData();
            imageFormData.append("userId", userId);
            imageFormData.append(
                this.state.uploadFor === "profile" ?
                    "userProfileImage" :
                    "userCoverImage",
                { uri: result.uri, name: filename, type }
            );

            const header = {
                'content-type': 'multipart/form-data',
            }

            this.setState({ errorText: "", isLoading: true });
            this._playAnim();
            var res = await POST(
                this.state.uploadFor === "profile" ?
                    endPoints.uploadUserProfileImage :
                    endPoints.uploadUserCoverImage,
                imageFormData,
                header
            );
            this.setState({ isLoading: false });

            console.log("res upload:  ", res);

            if (res.ack == 1) {
                if (this.state.uploadFor === "cover")
                    this.setState({ userCoverImage: baseURL + res.userImage });
                else
                    this.setState({ userProfileImage: baseURL + res.userImage });

                await SAVE_LOCAL_STORAGE(KEY_NAMES.USER_DETAILS, JSON.stringify(res.userDetails));

            } else if (res.ack == 0) {
                this.setState({ errorText: res.message });
            } else {
                this.setState({ errorText: "Some error happened.. Please retry!" });
            }
        }
    }

    _logOut = async () => {
        await CLEAR_LOCAL_STORAGE();
        this.props.navigation.navigate("SignInScreen")
    }

    _playAudio = async () => {
        console.log('Trying to play sound...', file)

        const soundObject = new Audio.Sound();

        try {
            await soundObject.loadAsync({
                uri: 'http://111.93.169.90:3004/uploads/audio/night2.mp3'
            });
            await soundObject.playAsync();
            // Your sound is playing!
        } catch (error) {
            // An error occurred!
            console.log("_playAudio, error : ", error);
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
        else {
            const COLOR = '#92DCE5';
            const icon = (name, size = 36) => () => (
                <Ionicons
                    name={name}
                    size={size}
                    color={COLOR}
                    style={{ textAlign: 'center' }}
                />
            );
            return (

                <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
                    <Headers {...this.props} />
                    <ScrollView>
                        <Container style={styles.bodyWrap}>
                            <Card style={styles.cardImage}>
                                <CardItem cardBody>
                                    <Image source={{ uri: this.state.userCoverImage }} style={styles.imageCard} />
                                    <TouchableOpacity
                                        onPress={() =>
                                            this.setState({
                                                isCameraDialogVisible: !this.state.isCameraDialogVisible,
                                                uploadFor: "cover"
                                            })}
                                        style={styles.camUpload}>
                                        <Icon name="camera" style={styles.camIcon} />
                                    </TouchableOpacity>
                                </CardItem>

                                <Overlay
                                    animationType="zoomIn" containerStyle={{ backgroundColor: 'rgba(37, 8, 10, 0.50)', }}
                                    childrenWrapperStyle={{ backgroundColor: '#fff' }}
                                    animationDuration={500}
                                    visible={this.state.isCameraDialogVisible}
                                    closeOnTouchOutside
                                    onClose={() => this.setState({ isCameraDialogVisible: false })}>

                                    <View style={{ justifyContent: "center" }}>
                                        <TouchableOpacity onPress={() => this._uploadImage("camera")}>
                                            <Text style={styles.dialogCameraView}>Camera</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => this._uploadImage("gallery")}>
                                            <Text style={styles.dialogGalleryView}>Gallery</Text>
                                        </TouchableOpacity>
                                    </View>
                                </Overlay>

                                <CardItem>
                                    <View style={styles.profileThumb}>
                                        <View>
                                            <TouchableNativeFeedback onPress={() =>
                                                this.setState({
                                                    isCameraDialogVisible: !this.state.isCameraDialogVisible,
                                                    uploadFor: "profile"
                                                })}>
                                                <Thumbnail source={{ uri: this.state.userProfileImage }} large size={200} />
                                            </TouchableNativeFeedback>
                                        </View>
                                        <Text style={styles.blackText}>{this.state.userName}</Text>
                                        <Text style={styles.mutedText}>{this.state.userRole}</Text>
                                    </View>
                                </CardItem>
                            </Card>
                            <View style={styles.hScroll}>
                                <ScrollView horizontal={true}>
                                    <View style={{ flex: 1, flexDirection: 'row' }}>
                                        <View style={styles.slideWrapt}>
                                            <TouchableOpacity style={styles.thumbIcon}>
                                                <Image source={require('../../../../assets/images/cam1.png')} style={styles.imageT} resizeMode="contain" />
                                            </TouchableOpacity>
                                            <Text style={styles.thumbText}>Add Music videos</Text>
                                        </View>
                                        <View style={styles.slideWrapt}>
                                            <TouchableOpacity style={[styles.thumbIcon, { backgroundColor: '#00ed38' }]}>
                                                <Image source={require('../../../../assets/images/cam2.png')} style={styles.imageT} resizeMode="contain" />
                                            </TouchableOpacity>
                                            <Text style={styles.thumbText}>Add Free styles </Text>
                                        </View>
                                        <View style={styles.slideWrapt}>
                                            <TouchableOpacity style={[styles.thumbIcon, { backgroundColor: '#005aff' }]}>
                                                <Image source={require('../../../../assets/images/cam3.png')} style={styles.imageT} resizeMode="contain" />
                                            </TouchableOpacity>
                                            <Text style={styles.thumbText}>Add live stories</Text>
                                        </View>
                                        <View style={styles.slideWrapt}>
                                            <TouchableOpacity style={[styles.thumbIcon, { backgroundColor: '#00d2ff' }]}>
                                                <Image source={require('../../../../assets/images/cam4.png')} style={{ width: 50, height: 8 }} resizeMode="contain" />
                                            </TouchableOpacity>
                                            <Text style={styles.thumbText}>Add live stories</Text>
                                        </View>
                                    </View>
                                </ScrollView>
                            </View>

                            <View >
                                <Video
                                    source={{ uri: 'http://111.93.169.90:3004/uploads/videos/Aerial%20Shot%20Of%20Forest%20Covered%20In%20Snow.mp4' }}
                                    rate={1.0} //A boolean describing if we should correct the pitch for a changed rate. If set to true, the pitch of the audio will be corrected (so a rate different than 1.0 will time stretch the audio)
                                    volume={1.0} //The desired volume of the audio for this media. This value must be between 0.0 (silence) and 1.0 (maximum volume). 
                                    isMuted={false} //A boolean describing if the audio of this media should be muted
                                    resizeMode="cover"
                                    shouldPlay={false}
                                    isLooping={false} //A boolean describing if the media should play once (false) or loop indefinitely (true)
                                    style={{ height: 300 }}
                                    useNativeControls={true} />

                            </View>
                            <View style={styles.hScroll}>
                                <Text style={styles.headingText}>My Connections</Text>
                                <ScrollView horizontal={true}>
                                    <TouchableOpacity style={styles.slideWrap}>
                                        <Thumbnail source={require('../../../../assets/images/pro2.png')} large />
                                        <Text style={styles.thumbText}>Rohan</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.slideWrap} >
                                        <Thumbnail source={require('../../../../assets/images/pro1.png')} large />
                                        <Text style={styles.thumbText}>Rohan</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.slideWrap}>
                                        <Thumbnail source={require('../../../../assets/images/pro3.png')} large />
                                        <Text style={styles.thumbText}>Rohan</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.slideWrap} onPress={() => this.props.navigation.navigate('ViewProfileScreen')}>
                                        <Thumbnail source={require('../../../../assets/images/pro4.png')} large />
                                        <Text style={styles.thumbText}>Rohan</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.slideWrap}>
                                        <Thumbnail source={require('../../../../assets/images/pro5.png')} large />
                                        <Text style={styles.thumbText}>Rohan</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.slideWrap}>
                                        <Thumbnail source={require('../../../../assets/images/pro6.png')} large />
                                        <Text style={styles.thumbText}>Rohan</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.slideWrap}>
                                        <Thumbnail source={require('../../../../assets/images/pro7.png')} large />
                                        <Text style={styles.thumbText}>Rohan</Text>
                                    </TouchableOpacity>
                                </ScrollView>
                            </View>
                            <View style={styles.hScroll}>
                                <Text style={styles.headingText}>My video & music</Text>
                                <ScrollView horizontal={true}>
                                    <View style={styles.videoSlide}>
                                        <Image source={require('../../../../assets/images/vimage.jpg')} resizeMode="cover" style={styles.vImage} />
                                    </View>
                                    <View style={styles.videoSlide}>
                                        <Image source={require('../../../../assets/images/vimage2.jpg')} resizeMode="cover" style={styles.vImage} />
                                    </View>
                                    <View style={styles.videoSlide}>
                                        <Image source={require('../../../../assets/images/profileback.jpg')} resizeMode="cover" style={styles.vImage} />
                                    </View>

                                </ScrollView>
                            </View>
                        </Container>

                        <TouchableOpacity
                            onPress={() => this._logOut()}
                            style={styles.logOut}>
                            <Text>Logout</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </KeyboardAvoidingView>
            )
        }
    }
};