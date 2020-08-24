import React, {Component} from 'react';
import {FlatList} from 'react-native';
import { AppLoading } from 'expo';
import { Container, Text, Header, Body, Title, Left, Button, Card, CardItem} from 'native-base';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import 'react-native-gesture-handler';
export default class Contact_list extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      contact_list: [],
      serial: 0,
      refreshing: false,
    };
    this.interval = setInterval(() =>{
      fetch('http://192.168.1.113/php/Contact_list.php', {
        method: 'POST',
        header: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({serial: this.state.serial + 10, user:this.props.route.params.user})
      })
      .then((response) => response.json())
      .then((res) => {
        const array = Object.values( res );
        this.setState({contact_list: array});
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
    fetch('http://192.168.1.113/php/Contact_list.php', {
      method: 'POST',
      header: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({serial: this.state.serial + 10, user:this.props.route.params.user})
    })
    .then((response) => response.json())
    .then((res) => {
      const array = Object.values( res );
      this.setState({contact_list: array});
      if(this.state.serial + 5 == this.state.contact_list.length)
        this.setState((prevState) => ({ serial: prevState.serial + 5}));//If serial biger than datas, stop increase
    })
    .catch((error) => {
      console.log(error);
    });
    this.setState({ isReady: true });
  }
  async loadmore(){
    await fetch('http://192.168.1.113/php/Contact_list.php', {
      method: 'POST',
      header: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({serial: this.state.serial + 10, user:this.props.route.params.user})
    })
    .then((response) => response.json())
    .then((res) => {
      const array = Object.values( res );
      this.setState({contact_list: array});
      if(this.state.serial + 5 == this.state.contact_list.length)
        this.setState((prevState) => ({ serial: prevState.serial + 5}));//If serial biger than datas, stop increase
    })
    .catch((error) => {
      console.log(error);
    });
  }
  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }
    const renderItem = ({ item }) => (
      <Card>
        <CardItem button onPress={() => this.props.navigation.navigate('Pm_page', {sender:this.props.route.params.user, receiver: item.Contact})}>
          <Body>
          <Text>Contact: {item.Contact}, Last_message: {item.Last_message}, Last_submission: {item.Last_submission}</Text>
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
            <Title>ChatRoom</Title>
          </Body>
        </Header>
        <FlatList data={this.state.contact_list} renderItem={renderItem} keyExtractor={(item) => item.Last_submission} refreshing={this.state.refreshing} onRefresh={() => this.loadmore()} onEndReachedThreshold={0.05} onEndReached={() => this.loadmore()}>
        </FlatList>
      </Container>
    );
  }
}