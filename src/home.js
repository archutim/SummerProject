import React, {Component} from 'react';
import { AppLoading } from 'expo';
import { Container, Text, Header, Left, Body, Right, Title, Tabs, Tab, TabHeading, Icon, Button} from 'native-base';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import Tab1 from './tab1';
import Tab2 from './tab2';
import Tab3 from './tab3';
import 'react-native-gesture-handler';
export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      user: ''
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
      <Container style={{alignContent:'center', alignSelf:'center'}}>
        <Header hasTabs>
          <Left>
            <Button hasText transparent onPress={() => this.props.navigation.navigate('Profile')}>
              <Text>Profile</Text>
            </Button>
          </Left>
          <Body>
            <Title>Home-{this.props.route.params.user}</Title>
          </Body>
          <Right>
            <Button hasText transparent onPress={() => this.props.navigation.navigate('Contact_list', {user: this.props.route.params.user})} >
              <Text>Chatroom</Text>
            </Button>
          </Right>
        </Header>
          <Tabs>
            <Tab heading={ <TabHeading><Icon name="camera" /><Text>Basketball</Text></TabHeading>}>
              <Tab1 navigation={this.props.navigation} user={this.props.route.params.user}/>
            </Tab>
            <Tab heading={ <TabHeading><Icon name="camera" /><Text>VollyBall</Text></TabHeading>}>
              <Tab2 />
            </Tab>
            <Tab heading={ <TabHeading><Icon name="person" ref/><Text>Tennis</Text></TabHeading>}>
              <Tab3 />
            </Tab>
          </Tabs>
      </Container>
    );
  }
}
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
