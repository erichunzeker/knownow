import React from 'react';
import {
    Text,
    View,
} from 'react-native';

import ProgressCircle from 'react-native-progress-circle'
import DropdownMenu from 'react-native-dropdown-menu';

import { BarChart, Grid, XAxis } from 'react-native-svg-charts'



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

    // componentDidMount() {
    //     return API.getData()
    //         .then((response) => {
    //             let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    //             this.setState({
    //                 isLoading: false,
    //                 dataSource: response.data,
    //             }, function() {
    //                 this.data = response ;
    //             });
    //         })
    //         .catch((error) => {
    //             console.error(error);
    //         });
    // }



    render() {
        var per = 50;
        var name = "hillman library";
        const fill = 'rgb(134, 65, 244)'
        const d   = [ 50, 10, 40, 95, 4, 24, 85, 0, 35, 53, 53, 24, 50, 20, 80 ];
        var data = [["hillman library", "the pete gym", "bellefield gym", "posvar"]];
        var days = [["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]];


        return (
            <View style={{alignItems: 'center',}}>

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


                <ProgressCircle
                    percent={per}
                    radius={80}
                    borderWidth={8}
                    color={per<=50 ? "red": "#3399FF"}
                    shadowColor="#999"
                    bgColor="#fff">
                    <Text style={{ fontSize: 18 }}>{per + '%'}</Text>
                </ProgressCircle>

                <Text style={{paddingTop: 50, paddingBottom: 50}}/>


                <DropdownMenu
                    style={{flex: 1, paddingTop: 100}}
                    bgColor={'white'}
                    tintColor={'#666666'}
                    activityTintColor={'green'}
                    // arrowImg={}
                    // checkImage={}
                    // optionTextStyle={{color: '#333333'}}
                    // titleStyle={{color: '#333333'}}
                    maxHeight={100}
                    handler={(selection, row) => this.setState({day: days[selection][row]})}
                    data={days} >
                    <View style={{flex: 1}}>
                        <Text style={{ width: 300 }}>
                        </Text>
                    </View>
                </DropdownMenu>

                <BarChart
                    style={{ height: 150, width: 300, }}
                    data={ d }
                    svg={{ fill }}
                    contentInset={{ top: 30, bottom: 10 }}>
                    <Grid/>
                </BarChart>



            </View>
        );
    }
}