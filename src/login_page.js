import React, {Component} from 'react';
import { AppLoading } from 'expo';
import {ImageBackground} from 'react-native';
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
    fetch('http://140.114.206.145/php/CheckAuth.php', {
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

      fetch('http://140.114.206.145/php/login.php', {
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

      fetch('http://140.114.206.145/php/signup.php', {
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
        <ImageBackground source={require('../picture/login.jpg')} style={{flex: 1, width: '100%', height: '100%'}} resizeMode='cover'>
        <Header transparent>
            <Title style={{fontSize: 30}}>Login_page</Title>
        </Header>
        <Form style={{marginTop: '10%'}}>
            <Item style={{width: "80%", marginLeft: 'auto', marginRight: 'auto'}}>
              <Input placeholder="Username" onChangeText={(user) => {this.setState({user: user});}}/>
            </Item>
            <Item style={{marginTop: '10%', width: "80%", marginLeft: 'auto', marginRight: 'auto'}}>
              <Input placeholder="Password" secureTextEntry={true} onChangeText={(password) => {this.setState({password: password});}}/>
            </Item>
        </Form>
        <Button rounded style={{marginTop: '30%', marginLeft: 'auto', marginRight: 'auto', justifyContent: 'center', backgroundColor: 'pink'}} onPress={() => this.Login()}>
            <Text style={{width: '80%', marginLeft: 'auto', marginRight: 'auto', textAlign:'center'}}>Login</Text>
        </Button>
        <Button full onPress={() => this.show()} style={{display: "none"}}>
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
        </ImageBackground>
      </Container>
    );
  }
}