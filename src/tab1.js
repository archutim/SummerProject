import React from 'react';
import { AppLoading } from 'expo';
import {ScrollView, ImageBackground}  from 'react-native';
import { Container, Text, Body, Content, Card, CardItem} from 'native-base';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
export default class Tab1 extends React.Component {
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
      <Container style={{backgroundColor: '#80cef8'}}>
        <ScrollView>
          <Content padder>
            <Card transparent>
              <CardItem style={{borderRadius:50}} button onPress={() => this.props.navigation.navigate('Match_page', {kind: 'Basketball', user: this.props.user})}>
                <Body>
                  <Text>
                    Match
                  </Text>
                </Body>
              </CardItem>
            </Card>
            <Card transparent>
              <CardItem style={{borderRadius:50}} button onPress={() => this.props.navigation.navigate('Team_manager', {kind: 'Basketball', user: this.props.user})}>
                <Body>
                  <Text>
                    Team manager
                  </Text>
                </Body>
              </CardItem>
            </Card>
            {/* <Card transparent>
              <CardItem style={{borderRadius:50}} button onPress={() => this.props.navigation.navigate('Match_page', {kind: 'Basketball', user: this.props.user})}>
                <Body>
                  <Text>
                    Match Log
                  </Text>
                </Body>
              </CardItem>
            </Card> */}
          </Content>
        </ScrollView>
      </Container>
    );
  }
}