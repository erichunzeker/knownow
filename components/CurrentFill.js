import React from 'react';
import {
    Text,
    View,
    ListView,
    ActivityIndicator
} from 'react-native';

import ProgressCircle from 'react-native-progress-circle'
import DropdownMenu from 'react-native-dropdown-menu';

import { BarChart, LineChart, Grid, XAxis, YAxis } from 'react-native-svg-charts'



import API from '../API';

export default class CurrentFill extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            text: '',
            day:'',
        }
    }

    componentDidMount() {
        return API.getFillByLocations(1)
            .then((response) => {
                let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
                this.setState({
                    isLoading: false,
                    dataSource: response.data,
                }, function() {
                    this.data = response ;
                });
            })
            .catch((error) => {
                console.error(error);
            })
    }


    render() {

        if (this.state.isLoading) {
            return (
                <View style={{flex: 1, paddingTop: 20}}>
                    <ActivityIndicator />
                </View>
            );
        }

        var per = 50;
        var name = "hillman library";
        const fill = 'rgb(134, 65, 244)'
        var data = [["hillman library", "the pete gym", "bellefield gym", "posvar"]];
        var days = [["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]];
        var average = this.state.dataSource.average;
        var hour = this.state.dataSource.hour;

        console.log(hour);

        return (

            <View style={{ alignItems: 'center' }}>


                <Text style={{paddingTop: 50}}/>
                <DropdownMenu
                    style={{ paddingTop: 250 , flex: 1 }}
                    bgColor={'white'}
                    tintColor={'#666666'}
                    activityTintColor={'blue'}
                    // arrowImg={}
                    // checkImage={}
                    // optionTextStyle={{color: '#333333'}}
                    // titleStyle={{color: '#333333'}}
                    // maxHeight={300}
                    handler={(selection, row) => this.setState({text: data[selection][row]})}
                    data={data} >

                    <View style={{flex: 1, paddingTop: 100}}>
                        <Text style={{ width: 300, paddingTop: 200}}>
                        </Text>
                    </View>
                </DropdownMenu>

                <View style={{ height: 200, paddingTop: 100 }}>
                    <ProgressCircle
                        style={{flex:1 }}
                        percent={this.state.dataSource.numPercent}
                        radius={80}
                        borderWidth={8}
                        color={per<=50 ? "red": "#3399FF"}
                        shadowColor="#999"
                        bgColor="#fff">
                        <Text style={{ fontSize: 18 }}>{this.state.dataSource.numPercent.toFixed(0) + '%'}</Text>
                    </ProgressCircle>
                </View>

                <Text style={{paddingTop: 50, paddingBottom: 50}}/>


                <DropdownMenu
                    style={{flex: 1, paddingTop: 100}}
                    bgColor={'white'}
                    tintColor={'#666666'}
                    activityTintColor={'green'}
                    maxHeight={100}
                    handler={(selection, row) => this.setState({day: days[selection][row]})}
                    data={days} >
                    <View style={{flex: 1}}>
                        <Text style={{ width: 300 }}>
                        </Text>
                    </View>
                </DropdownMenu>

                <View style={{ height: 200, padding: 20, width: 350 }}>
                    <BarChart
                        style={{ height: 200 }}
                        data={ average }
                        svg={{ fill }}
                        contentInset={{ top: 30, bottom: 30 }}
                    >
                        <Grid/>
                    </BarChart>
                    <XAxis
                        style={{ marginHorizontal: -10, width: 350 }}
                        data={ average }
                        formatLabel={ (value, index) => hour[index].substring(3) }
                        contentInset={{ left: 10, right: 10 }}
                        svg={{ fontSize: 10, fill: 'black' }}
                    />
                </View>

            </View>
        );
    }
}