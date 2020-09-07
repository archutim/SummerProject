import React, {Component} from 'react';
import { AppLoading } from 'expo';
import {FlatList, Modal, ImageBackground} from 'react-native';
import { Container, Text, Header, Body, Title, Left, Button, Card, CardItem, Item, Picker, Icon, View} from 'native-base';
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
      opponent: '',
      team: [],
      country: 'Taipei',
      chosenDate: 'All',
      chosenMonth: 'All',
      chosenYear: '2020',
      challenge: false
    };
  }
  
  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });
    await this.load_matches();

    await fetch('http://140.114.206.145/php/load_team.php', {
      method: 'POST',
      header: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({kind: this.props.route.params.kind, user: this.props.route.params.user})
    })
    .then((response) => response.json())
    .then((res) => {
      const array = Object.values( res );
      this.setState({team: array});
    })
    .catch((error) => {
      this.setState({team: []});
      console.log(error);
    });
    this.setState({ isReady: true });
  }
  async load_matches(){
    this.setState({refreshing: true});
    await fetch('http://140.114.206.145/php/load_matches.php', {
      method: 'POST',
      header: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({kind: this.props.route.params.kind, country: this.state.country, serial: this.state.serial + 5, chosenYear: this.state.chosenYear, chosenMonth: this.state.chosenMonth, chosenDate: this.state.chosenDate})
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
  async build_connection(team){
    this.setState({challenge: false});
    var message = '你好我是' + this.props.route.params.user + '，希望與您的';
    if(this.props.route.params.kind == 'Basketball')  
      message += '籃球隊伍"' + this.state.opponent.team_name + '"進行切磋。以下是我方隊伍資訊\n' +
                '隊長:' + team.name1 + ' 位置:' + team.role1 + ' 年齡:' + team.age1 + ' 身高:' + team.tall1 +
                '\n隊長:' + team.name2 + ' 位置:' + team.role2 + ' 年齡:' + team.age2 + ' 身高:' + team.tall2 +
                '\n隊長:' + team.name3 + ' 位置:' + team.role3 + ' 年齡:' + team.age3 + ' 身高:' + team.tall3 +
                '\n隊長:' + team.name4 + ' 位置:' + team.role4 + ' 年齡:' + team.age4 + ' 身高:' + team.tall4 +
                '\n隊長:' + team.name5 + ' 位置:' + team.role5 + ' 年齡:' + team.age5 + ' 身高:' + team.tall5;
    else if(this.props.route.params.kind == 'Basketball')  
      message += '籃球隊伍"' + this.state.opponent.team_name + '"進行切磋。以下是我方隊伍資訊\n' +
                '隊長:' + team.name1 + ' 位置:' + team.role1 + ' 年齡:' + team.age1 + ' 身高:' + team.tall1 +
                '\n隊長:' + team.name2 + ' 位置:' + team.role2 + ' 年齡:' + team.age2 + ' 身高:' + team.tall2 +
                '\n隊長:' + team.name3 + ' 位置:' + team.role3 + ' 年齡:' + team.age3 + ' 身高:' + team.tall3 +
                '\n隊長:' + team.name4 + ' 位置:' + team.role4 + ' 年齡:' + team.age4 + ' 身高:' + team.tall4 +
                '\n隊長:' + team.name5 + ' 位置:' + team.role5 + ' 年齡:' + team.age5 + ' 身高:' + team.tall5 +
                '\n隊長:' + team.name6 + ' 位置:' + team.role6 + ' 年齡:' + team.age6 + ' 身高:' + team.tall6;
    await fetch('http://140.114.206.145/php/build_connection.php', {
      method: 'POST',
      header: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({user: this.props.route.params.user, opponent: this.state.opponent.user, message: message})
    })
    .then((response) => response.json())
    .then((res) => {
      //if(res == true)
        this.props.navigation.navigate('Contact_list', {user: this.props.route.params.user});
    })
    .catch((error) => {
      this.props.navigation.navigate('Contact_list', {user: this.props.route.params.user});
      console.log(error);
    });
  }
  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }
    const Team = () => {
      if(this.state.team.length == 0) return(null);
      else if(this.state.team.length == 1)
        return(
          <View style={{marginTop: '2%'}}>
            <Button rounded style={{width: '80%', marginLeft: 'auto', marginRight: 'auto', marginTop: '10%'}} onPress={() => this.build_connection(this.state.team[0])} block={true}><Text>{this.state.team[0].team_name}</Text></Button>
          </View>
        );
      else if(this.state.team.length == 2)
        return(
          <View style={{marginTop: '2%'}}>
            <Button rounded style={{width: '80%', marginLeft: 'auto', marginRight: 'auto', marginTop: '10%'}} onPress={() => this.build_connection(this.state.team[0])} block={true}><Text>{this.state.team[0].team_name}</Text></Button>
            <Button rounded style={{width: '80%', marginLeft: 'auto', marginRight: 'auto', marginTop: '10%'}} onPress={() => this.build_connection(this.state.team[1])} block={true}><Text>{this.state.team[1].team_name}</Text></Button>
          </View>
        );
      else if(this.state.team.length == 3)
        return(
          <View style={{marginTop: '2%'}}>
            <Button rounded style={{width: '80%', marginLeft: 'auto', marginRight: 'auto', marginTop: '10%'}} onPress={() => this.build_connection(this.state.team[0])} block={true}><Text>{this.state.team[0].team_name}</Text></Button>
            <Button rounded style={{width: '80%', marginLeft: 'auto', marginRight: 'auto', marginTop: '10%'}} onPress={() => this.build_connection(this.state.team[1])} block={true}><Text>{this.state.team[1].team_name}</Text></Button>
            <Button rounded style={{width: '80%', marginLeft: 'auto', marginRight: 'auto', marginTop: '10%'}} onPress={() => this.build_connection(this.state.team[2])} block={true}><Text>{this.state.team[2].team_name}</Text></Button>          
          </View>
        );        
    }
    const renderItem = ({ item }) => {
      if(this.props.route.params.kind == 'Basketball')
        return(
          <Card>
            {/* <CardItem button onPress={() => this.build_connection(item.user)}> */}
            <CardItem button onPress={() => this.setState({challenge: true, opponent: item})}>
              <Body>
                <Text>地區:{item.area} 隊名: {item.team_name} 日期:{item.chosenMonth}/{item.chosenDate}</Text>
                <Text>隊長:{item.name1} 位置:{item.role1} 身高:{item.tall1}</Text>
                <Text>隊員:{item.name2} 位置:{item.role2} 身高:{item.tall2}</Text>
                <Text>隊員:{item.name3} 位置:{item.role3} 身高:{item.tall3}</Text>
                <Text>隊員:{item.name4} 位置:{item.role4} 身高:{item.tall4}</Text>
                <Text>隊員:{item.name5} 位置:{item.role5} 身高:{item.tall5}</Text>
              </Body>
            </CardItem>
          </Card>
        )
      else if(this.props.route.params.kind == 'Volleyball')
        return(
          <Card>
            {/* <CardItem button onPress={() => this.build_connection(item.user)}> */}
            <CardItem button onPress={() => this.setState({challenge: true, opponent: item})}>
              <Body>
                <Text>地區:{item.area} 隊名: {item.team_name} 日期:{item.chosenMonth}/{item.chosenDate}</Text>
                <Text>隊長:{item.name1} 位置:{item.role1} 身高:{item.tall1}</Text>
                <Text>隊員:{item.name2} 位置:{item.role2} 身高:{item.tall2}</Text>
                <Text>隊員:{item.name3} 位置:{item.role3} 身高:{item.tall3}</Text>
                <Text>隊員:{item.name4} 位置:{item.role4} 身高:{item.tall4}</Text>
                <Text>隊員:{item.name5} 位置:{item.role5} 身高:{item.tall5}</Text>
                <Text>隊員:{item.name6} 位置:{item.role6} 身高:{item.tall6}</Text>
              </Body>
            </CardItem>
          </Card>
        )
    };
    return (
      <Container>
        <ImageBackground source={require('../picture/match.jpg')} style={{flex: 1, width: '100%', height: '100%'}} resizeMode='cover'>
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
            <Modal animationType={'slide'} transparent={true} visible={this.state.challenge}>
                <View style={{
                  width: '70%', height: '50%', backgroundColor: 'white',
                  marginLeft: 'auto', marginRight: 'auto', marginTop: 'auto', marginBottom: 'auto',
                  borderRadius: 20, elevation: 100,
                  shadowColor: '#000000',
                  shadowOpacity: 0.4,
                  shadowRadius: 1,
                  shadowOffset: {
                    height: 1,
                    width: 0,
                  },
                }}>
                  <Text style={{marginTop: '7%', marginLeft: 'auto', marginRight: 'auto'}}>向{this.state.opponent.user}的{this.state.opponent.team_name}發起挑戰</Text>
                  <Team></Team>
                  <View style={{marginTop: '5%', marginLeft: 'auto', marginRight: 'auto'}}><Button onPress={() => this.setState({challenge: false})}><Text>Close</Text></Button></View>
                </View>
            </Modal>
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
          <Item picker>
              <Picker
                  mode="dropdown"
                  iosIcon={<Icon name="arrow-down" />}
                  style={{ width: undefined }}
                  placeholder="Select your SIM"
                  placeholderStyle={{ color: "#bfc6ea" }}
                  placeholderIconColor="#007aff"
                  selectedValue={this.state.chosenYear}
                  onValueChange={async (value) => {await this.setState({chosenYear: value}); this.load_matches();}}
              >   
                  <Picker.Item label="2020" value="2020"/>
              </Picker>
              <Picker
                  mode="dropdown"
                  iosIcon={<Icon name="arrow-down" />}
                  style={{ width: undefined }}
                  placeholder="Select your SIM"
                  placeholderStyle={{ color: "#bfc6ea" }}
                  placeholderIconColor="#007aff"
                  selectedValue={this.state.chosenMonth}
                  onValueChange={async (value) => {await this.setState({chosenMonth: value}); this.load_matches();}}
              >
                  <Picker.Item label="All" value="All"/>
                  <Picker.Item label="1" value="1"/>
                  <Picker.Item label="2" value="2"/>
                  <Picker.Item label="3" value="3"/>
                  <Picker.Item label="4" value="4"/>
                  <Picker.Item label="5" value="5"/>
                  <Picker.Item label="6" value="6"/>
                  <Picker.Item label="7" value="7"/>
                  <Picker.Item label="8" value="8"/>
                  <Picker.Item label="9" value="9"/>
                  <Picker.Item label="10" value="10"/>
                  <Picker.Item label="11" value="11"/>
                  <Picker.Item label="12" value="12"/>
              </Picker>
              <Picker
                  mode="dropdown"
                  iosIcon={<Icon name="arrow-down" />}
                  style={{ width: undefined }}
                  placeholder="Select your SIM"
                  placeholderStyle={{ color: "#bfc6ea" }}
                  placeholderIconColor="#007aff"
                  selectedValue={this.state.chosenDate}
                  onValueChange={async (value) => {await this.setState({chosenDate: value}); this.load_matches();}}
              >   
                  <Picker.Item label="All" value="All"/>
                  <Picker.Item label="1" value="1"/>
                  <Picker.Item label="2" value="2"/>
                  <Picker.Item label="3" value="3"/>
                  <Picker.Item label="4" value="4"/>
                  <Picker.Item label="5" value="5"/>
                  <Picker.Item label="6" value="6"/>
                  <Picker.Item label="7" value="7"/>
                  <Picker.Item label="8" value="8"/>
                  <Picker.Item label="9" value="9"/>
                  <Picker.Item label="10" value="10"/>
                  <Picker.Item label="11" value="11"/>
                  <Picker.Item label="12" value="12"/>
                  <Picker.Item label="13" value="13"/>
                  <Picker.Item label="14" value="14"/>
                  <Picker.Item label="15" value="15"/>
                  <Picker.Item label="16" value="16"/>
                  <Picker.Item label="17" value="17"/>
                  <Picker.Item label="18" value="18"/>
                  <Picker.Item label="19" value="19"/>
                  <Picker.Item label="20" value="20"/>
                  <Picker.Item label="21" value="21"/>
                  <Picker.Item label="22" value="22"/>
                  <Picker.Item label="23" value="23"/>
                  <Picker.Item label="24" value="24"/>
                  <Picker.Item label="25" value="25"/>
                  <Picker.Item label="26" value="26"/>
                  <Picker.Item label="27" value="27"/>
                  <Picker.Item label="28" value="28"/>
                  <Picker.Item label="29" value="29"/>
                  <Picker.Item label="30" value="30"/>
                  <Picker.Item label="31" value="31"/>
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
        </ImageBackground>
      </Container>
    );
  }
}