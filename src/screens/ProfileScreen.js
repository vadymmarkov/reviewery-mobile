'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import NavigationService from '../navigation';
import RoundedButton from '../views/RoundedButton';

const FBSDK = require('react-native-fbsdk');
const {
  LoginManager,
  AccessToken
} = FBSDK;

var baseStyles = require('../styles');
var colors = require('../colors');

export default class ProfileScreen extends Component {

  componentWillMount() {
    AccessToken.getCurrentAccessToken()
    .then((data) => {

    })
    .catch((error) => {

    });
  }

  render() {
    return (
      <View style={[baseStyles.container, styles.container]}>
        <Text style={[baseStyles.title, styles.title]}>
          Profile
        </Text>
        <RoundedButton
          title="Logout"
          highlightColor={colors.primaryHighlighted}
          style={[baseStyles.button, styles.button]}
          textStyle={[baseStyles.buttonText, styles.buttonText]}
          onPress={this._onPressLogout}/>
      </View>
    );
  }

  _onPressLogout() {
    let navigationService = new NavigationService();
    navigationService.showLoginScreen(true);
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background
  },
  title: {
    color: colors.title,
    fontSize: 28,
    textAlign: 'center',
    marginBottom: 10,
    paddingLeft: 20,
    paddingRight: 20
  },
  button: {
    backgroundColor: colors.primary
  },
  buttonText: {
    color: colors.white
  }
});
