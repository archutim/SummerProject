import React from 'react';
import { AppLoading } from 'expo';
import { Container, Text, Header, Left, Body, Right, Title, Tabs, Tab} from 'native-base';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
export default class Tab3 extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        isReady: false,
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
          <Text>Tab3!</Text>
        </Container>
      );
    }
  }