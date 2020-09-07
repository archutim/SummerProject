import React, {Component} from 'react';
import {FlatList, Alert, ImageBackground} from 'react-native';
import { AppLoading } from 'expo';
import { Container, Text, Header, Body, Title, Left, Button, Fab, Icon, Card, CardItem, ListItem, View, Content, Accordion} from 'native-base';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import 'react-native-gesture-handler';
import { color } from 'react-native-reanimated';
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
    fetch('http://140.114.206.145/php/load_team.php', {
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
      this.setState({myteam: []});
      console.log(error);
    });
  }

  delete_team(id){
    fetch('http://140.114.206.145/php/delete_team.php', {
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
        alert('deleted');
      }
    })
    .catch((error) => {
      console.log(error);
    });
  }

  active(id, state){
    fetch('http://140.114.206.145/php/change_teamstate.php', {
      method: 'POST',
      header: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({kind: this.props.route.params.kind, id: id, active: (Number(state) + 1) % 2})
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
      var backcolor = '';
      if(item.active == '1')  backcolor = '#c2f9dd';
      else  backcolor = '#ebebeb';
      if(this.props.route.params.kind == 'Basketball'){
          return(
            <Card>
              <CardItem style={{backgroundColor: backcolor}} button onLongPress={() => this.delete_team(item.id)} onPress={() => this.active(item.id, item.active)}>
                <Body>
                  <Text style={{fontSize: 20}}>隊名: {item.team_name}, 縣市: {item.country}, 地區: {item.area}</Text>
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
      else if(this.props.route.params.kind == 'Volleyball')
        return(
          <Card>
            <CardItem style={{backgroundColor: backcolor}} button onLongPress={() => this.delete_team(item.id)} onPress={() => this.active(item.id, item.active)}>
              <Body>
                <Text style={{fontSize: 20}}>隊名: {item.team_name}, 縣市: {item.country}, 地區: {item.area}</Text>
                <View>
                  <Text style={{fontSize:15}}>隊長:{item.name1}  位置:{item.role1}  年齡:{item.age1}  身高:{item.tall1}</Text>
                  <Text style={{fontSize:15}}>隊員:{item.name2}, 位置:{item.role2}  年齡:{item.age2}  身高:{item.tall2}</Text>
                  <Text style={{fontSize:15}}>隊員:{item.name3}, 位置:{item.role3}  年齡:{item.age3}  身高:{item.tall3}</Text>
                  <Text style={{fontSize:15}}>隊員:{item.name4}, 位置:{item.role4}  年齡:{item.age4}  身高:{item.tall4}</Text>
                  <Text style={{fontSize:15}}>隊員:{item.name5}, 位置:{item.role5}  年齡:{item.age5}  身高:{item.tall5}</Text>
                  <Text style={{fontSize:15}}>隊員:{item.name6}, 位置:{item.role6}  年齡:{item.age6}  身高:{item.tall6}</Text>
                </View>
              </Body>
            </CardItem>
          </Card>          
        )
      //else if() //for others kind
    };
    return (
      <Container>
        <ImageBackground source={require('../picture/team_manager.jpg')} style={{flex: 1, width: '100%', height: '100%'}} resizeMode='cover'>
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
            onPress={() => {
              if(this.props.route.params.kind == 'Basketball')
                this.props.navigation.navigate('Team_create_basketball', {kind:this.props.route.params.kind, user: this.props.route.params.user})
              else if(this.props.route.params.kind == 'Volleyball')
                this.props.navigation.navigate('Team_create_volleyball', {kind:this.props.route.params.kind, user: this.props.route.params.user})
            }}>
            <Icon name="add" />
        </Fab>
        </ImageBackground>
      </Container>
    );
  }
}