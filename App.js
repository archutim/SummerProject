import React, {Component} from 'react';
import { AppLoading } from 'expo';
import { Container, Text, Tab} from 'native-base';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './src/home';
import Profile from './src/profile';
import Contact_list from './src/contact_list';
import Match_page from './src/match_page';
import Team_manager from './src/team_manager';
import Pm_page from './src/pm_page';
import Login_page from './src/login_page';
import Team_create_basketball from './src/team_create_basketball';
import Team_create_volleyball from './src/team_create_volleyball';
const Stack = createStackNavigator();
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
    };
  }
  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });
    this.setState({ isReady: true });
  }

  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }
    
    return (
      <Container>
        <NavigationContainer>
          <Stack.Navigator initialRouteName={"Login_page"} headerMode={"none"}>
            <Stack.Screen name="Home" component={Home}/>
            <Stack.Screen name="Profile" component={Profile}/>
            <Stack.Screen name="Match_page" component={Match_page}/>
            <Stack.Screen name="Contact_list" component={Contact_list}/>
            <Stack.Screen name="Team_manager" component={Team_manager}/>
            <Stack.Screen name="Pm_page" component={Pm_page}/>
            <Stack.Screen name="Login_page" component={Login_page}/>
            <Stack.Screen name="Team_create_basketball" component={Team_create_basketball}/>
            <Stack.Screen name="Team_create_volleyball" component={Team_create_volleyball}/>
          </Stack.Navigator>
        </NavigationContainer>
      </Container>
    );
  }
}
