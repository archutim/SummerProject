import React, {Component} from 'react';
import {FlatList, Alert} from 'react-native';
import { AppLoading } from 'expo';
import { Container, Text, Header, Body, Title, Left, Button, Fab, Icon, Card, CardItem, ListItem, View, Content, Accordion} from 'native-base';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import 'react-native-gesture-handler';
export default class Team_manager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      refreshing: false,
      myteam: [],
    };
  }
  
  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });
    await this.load_myteam();
    this.setState({ 
      isReady: true,
    }); 
  }

  load_myteam(){
    fetch('http://192.168.1.113/php/load_team.php', {
      method: 'POST',
      header: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({kind: this.props.route.params.kind, user:this.props.route.params.user})
    })
    .then((response) => response.json())
    .then((res) => {
      this.setState({refreshing: false});
      const array = Object.values( res );
      this.setState({myteam: array});
    })
    .catch((error) => {
      console.log(error);
    });
  }

  delete_team(id){
    fetch('http://192.168.1.113/php/delete_team.php', {
      method: 'POST',
      header: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({kind: this.props.route.params.kind, id: id})
    })
    .then((response) => response.json())
    .then((res) => {
      if(res == true){
        this.load_myteam();
      }
    })
    .catch((error) => {
      console.log(error);
    });
  }

  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }
    const renderItem = ({ item }) => {
      if(this.props.route.params.kind == 'Basketball'){
          return(
            <Card>
              <CardItem button onLongPress={() => this.delete_team(item.id)}>
                <Body>
                  <Text style={{fontSize: 20}}>隊長: {item.name1}, 縣市: {item.country}, 地區: {item.area}</Text>
                  <View>
                    <Text style={{fontSize:15}}>隊長:{item.name1}  位置:{item.role1}  年齡:{item.age1}  身高:{item.tall1}</Text>
                    <Text style={{fontSize:15}}>隊員:{item.name2}, 位置:{item.role2}  年齡:{item.age2}  身高:{item.tall2}</Text>
                    <Text style={{fontSize:15}}>隊員:{item.name3}, 位置:{item.role3}  年齡:{item.age3}  身高:{item.tall3}</Text>
                    <Text style={{fontSize:15}}>隊員:{item.name4}, 位置:{item.role4}  年齡:{item.age4}  身高:{item.tall4}</Text>
                    <Text style={{fontSize:15}}>隊員:{item.name5}, 位置:{item.role5}  年齡:{item.age5}  身高:{item.tall5}</Text>
                  </View>
                </Body>
              </CardItem>
            </Card>
          )
      }
      //else if() //for others kind
    };
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Text>Back</Text>
            </Button>
          </Left>
          <Body>
            <Title>Team manager</Title>
          </Body>
        </Header>
        <FlatList data={this.state.myteam} renderItem={renderItem} keyExtractor={(item) => item.id} refreshing={this.state.refreshing} onRefresh={() => this.load_myteam()}></FlatList>
        <Fab
            style={{ backgroundColor: '#5067FF' }}
            position="bottomRight"
            onPress={() => this.props.navigation.navigate('Team_create', {kind:this.props.route.params.kind, user: this.props.route.params.user})}>
            <Icon name="add" />
        </Fab>
      </Container>
    );
  }
}