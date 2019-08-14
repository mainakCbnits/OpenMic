import React, { Component } from 'react'
import { Text, View, Image, KeyboardAvoidingView, ScrollView, TouchableOpacity } from 'react-native'
import { Container, Card, CardItem, Button,  Icon, Thumbnail } from 'native-base'
import Headers from '../../../components/Header'
import styles from './Styles'

export default class ProflieScreen extends Component {
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
                        <Card style={styles.cardImage}>                           
                            <CardItem cardBody>
                                <Image source={require('../../../../assets/images/profileback.jpg')} style={styles.imageCard} /> 
                                <TouchableOpacity style={styles.camUpload}>
                                    <Icon name="camera" style={styles.camIcon}/>
                                </TouchableOpacity>                              
                            </CardItem>                            
                            <CardItem>                               
                                <View style={styles.profileThumb}>
                                    <View>
                                        <Thumbnail source={require('../../../../assets/images/profile.jpg')} large />
                                    </View>                                  
                                    <Text style={styles.blackText}>User Name</Text>
                                    <Text style={styles.mutedText}>Music Producers</Text>                                   
                                </View>                               
                            </CardItem>
                            <CardItem>
                                <View style={styles.flexWrap}>
                                    <Text style={styles.blackTextSm}>10k <Text style={styles.grayText}>Like</Text> </Text>
                                    <Text style={styles.blackTextSm}>15k <Text style={styles.grayText}>Share</Text> </Text>                                   
                                    <Text style={styles.blackTextSm}>100k+ <Text style={styles.grayText}>jobs</Text> </Text>                                   
                                    <Text style={styles.blackTextSm}>25k <Text style={styles.grayText}>Views</Text></Text>                                    
                                </View>
                            </CardItem>
                        </Card>
                        <View style={[styles.hScroll, {flexDirection:'row', justifyContent:'space-between'}]}>
                            <Button block rounded style={[styles.buttonStyle, {marginTop:0}]}>                        
                                <Text style={styles.buttonText}>Connect</Text>
                            </Button>
                            <Button block rounded style={[styles.buttonStyle, {marginTop:0}]}>                        
                                <Text style={styles.buttonText}>Follow</Text>
                            </Button>
                        </View>
                        <View style={styles.hScroll}>
                            <Text style={styles.headingText}>My Connections</Text>
                            <ScrollView horizontal={true}> 
                            <TouchableOpacity style={styles.slideWrap} onPress={()=>this.props.navigation.navigate('MyProfileScreen')}>
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
                                <TouchableOpacity style={styles.slideWrap}>
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
                </ScrollView>
            </KeyboardAvoidingView>
        )
    }
};


