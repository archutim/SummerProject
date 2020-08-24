import React, {Component} from 'react';
import { AppLoading } from 'expo';
import { Container, Text, Header, Body, Title, Left, Button, Form, Item, Input, View} from 'native-base';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import 'react-native-gesture-handler';
import { JSHash, CONSTANTS } from "react-native-hash";
export default class Login_page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      user: '',
      password: '',
      sha256: '',
      show: false,
      signup_user: '',
      signup_password: '',
      signup_sha256: ''
    };
  }
  
  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });
    this.setState({ isReady: true });
    fetch('http://192.168.1.113/php/CheckAuth.php', {
      method: 'POST',
      header: {
        'Content-Type': 'application/json'
      }
    })
    .then((response) => response.json())
    .then((res) => {
      if(res != 'false' && res != 'WithOut Token'){
        this.props.navigation.reset({
          index: 0,
          routes: [{ name: 'Home', params: { user: res }}],
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });
  }

  async Login(){
    if(this.state.password != ''){
      await JSHash(this.state.password, CONSTANTS.HashAlgorithms.sha256)
      .then(hash => {
        this.setState({sha256: hash});
      })
      .catch(e => console.log(e));

      fetch('http://192.168.1.113/php/login.php', {
        method: 'POST',
        header: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({user: this.state.user, password: this.state.sha256})
      })
      .then((response) => response.json())
      .then((res) => {
        if(res == 'true'){
          this.props.navigation.reset({
            index: 0,
            routes: [{ name: 'Home', params: { user: this.state.user }}],
          });
        }
        else{
          alert('Invalid Account Infomation!');
        }
      })
      .catch((error) => {
        console.log(error);
      });
    }
    else{
      alert("Password can't be empty.")
    }
  }
  show(){
    this.setState((prevState) => ({ show: !prevState.show}));
  }
  async Signup(){
    if(this.state.signup_password != '' && this.state.signup_user != ''){
      await JSHash(this.state.signup_password, CONSTANTS.HashAlgorithms.sha256)
      .then(hash => {
        this.setState({signup_sha256: hash});
      })
      .catch(e => console.log(e));

      fetch('http://192.168.1.113/php/signup.php', {
        method: 'POST',
        header: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({user: this.state.signup_user, password: this.state.signup_sha256})
      })
      .then((response) => response.json())
      .then((res) => {
        if(res == 'Sing up successfully.'){
          this.props.navigation.reset({
            index: 0,
            routes: [{ name: 'Home', params: { user: this.state.signup_user }}],
          });
        }
        else{
          alert('Account has been used.');
        }
      })
      .catch((error) => {
        console.log(error);
      });
    }
    else{
      alert("Username and Password can't be empty.")
    }    
  }
  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }

    return (
      <Container>
        <Header>
          <Body>
            <Title>Login_page</Title>
          </Body>
        </Header>
        <Form>
            <Item>
              <Input placeholder="Username" onChangeText={(user) => {this.setState({user: user});}}/>
            </Item>
            <Item last>
              <Input placeholder="Password" secureTextEntry={true} onChangeText={(password) => {this.setState({password: password});}}/>
            </Item>
        </Form>
        <Button full onPress={() => this.Login()}>
            <Text>Login</Text>
        </Button>
        <Button full onPress={() => this.show()}>
            <Text>Show up</Text>
        </Button>
        <View style={{display: (this.state.show == false) ? 'none' : 'flex'}}>
          <Form>
              <Item>
                <Input placeholder="Your Username" onChangeText={(signup_user) => {this.setState({signup_user: signup_user});}}/>
              </Item>
              <Item last>
                <Input placeholder="Your Password" secureTextEntry={true} onChangeText={(signup_password) => {this.setState({signup_password: signup_password});}}/>
              </Item>
          </Form>
          <Button full onPress={() => this.Signup()}>
            <Text>Signup</Text>
          </Button>
        </View>
      </Container>
    );
  }
}