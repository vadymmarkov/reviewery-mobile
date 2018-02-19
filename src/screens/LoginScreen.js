// @flow
'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image
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

export default class LoginScreen extends Component {

  static navigatorStyle = {
    statusBarTextColorSchemeSingleScreen: 'light'
  };

  // Events

  onPressLogin() {
    let navigationService = new NavigationService();
    //navigationService.showMainScreen(true);
    LoginManager.logInWithReadPermissions(['public_profile']).then(
      function(result) {
        if (result.isCancelled) {
          alert('Login was cancelled');
        } else {
          AccessToken.getCurrentAccessToken().then((data) => {
            if (!data.accessToken) {
              alert('Login failed with error');
            } else {
              navigationService.showMainScreen(true);
            }
          })
        }
      },
      function(error) {
        alert('Login failed with error: ' + error);
      }
    );
  }

  // Rendering

  render() {
    return (
      <View style={[baseStyles.container, styles.container]}>
        <Image
          style={styles.logo}
          source={require('../../img/logo.png')}
        />
        <Text style={[baseStyles.heading, styles.title]}>
          Welcome to Reviewery!
        </Text>
        <Text style={styles.subtitle}>
          Login with your Facebook account.
        </Text>
        <RoundedButton
          title="Login"
          highlightColor={colors.whiteHighlighted}
          style={[baseStyles.button, styles.button]}
          textStyle={[baseStyles.buttonText, styles.buttonText]}
          onPress={this.onPressLogin}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.dark
  },
  logo: {
    marginTop: 60
  },
  title: {
    marginTop: 20,
    color: colors.white
  },
  subtitle: {
    color: colors.whiteHighlighted,
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 5
  },
  button: {
    backgroundColor: colors.white
  },
  buttonText: {
    color: colors.title
  }
});
