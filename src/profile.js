import React, {Component} from 'react';
import { AppLoading } from 'expo';
import { Container, Text, Header, Body, Title, Left, Button} from 'native-base';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import 'react-native-gesture-handler';
export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      getinfo: 0
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
        <Header >
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Text>Back</Text>
            </Button>
          </Left>
          <Body>
            <Title>Profile</Title>
          </Body>
        </Header>
        <Button onPress={() => this.sendreq()}>
          <Text>Try php.</Text>
        </Button>
        <Text>My Profile {this.state.getinfo}</Text>
      </Container>
    );
  }

  sendreq(){
    fetch('http://140.114.206.145/php/RN.php', {
      method: 'POST',
      header: {
        'Content-Type': 'application/json'
      },
    }).then((response) => response.json())
    .then((res) => {
      this.setState({
        getinfo: res['fir']
      });
      console.log(res);
      alert(res['sec']);
    })
    .catch((error) => {
      this.setState({
        getinfo: 2
      });
      console.log(error);
    });
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
