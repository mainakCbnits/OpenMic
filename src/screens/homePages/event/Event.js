import React, { Component } from 'react'
import { Text, View, Image, KeyboardAvoidingView, ScrollView, TouchableOpacity } from 'react-native'
import { Container, Card, CardItem, Body, Left, Button, Icon, Header, Drawer, Thumbnail } from 'native-base'
import Swiper from 'react-native-swiper'
import styles from "./Styles";

// import SideBar from '../../components/sidebar'

export default class HomeScreen extends Component {
    static navigationOptions = {
        header: null,
    };   
    render() {
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
                <Header style={styles.topBarMenu}>
                    <View style={{ width: 40 }}>
                        <TouchableOpacity 
                        // onPress={()=>this.props.navigation.navigate('tab')}
                        >
                            <Icon name="arrow-round-back" size={60} style={{ color: '#fdd41a' }} />
                        </TouchableOpacity>                       
                    </View>
                    <View style={{ flex: 1 }}>
                       <Text style={styles.backHead}>Event Details</Text>
                    </View>
                </Header>
                <ScrollView>
                    <Container style={[styles.nopAdd]}>
                        <Swiper style={styles.wrapper} autoplay={true} dotColor={'#fff'} activeDotColor={'#fdd41a'} >
                            <View style={styles.slide1}>
                                <Image source={require('../../../../assets/images/slide.jpg')} style={styles.slideImage} resizeMode="cover" />
                            </View>
                            <View style={styles.slide2}>
                                <Image source={require('../../../../assets/images/slide.jpg')} style={styles.slideImage} resizeMode="cover" />
                            </View>
                            <View style={styles.slide3}>
                                <Image source={require('../../../../assets/images/slide.jpg')} style={styles.slideImage} resizeMode="cover" />
                            </View>
                        </Swiper>
                        <View style={styles.bodyWrap}>
                            <Text style={styles.headingText}>Music Concert</Text>
                            <Text style={styles.imageTitle}>Description</Text>
                            <Text style={styles.para}>Lorem Ipsum is simply dummy text of the printing and
                             typesetting industry. Lorem Ipsum has been the industry's standard dummy 
                             text ever since the 1500s, when an unknown printer took a galley of type 
                             and scrambled it to make a type specimen book.</Text>
                            <View style={styles.handList}>
                                <View style={styles.listHnd}>
                                    <Icon name='radio-button-on'  style={styles.yellowIcon} />
                                    <Text style={styles.grayText}>Type of artist:</Text>
                                    <Text style={styles.blackText}> rap,soul rock & roll</Text>
                                </View>
                                <View style={styles.listHnd}>
                                    <Icon name='radio-button-on'  style={styles.yellowIcon} />
                                    <Text style={styles.grayText}>Time: </Text>
                                    <Text style={styles.blackText}>27th-July-2019 7:15:00 PM</Text>
                                </View>
                                <View style={styles.listHnd}>
                                    <Icon name='radio-button-on'  style={styles.yellowIcon} />
                                    <Text style={styles.grayText}>Location:</Text>
                                    <Text style={styles.blackText}> California, C.A. United State.</Text>
                                </View>
                            </View>
                            <View style={{flexDirection:'row', alignItems:'center'}}>                               
                                <Thumbnail source={require('../../../../assets/images/thumbnail.jpg')} small />
                                <View style={{marginLeft:8}}>
                                    <Text style={styles.blackText}>User Name</Text>
                                    <Text style={styles.mutedText}>Music Producers</Text>
                                </View>
                            </View>
                             <Button block rounded style={[styles.buttonStyle]} 
                            //  onPress={()=>this.props.navigation.navigate('OpenBid')}
                             >                        
                                    <Text style={styles.buttonText}>Bid Now</Text>
                            </Button>

                        </View>                       
                    </Container>
                </ScrollView>
            </KeyboardAvoidingView>
        )
    }
};


