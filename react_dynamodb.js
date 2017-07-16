import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView, Text, View, Button } from 'react-native';
import { logout } from '../redux/actions/auth';
import DropdownMenu from 'react-native-dropdown-menu';
import Icon from './Icon';
import {DynamoDB} from 'react-native-dynamodb';
// Partition key = "user_id"
// Table name = "user_choice"


let dynamodb = DynamoDB.init({
    credentials: {
        AccessKeyId: 'Some Key',
        SecretKey: 'Some Key'
    }
    // region: 'us-east-1' - default, optional
    // version: '20120810' - default, optional
})


    dynamodb.table('user_choice').PutItem(
    {
        "name": {"S":'Jack Sparrow'}
    },

    {
        ConditionExpression: "last_movie <> :movie",
        ExpressionAttributeValues: {
            ":movie": {"S": "Pirates of the Caribbean: On Stranger Tides"}
        }
    })
    .then((response) => console.log(response)) // AWS object response
    .catch((error) => {
        console.log(error)
    })

class Secured extends Component {
    render() {
        var data = [["Literacy Leaders"], ["Wrestling Camp"], ["Screenplay Writing"], ["Panetarium Workshop"]];

        return(
            <ScrollView style={{padding: 20}}>
                <Icon/>

                <Text style={{fontSize: 27}}>
                    {`Welcome ${this.props.username}`}
                </Text>

                <View style={{flex: 1}}>

                    <DropdownMenu style={{flex: 1}}
                                  bgColor={"purple"}  //the background color of the head, default is grey
                                  tintColor={"white"} //the text color of the head, default is white
                                  selectItemColor={"orange"} //the text color of the selected item, default is red
                                  data={data}
                                  maxHeight={410}  // the max height of the menu
                                  handler={(selection, row) => alert(data[selection][row])} >

                        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}} >
                        </View>
                    </DropdownMenu>

                </View>

                <View style={{margin: 20}}/>

                <Button onPress={(e) => this.userLogout(e)} title="Logout"/>

            </ScrollView>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        username: state.auth.username
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLogout: () => { dispatch(logout()); }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Secured);