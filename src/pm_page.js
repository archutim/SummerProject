import React, {Component} from 'react';
import { AppLoading } from 'expo';
import {FlatList, StyleSheet} from 'react-native';
import { Container, Text, Header, Body, Title, Left, Button, Footer, Item, Input, Icon, Card, CardItem} from 'native-base';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import 'react-native-gesture-handler';
export default class Pm_page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      messages: [],
      serial: 0,
      refreshing: false,
      sendmessage: '',
    };
    this.interval = setInterval(() =>{
      fetch('http://192.168.1.113/php/messages.php', {
        method: 'POST',
        header: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({serial: this.state.serial + 5, sender:this.props.route.params.sender, receiver: this.props.route.params.receiver})
      })
      .then((response) => response.json())
      .then((res) => {
        const array = Object.values( res );
        this.setState({messages: array});
      })
      .catch((error) => {
        console.log(error);
      });
    }, 3000);
  }
  
  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });
    fetch('http://192.168.1.113/php/messages.php', {
      method: 'POST',
      header: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({serial: this.state.serial + 5, sender:this.props.route.params.sender, receiver: this.props.route.params.receiver})
    })
    .then((response) => response.json())
    .then((res) => {
      this.setState({refreshing: false});
      const array = Object.values( res );
      this.setState({messages: array});
      if(this.state.serial + 5 == this.state.messages.length)
        this.setState((prevState) => ({ serial: prevState.serial + 5})); //If serial biger than datas, stop increase
    })
    .catch((error) => {
      console.log(error);
    });
    this.setState({ 
        isReady: true,
    });
  }

  async loadmore(){
    this.setState({refreshing: true});
    await fetch('http://192.168.1.113/php/messages.php', {
      method: 'POST',
      header: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({serial: this.state.serial + 5, sender:this.props.route.params.sender, receiver: this.props.route.params.receiver})
    })
    .then((response) => response.json())
    .then((res) => {
      this.setState({refreshing: false});
      const array = Object.values( res );
      this.setState({messages: array});
      if(this.state.serial + 5 == this.state.messages.length)
        this.setState((prevState) => ({ serial: prevState.serial + 5})); //If serial biger than datas, stop increase
    })
    .catch((error) => {
      this.setState({refreshing: false});
      console.log(error);
    });
  }
  async sendmessage(){
    await fetch('http://192.168.1.113/php/Submit_message.php', {
      method: 'POST',
      header: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({sender:this.props.route.params.sender, receiver: this.props.route.params.receiver, content: this.state.sendmessage})
    })
    .then((response) => response.json())
    .then((res) => {
      if(res == true){
        this.loadmore();
        this.setState({sendmessage: ''});
      }
    })
    .catch((error) => {
      this.state.refreshing = false;
      console.log(error);
    });    
  }
  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }
    const renderItem = ({ item }) => (
      <Card>
        <CardItem>
          <Body>
            <Text style={{fontSize: 30}}>{item.sender}</Text>
            <Text>{item.content}</Text>
            <Text style={{fontSize: 30, paddingRight: 0}}>{item.receiver}</Text>
          </Body>
        </CardItem>
      </Card>
    );
    return (
      <Container>
        <Header >
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Text>Back</Text>
            </Button>
          </Left>
          <Body>
            <Title>{this.props.route.params.receiver}</Title>
          </Body>
        </Header>
        <FlatList 
          data={this.state.messages} 
          renderItem={renderItem} 
          keyExtractor={(item) => item.serial} 
          // refreshing={this.state.refreshing} onRefresh={() => this.loadmore()} 
          onEndReachedThreshold={0.05} 
          onEndReached={() => this.loadmore()} 
          inverted={true}
        >
        </FlatList>
        <Item>
            <Input value={this.state.sendmessage} style={{borderColor: '#fff0f0', borderWidth: 3}} onChangeText={(message) => {this.setState({sendmessage: message});}}/>
            <Icon name='checkmark-circle' onPress={() => this.sendmessage()}/>
        </Item>
      </Container>
    );
  }
}