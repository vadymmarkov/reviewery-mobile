import React, { Component } from 'react';
// "react-native-carousel-control"
import {
  StyleSheet,
  Text,
  View,
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

  render() {
    return (
      <View style={[baseStyles.container, styles.container]}>
        <Text style={styles.title}>
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
          onPress={this._onLoginPress}/>
      </View>
    );
  }

  _onLoginPress() {
    let navigationService = new NavigationService();
    navigationService.showMainScreen(true);
    // LoginManager.logInWithReadPermissions(['public_profile']).then(
    //   function(result) {
    //     if (result.isCancelled) {
    //       alert('Login was cancelled');
    //     } else {
    //       AccessToken.getCurrentAccessToken().then(
    //         (data) => {
    //           alert(data.accessToken.toString())
    //         }
    //       )
    //     }
    //   },
    //   function(error) {
    //     alert('Login failed with error: ' + error);
    //   }
    // );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary
  },
  title: {
    color: colors.whiteHighlighted,
    fontSize: 28,
    textAlign: 'center',
    marginBottom: 10,
    paddingLeft: 20,
    paddingRight: 20
  },
  subtitle: {
    color: colors.white,
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 5
  },
  button: {
    backgroundColor: colors.white
  },
  buttonText: {
    color: colors.primary
  }
});
