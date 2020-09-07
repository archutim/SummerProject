import React, {Component} from 'react';
import {ScrollView, Keyboard} from 'react-native';
import { AppLoading } from 'expo';
import { Container, Text, Header, Body, Title, Left, Button, Icon, Form, Item, Picker, Card, CardItem, Input, DatePicker} from 'native-base';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import 'react-native-gesture-handler';
export default class Team_create_volleyball extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isReady: false,
            country: 'Taipei',
            area: 'Beitou',
            Taipei: true,
            New_Taipei_City: false,
            Taoyuan: false,
            Hsinchu: false,
            Miaoli: false,
            team_name: '',
            name1: '',
            role1: '大砲', 
            age1: Number,
            tall1: Number,
            name2: '',
            role2: '大砲', 
            age2: Number,
            tall2: Number,
            name3: '',
            role3: '大砲', 
            age3: Number,
            tall3: Number,
            name4: '',
            role4: '大砲', 
            age4: Number,
            tall4: Number,
            name5: '',
            role5: '大砲', 
            age5: Number,
            tall5: Number,
            name6: '',
            role6: '大砲', 
            age6: Number,
            tall6: Number,
            chosenDate: '',
            chosenMonth: '',
            chosenYear: '',
            today: new Date()
        };
    }
    
    async componentDidMount() {
        await Font.loadAsync({
        Roboto: require('native-base/Fonts/Roboto.ttf'),
        Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
        ...Ionicons.font,
        });
        this.setState({ 
        isReady: true,
        });
    }

    Submit(){
        if(this.state.name1 == '' || this.state.name2 == '' || this.state.name3 == '' || this.state.name4 == '' || this.state.name5 == '' || this.state.name6 == '' || this.state.age1 == '' || this.state.age2 == '' || this.state.age3 == '' || this.state.age4 == '' || this.state.age5 == '' || this.state.age6 == '' || this.state.tall1 == '' || this.state.tall2 == '' || this.state.tall3 == '' || this.state.tall4 == '' || this.state.tall5 == '' || this.state.tall6 == '')
            alert('Invalid Info!')
        else
            fetch('http://140.114.206.145/php/volleyball_team_submit.php', {
                method: 'POST',
                header: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user: this.props.route.params.user,
                    country: this.state.country,
                    area: this.state.area,
                    team_name: this.state.team_name,
                    chosenDate: this.state.chosenDate,
                    chosenMonth: this.state.chosenMonth,
                    chosenYear: this.state.chosenYear,
                    member1: [this.state.name1, this.state.role1, this.state.age1, this.state.tall1],
                    member2: [this.state.name2, this.state.role2, this.state.age2, this.state.tall2],
                    member3: [this.state.name3, this.state.role3, this.state.age3, this.state.tall3],
                    member4: [this.state.name4, this.state.role4, this.state.age4, this.state.tall4],
                    member5: [this.state.name5, this.state.role5, this.state.age5, this.state.tall5],
                    member6: [this.state.name6, this.state.role6, this.state.age6, this.state.tall6]
                })
            })
            .then((response) => response.json())
            .then((res) => {
                if(res == true)
                    this.props.navigation.navigate('Team_manager', {kind: this.props.route.params.kind, user: this.props.route.params.user});
                else
                    if(res == false)
                        alert('Invalid Info!');
                    else
                        alert(res);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    onCountryChange(value) {
        this.setState({
            country: value
        });
        if(value == 'Taipei')
            this.setState({Taipei: true, New_Taipei_City: false, Taoyuan: false, Hsinchu: false, Miaoli: false, area: 'Beitou'});
        else if(value == 'New_Taipei_City')
            this.setState({Taipei: false, New_Taipei_City: true, Taoyuan: false, Hsinchu: false, Miaoli: false, area: 'Banqiao'});
        else if(value == 'Taoyuan')
            this.setState({Taipei: false, New_Taipei_City: false, Taoyuan: true, Hsinchu: false, Miaoli: false, area: 'Zhongli'});
        else if(value == 'Hsinchu')
            this.setState({Taipei: false, New_Taipei_City: false, Taoyuan: false, Hsinchu: true, Miaoli: false, area: 'Xiangshan'});
        else if(value == 'Miaoli')
            this.setState({Taipei: false, New_Taipei_City: false, Taoyuan: false, Hsinchu: false, Miaoli: true, area: 'Beitou'});
    }
    onAreaChange(value){
        this.setState({
            area: value
        })
    }
    render() {
        if (!this.state.isReady) {
        return <AppLoading />;
        }
        const PickerItem = () => {
            if(this.state.Taipei)
                return(
                    <Picker
                        mode="dropdown"
                        iosIcon={<Icon name="arrow-down" />}
                        style={{ width: undefined }}
                        placeholder="Select your Area."
                        placeholderStyle={{ color: "#bfc6ea" }}
                        placeholderIconColor="#007aff"
                        selectedValue={this.state.area}
                        onValueChange={this.onAreaChange.bind(this)}
                    >
                        <Picker.Item label="北投" value="Beitou"/>
                        <Picker.Item label="士林" value="Shilin"/>
                        <Picker.Item label="大同" value="Datong"/>
                        <Picker.Item label="中山" value="Zhongshan"/>
                        <Picker.Item label="松山" value="Songshan"/>
                        <Picker.Item label="內湖" value="Neihu"/>
                        <Picker.Item label="萬華" value="Wanhua"/>
                        <Picker.Item label="中正" value="Zhongzheng"/>
                        <Picker.Item label="大安" value="Da’an"/>
                        <Picker.Item label="信義" value="Xinyi"/>
                        <Picker.Item label="南港" value="Nangang"/>
                        <Picker.Item label="文山" value="Wenshan"/>
                    </Picker>
                );
            else if(this.state.New_Taipei_City)
                return(
                    <Picker
                        mode="dropdown"
                        iosIcon={<Icon name="arrow-down" />}
                        style={{ width: undefined }}
                        placeholder="Select your Area."
                        placeholderStyle={{ color: "#bfc6ea" }}
                        placeholderIconColor="#007aff"
                        selectedValue={this.state.area}
                        onValueChange={this.onAreaChange.bind(this)}
                    >
                        <Picker.Item label="板橋" value="Banqiao"/>
                        <Picker.Item label="三重" value="Sanchong"/>
                        <Picker.Item label="中和" value="Zhonghe"/>
                        <Picker.Item label="永和" value="Yonghe"/>
                        <Picker.Item label="新莊" value="Xinzhuang"/>
                        <Picker.Item label="新店" value="Xindian"/>
                        <Picker.Item label="土城" value="Tucheng"/>
                        <Picker.Item label="蘆洲" value="Luzhou"/>
                        <Picker.Item label="汐止" value="Xizhi"/>
                        <Picker.Item label="樹林" value="Shulin"/>
                        <Picker.Item label="淡水" value="Danshui"/>
                    </Picker>
                );
            else if(this.state.Taoyuan)
                return(
                    <Picker
                        mode="dropdown"
                        iosIcon={<Icon name="arrow-down" />}
                        style={{ width: undefined }}
                        placeholder="Select your Area."
                        placeholderStyle={{ color: "#bfc6ea" }}
                        placeholderIconColor="#007aff"
                        selectedValue={this.state.area}
                        onValueChange={this.onAreaChange.bind(this)}
                    >
                        <Picker.Item label="中壢" value="Zhongli"/>
                        <Picker.Item label="大溪" value="Daxi"/>
                        <Picker.Item label="楊梅" value="Yangmei"/>
                        <Picker.Item label="蘆竹" value="Luzhu"/>
                        <Picker.Item label="大園" value="Dayuan"/>
                        <Picker.Item label="龜山" value="Guishan"/>
                        <Picker.Item label="八德" value="Bade"/>
                        <Picker.Item label="龍潭" value="Longtan"/>
                        <Picker.Item label="平鎮" value="Pingzhen"/>
                        <Picker.Item label="新屋" value="Xinwu"/>
                        <Picker.Item label="觀音" value="Guanyin"/>
                        <Picker.Item label="復興" value="Fuxing"/>                                                                        
                    </Picker>
                );
            else if(this.state.Hsinchu)
                return(
                    <Picker
                        mode="dropdown"
                        iosIcon={<Icon name="arrow-down" />}
                        style={{ width: undefined }}
                        placeholder="Select your Area."
                        placeholderStyle={{ color: "#bfc6ea" }}
                        placeholderIconColor="#007aff"
                        selectedValue={this.state.area}
                        onValueChange={this.onAreaChange.bind(this)}
                    >
                        <Picker.Item label="香山" value="Xiangshan"/>
                        <Picker.Item label="東區" value="Hsinchu_East"/>
                        <Picker.Item label="北區" value="Hsinchu_North"/>
                        <Picker.Item label="竹北" value="Zhubei"/>
                        <Picker.Item label="竹東" value="Zhudong"/>
                        <Picker.Item label="新埔" value="Xinpu"/>
                        <Picker.Item label="湖口" value="Hukou"/>
                        <Picker.Item label="新豐" value="Xinfeng"/>
                        <Picker.Item label="芎林" value="Qionglin"/>
                        <Picker.Item label="橫山" value="Hengshan"/>
                        <Picker.Item label="北埔" value="Beipu "/>
                        <Picker.Item label="寶山" value="Baoshan"/>
                        <Picker.Item label="關西" value="Guanxi"/>
                        <Picker.Item label="峨嵋" value="Emei"/>
                        <Picker.Item label="尖石" value="Jianshi"/>
                        <Picker.Item label="五峰" value="Wufeng"/>
                    </Picker>
                );
            else if(this.state.Miaoli)
                return(
                    <Picker
                        mode="dropdown"
                        iosIcon={<Icon name="arrow-down" />}
                        style={{ width: undefined }}
                        placeholder="Select your Area."
                        placeholderStyle={{ color: "#bfc6ea" }}
                        placeholderIconColor="#007aff"
                        selectedValue={this.state.area}
                        onValueChange={this.onAreaChange.bind(this)}
                    >
                        <Picker.Item label="苗栗市" value="Miaoli_City"/>
                        <Picker.Item label="苑裡" value="Yuanli"/>
                        <Picker.Item label="通宵" value="Tongxiao"/>
                        <Picker.Item label="竹南" value="Zhunan"/>
                        <Picker.Item label="頭份" value="Toufen"/>
                        <Picker.Item label="後龍" value="Houlong"/>
                        <Picker.Item label="卓蘭" value="Zhuolan"/>
                        <Picker.Item label="大湖" value="Dahu"/>
                        <Picker.Item label="公館" value="Gongguan"/>
                        <Picker.Item label="銅鑼" value="ongluo"/>
                        <Picker.Item label="南庄" value="Nanzhuang"/>
                        <Picker.Item label="頭屋" value="Touwu"/>
                        <Picker.Item label="三義" value="Sanyi"/>
                        <Picker.Item label="西湖" value="Xihu"/>
                        <Picker.Item label="造橋" value="Zaoqiao"/>
                        <Picker.Item label="三灣" value="Sanwan"/>
                        <Picker.Item label="獅潭" value="Shitan"/>
                        <Picker.Item label="泰安" value="Tai’an"/>
                    </Picker>
                );                
        };
    
        return (
            <Container>
                <Header >
                <Left>
                    <Button transparent onPress={() => this.props.navigation.goBack()}>
                    <Text>Back</Text>
                    </Button>
                </Left>
                <Body>
                    <Title>Create {this.props.route.params.kind} team.</Title>
                </Body>
                </Header>
                <ScrollView>
                    <Form>
                        <Text>縣市</Text>
                        <Item picker>
                            <Picker
                                mode="dropdown"
                                iosIcon={<Icon name="arrow-down" />}
                                style={{ width: undefined }}
                                placeholder="Select your SIM"
                                placeholderStyle={{ color: "#bfc6ea" }}
                                placeholderIconColor="#007aff"
                                selectedValue={this.state.country}
                                onValueChange={this.onCountryChange.bind(this)}
                            >   
                                <Picker.Item label="臺北" value="Taipei"/>
                                <Picker.Item label="新北" value="New_Taipei_City" />
                                <Picker.Item label="桃園" value="Taoyuan" />
                                <Picker.Item label="新竹" value="Hsinchu" />
                                <Picker.Item label="苗栗" value="Miaoli" />
                            </Picker>
                        </Item>
                        <Text>地區</Text>
                        <Item picker >
                            <PickerItem></PickerItem>
                        </Item>
                        <Item><Input placeholder="隊名" onChangeText={(team_name) => this.setState({team_name: team_name})}/></Item>
                    </Form>
                    <DatePicker
                        defaultDate={new Date()}
                        minimumDate={new Date(this.state.today.getFullYear(), this.state.today.getMonth())}
                        maximumDate={new Date(this.state.today.getFullYear() + (this.state.today.getMonth() + 4) / 13, (this.state.today.getMonth() + 4) % 13 + 1)}
                        locale={"en"}
                        timeZoneOffsetInMinutes={undefined}
                        modalTransparent={false}
                        animationType={"fade"}
                        androidMode={"default"}
                        placeHolderText="Select date"
                        textStyle={{ color: "green" }}
                        placeHolderTextStyle={{ color: "#d3d3d3" }}
                        onDateChange={(date) => this.setState({chosenDate: date.getDate(), chosenMonth: date.getMonth(), chosenYear: date.getFullYear()})}
                    />
                    <Form>
                        <Card>
                            <CardItem>
                            <Body>
                                <Text>隊長</Text>
                                <Item>
                                    <Input placeholder="姓名" onChangeText={(name) => this.setState({name1: name})}/>
                                    <Picker
                                        mode="dropdown"
                                        iosIcon={<Icon name="arrow-down" />}
                                        style={{ width: undefined }}
                                        placeholder="Select your SIM"
                                        placeholderStyle={{ color: "#bfc6ea" }}
                                        placeholderIconColor="#007aff"
                                        selectedValue={this.state.role1}
                                        onValueChange={(value) => this.setState({role1: value})}
                                    >   
                                        <Picker.Item label="大砲" value="大砲"/>
                                        <Picker.Item label="攔中" value="攔中"/>
                                        <Picker.Item label="舉球" value="舉球"/>
                                        <Picker.Item label="輔舉" value="輔舉"/>
                                        <Picker.Item label="自由" value="自由"/>
                                    </Picker>
                                </Item>
                                <Item last>
                                    <Input placeholder="年齡" onChangeText={(age) => this.setState({age1: age})} keyboardType={'numeric'}/>
                                    <Input placeholder="身高" onChangeText={(tall) => this.setState({tall1: tall})} keyboardType={'numeric'}/>
                                </Item>
                            </Body>
                            </CardItem>
                        </Card>
                        <Card>
                            <CardItem>
                            <Body>
                                <Text>隊員</Text>
                                <Item>
                                    <Input placeholder="姓名" onChangeText={(name) => this.setState({name2: name})}/>
                                    <Picker
                                        mode="dropdown"
                                        iosIcon={<Icon name="arrow-down" />}
                                        style={{ width: undefined }}
                                        placeholder="Select your SIM"
                                        placeholderStyle={{ color: "#bfc6ea" }}
                                        placeholderIconColor="#007aff"
                                        selectedValue={this.state.role2}
                                        onValueChange={(value) => this.setState({role2: value})}
                                    >   
                                        <Picker.Item label="大砲" value="大砲"/>
                                        <Picker.Item label="攔中" value="攔中"/>
                                        <Picker.Item label="舉球" value="舉球"/>
                                        <Picker.Item label="輔舉" value="輔舉"/>
                                        <Picker.Item label="自由" value="自由"/>
                                    </Picker>
                                </Item>
                                <Item last>
                                    <Input placeholder="年齡" onChangeText={(age) => this.setState({age2: age})} keyboardType={'numeric'}/>
                                    <Input placeholder="身高" onChangeText={(tall) => this.setState({tall2: tall})} keyboardType={'numeric'}/>
                                </Item>
                            </Body>
                            </CardItem>
                        </Card>
                        <Card>
                            <CardItem>
                            <Body>
                                <Text>隊員</Text>
                                <Item>
                                    <Input placeholder="姓名" onChangeText={(name) => this.setState({name3: name})}/>
                                    <Picker
                                        mode="dropdown"
                                        iosIcon={<Icon name="arrow-down" />}
                                        style={{ width: undefined }}
                                        placeholder="Select your SIM"
                                        placeholderStyle={{ color: "#bfc6ea" }}
                                        placeholderIconColor="#007aff"
                                        selectedValue={this.state.role3}
                                        onValueChange={(value) => this.setState({role3: value})}
                                    >   
                                        <Picker.Item label="大砲" value="大砲"/>
                                        <Picker.Item label="攔中" value="攔中"/>
                                        <Picker.Item label="舉球" value="舉球"/>
                                        <Picker.Item label="輔舉" value="輔舉"/>
                                        <Picker.Item label="自由" value="自由"/>
                                    </Picker>
                                </Item>
                                <Item last>
                                    <Input placeholder="年齡" onChangeText={(age) => this.setState({age3: age})} keyboardType={'numeric'}/>
                                    <Input placeholder="身高" onChangeText={(tall) => this.setState({tall3: tall})} keyboardType={'numeric'}/>
                                </Item>
                            </Body>
                            </CardItem>
                        </Card>
                        <Card>
                            <CardItem>
                            <Body>
                                <Text>隊員</Text>
                                <Item>
                                    <Input placeholder="姓名" onChangeText={(name) => this.setState({name4: name})}/>
                                    <Picker
                                        mode="dropdown"
                                        iosIcon={<Icon name="arrow-down" />}
                                        style={{ width: undefined }}
                                        placeholder="Select your SIM"
                                        placeholderStyle={{ color: "#bfc6ea" }}
                                        placeholderIconColor="#007aff"
                                        selectedValue={this.state.role4}
                                        onValueChange={(value) => this.setState({role4: value})}
                                    >   
                                        <Picker.Item label="大砲" value="大砲"/>
                                        <Picker.Item label="攔中" value="攔中"/>
                                        <Picker.Item label="舉球" value="舉球"/>
                                        <Picker.Item label="輔舉" value="輔舉"/>
                                        <Picker.Item label="自由" value="自由"/>
                                    </Picker>
                                </Item>
                                <Item last>
                                    <Input placeholder="年齡" onChangeText={(age) => this.setState({age4: age})} keyboardType={'numeric'}/>
                                    <Input placeholder="身高" onChangeText={(tall) => this.setState({tall4: tall})} keyboardType={'numeric'}/>
                                </Item>
                            </Body>
                            </CardItem>
                        </Card>
                        <Card>
                            <CardItem>
                            <Body>
                                <Text>隊員</Text>
                                <Item>
                                    <Input placeholder="姓名" onChangeText={(name) => this.setState({name5: name})}/>
                                    <Picker
                                        mode="dropdown"
                                        iosIcon={<Icon name="arrow-down" />}
                                        style={{ width: undefined }}
                                        placeholder="Select your SIM"
                                        placeholderStyle={{ color: "#bfc6ea" }}
                                        placeholderIconColor="#007aff"
                                        selectedValue={this.state.role5}
                                        onValueChange={(value) => this.setState({role5: value})}
                                    >   
                                        <Picker.Item label="大砲" value="大砲"/>
                                        <Picker.Item label="攔中" value="攔中"/>
                                        <Picker.Item label="舉球" value="舉球"/>
                                        <Picker.Item label="輔舉" value="輔舉"/>
                                        <Picker.Item label="自由" value="自由"/>
                                    </Picker>
                                </Item>
                                <Item last>
                                <Input placeholder="年齡" onChangeText={(age) => this.setState({age5: age})} keyboardType={'numeric'}/>
                                    <Input placeholder="身高" onChangeText={(tall) => this.setState({tall5: tall})} keyboardType={'numeric'}/>
                                </Item>
                            </Body>
                            </CardItem>
                        </Card>
                        <Card>
                            <CardItem>
                            <Body>
                                <Text>隊員</Text>
                                <Item>
                                    <Input placeholder="姓名" onChangeText={(name) => this.setState({name6: name})}/>
                                    <Picker
                                        mode="dropdown"
                                        iosIcon={<Icon name="arrow-down" />}
                                        style={{ width: undefined }}
                                        placeholder="Select your SIM"
                                        placeholderStyle={{ color: "#bfc6ea" }}
                                        placeholderIconColor="#007aff"
                                        selectedValue={this.state.role6}
                                        onValueChange={(value) => this.setState({role6: value})}
                                    >   
                                        <Picker.Item label="大砲" value="大砲"/>
                                        <Picker.Item label="攔中" value="攔中"/>
                                        <Picker.Item label="舉球" value="舉球"/>
                                        <Picker.Item label="輔舉" value="輔舉"/>
                                        <Picker.Item label="自由" value="自由"/>
                                    </Picker>
                                </Item>
                                <Item last>
                                <Input placeholder="年齡" onChangeText={(age) => this.setState({age6: age})} keyboardType={'numeric'}/>
                                    <Input placeholder="身高" onChangeText={(tall) => this.setState({tall6: tall})} keyboardType={'numeric'}/>
                                </Item>
                            </Body>
                            </CardItem>
                        </Card>                        
                    </Form>
                    <Button full onPress={() => this.Submit()}>
                        <Text>Submit</Text>
                    </Button>
                </ScrollView>
            </Container>
        );
    }
}