import React, { Component } from 'react'
import { Text, View, TouchableOpacity, ScrollView } from 'react-native'
import {Icon, ListItem, Thumbnail } from 'native-base'
import styles from './styles'

export default class sidebar extends Component {
	render() {
		return (
			<View style={styles.sidebarmain}>
				<View style={styles.topprofile}>
					<TouchableOpacity style={styles.profilemain}>
						<Thumbnail source={require('../../assets/images/pro2.png')} />
						<View style={{ marginLeft: 8 }}>
							<Text style={styles.thumbtext}>Dhruv Kumar</Text>
							<Text style={styles.whitetext}>Music Manager</Text>
						</View>
					</TouchableOpacity>
				</View>
				<ScrollView>
					<View style={styles.menulist}>
						<ListItem style={styles.menuwrap}>
							<View style={styles.listicon}>
								<Icon active name="person" style={styles.iconleft} />
							</View>
							<View>
								<Text style={styles.menutext}>Profile</Text>
							</View>
						</ListItem>
						<ListItem style={styles.menuwrap}>
							<View style={styles.listicon}>
								<Icon active name="key" style={styles.iconleft} />
							</View>
							<View>
								<Text style={styles.menutext}>Chnage Password</Text>
							</View>
						</ListItem>
						<ListItem style={styles.menuwrap}>
							<View style={styles.listicon}>
								<Icon active name="hammer" style={styles.iconleft} />
							</View>
							<View>
								<Text style={styles.menutext}>My Bids</Text>
							</View>
						</ListItem>
						<ListItem style={styles.menuwrap}>
							<View style={styles.listicon}>
								<Icon active name="copy" style={styles.iconleft} />
							</View>
							<View>
								<Text style={styles.menutext}>Terms</Text>
							</View>
						</ListItem>
						<ListItem style={styles.menuwrap}>
							<View style={styles.listicon}>
								<Icon active name="contacts" style={styles.iconleft} />
							</View>
							<View>
								<Text style={styles.menutext}>About</Text>
							</View>
						</ListItem>
						<ListItem style={styles.menuwrap}>
							<View style={styles.listicon}>
								<Icon active name="lock" style={styles.iconleft} />
							</View>
							<View>
								<Text style={styles.menutext}>Privacy</Text>
							</View>
						</ListItem>
						<ListItem style={styles.menuwrap}>
							<View style={styles.listicon}>
								<Icon active name="call" style={styles.iconleft} />
							</View>
							<View>
								<Text style={styles.menutext}>Contact</Text>
							</View>
						</ListItem>
						<ListItem style={styles.menuwrap}>
							<View style={styles.listicon}>
								<Icon active name="power" style={styles.iconleft} />
							</View>
							<View>
								<Text style={styles.menutext}>Log Out</Text>
							</View>
						</ListItem>
					</View>
				</ScrollView>
			</View>
		)
	}
}
