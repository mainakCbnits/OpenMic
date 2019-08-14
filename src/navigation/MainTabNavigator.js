import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator, createSwitchNavigator, createDrawerNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import SideBar from '../components/sidebar';

import * as Screens from '../screens/index';

const Drawer = createDrawerNavigator(
  {
    HomeScreen: Screens.HomeScreen, // stack
    NotificationScreen: Screens.NotificationScreen,
    MyProfileScreen: Screens.MyProfileScreen,
    ViewProfileScreen: Screens.ViewProfileScreen,
  },
  {
    contentComponent: SideBar,
    drawerType: "slide",
    drawerWidth: 280,
  },
)

const HomeStack = createStackNavigator({
  Home: { screen: Screens.HomeScreen, navigationOptions: { header: null } }
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarOptions: {
    activeTintColor: '#a8a8a8',
    inactiveTintColor: '#a8a8a8',
  },
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-home${focused ? '' : '-outline'}`
          : 'md-home'
      }
    />
  ),
};

const ChatStack = createStackNavigator({
  Chat: Screens.ChatScreen,
});

ChatStack.navigationOptions = {
  tabBarLabel: 'Chat',
  tabBarOptions: {
    activeTintColor: '#a8a8a8',
    inactiveTintColor: '#a8a8a8',
  },
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-chatbubbles' : 'md-chatbubbles'}
    />
  ),
};

const NotificationStack = createStackNavigator({
  Notification: { screen: Screens.NotificationScreen, navigationOptions: { header: null } }
});

NotificationStack.navigationOptions = {
  tabBarLabel: 'Notification',
  tabBarOptions: {
    activeTintColor: '#a8a8a8',
    inactiveTintColor: '#a8a8a8',
  },
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-notifications' : 'md-notifications'}
    />
  ),
};
const ProfileStack = createStackNavigator({
  Profile: { screen: Screens.MyProfileScreen, navigationOptions: { header: null } }
});

ProfileStack.navigationOptions = {
  tabBarLabel: 'Profile',
  tabBarOptions: {
    activeTintColor: '#a8a8a8',
    inactiveTintColor: '#a8a8a8',
  },
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-contact' : 'md-contact'}
    />
  ),
};

export const tabNav = createBottomTabNavigator({
  Home : HomeStack,
  ChatStack,
  NotificationStack,
  ProfileStack,
});

export const Dashboard = createStackNavigator({
  tabNav,
  Drawer
},{
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
  }
})

const LoginStack = createStackNavigator({
  SignInScreen: Screens.SignInScreen,
  SignUpScreen: Screens.SignUpScreen,
  ResetPasswordScreen: Screens.ResetPasswordScreen,
  VerifyEmailScreen: Screens.VerifyEmailScreen,
  ForgotPasswordScreen: Screens.ForgotPasswordScreen,
  OtpVerifyScreen: Screens.OtpVerifyScreen,
  ThankYouScreen: Screens.ThankYouScreen,
},{
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
  }
});

export default createSwitchNavigator({
  LoginStack:LoginStack,
  Home: Dashboard,
});