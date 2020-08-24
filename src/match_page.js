import React, {Component} from 'react';
import { AppLoading } from 'expo';
import {FlatList} from 'react-native';
import { Container, Text, Header, Body, Title, Left, Button, Card, CardItem, Item, Picker, Icon} from 'native-base';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import 'react-native-gesture-handler';
export default class Match_page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      serial: 0,
      matches: [],
      refreshing: false,
      country: 'Taipei'
    };
  }
  
  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });
    await this.load_matches();
    this.setState({ isReady: true });
  }
  async load_matches(){
    this.setState({refreshing: true});
    await fetch('http://192.168.1.113/php/load_matches.php', {
      method: 'POST',
      header: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({kind: this.props.route.params.kind, country: this.state.country, serial: this.state.serial + 5})
    })
    .then((response) => response.json())
    .then((res) => {
      this.setState({refreshing: false});
      const array = Object.values( res );
      this.setState({matches: array});
      if(this.state.serial + 5 == this.state.matches.length)
        this.setState((prevState) => ({ serial: prevState.serial + 5})); //If serial biger than datas, stop increase
    })
    .catch((error) => {
      this.setState({refreshing: false});
      this.setState({matches: []});      
      console.log(error);
    });
  }
  build_connection(opponent){
    fetch('http://192.168.1.113/php/build_connection.php', {
      method: 'POST',
      header: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({user: this.props.route.params.user, opponent: opponent})
    })
    .then((response) => response.json())
    .then((res) => {
      //if(res == true)
        this.props.navigation.navigate('Contact_list', {user: this.props.route.params.user});
    })
    .catch((error) => {
      this.setState({refreshing: false});
      this.props.navigation.navigate('Contact_list', {user: this.props.route.params.user});
      console.log(error);
    });
  }
  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }
    const renderItem = ({ item }) => (
      <Card>
        <CardItem button onPress={() => this.build_connection(item.user)}>
          <Body>
          <Text>Location: {item.country} {item.area} Leader: {item.name1}</Text>
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
            <Title>Match_page</Title>
          </Body>
        </Header>
        <Item picker>
            <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                style={{ width: undefined }}
                placeholder="Select your SIM"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={this.state.country}
                onValueChange={async (value) => {await this.setState({country: value}); this.load_matches();}}
            >   
                <Picker.Item label="臺北" value="Taipei"/>
                <Picker.Item label="新北" value="New_Taipei_City" />
                <Picker.Item label="桃園" value="Taoyuan" />
                <Picker.Item label="新竹" value="Hsinchu" />
                <Picker.Item label="苗栗" value="Miaoli" />
            </Picker>
        </Item>
        <FlatList 
          data={this.state.matches}
          renderItem={renderItem} 
          keyExtractor={(item) => item.id} 
          refreshing={this.state.refreshing}
          onRefresh={() => this.load_matches()} 
          onEndReachedThreshold={0.05} 
          onEndReached={() => this.load_matches()}>
        </FlatList>
      </Container>
    );
  }
}