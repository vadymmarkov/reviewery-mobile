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
  GraphRequest,
  GraphRequestManager,
} = FBSDK;

var baseStyles = require('../styles');
var colors = require('../colors');

export default class ProfileScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      profile: {}
    };
  }

  // Lifecycle

  componentWillMount() {
    const infoRequest = new GraphRequest(
      '/me',
      null,
      this.onReceiveProfile.bind(this),
    );
    new GraphRequestManager().addRequest(infoRequest).start();
  }

  // Events

  onReceiveProfile(error: ?Object, result: ?Object) {
    if (error) {
      alert(error);
      this.setState({
        profile: {}
      });
    } else {
      this.setState({
        profile: {
          name: result.name,
          pictureUrl: `https://graph.facebook.com/${result.id}/picture?type=large`
        }
      });
    }
  }

  onPressLogout() {
    LoginManager.logOut();
    let navigationService = new NavigationService();
    navigationService.showLoginScreen(true);
  }

  // Rendering

  render() {
    let picture;
    let name;
    if (this.state.profile) {
      picture = (
        <Image
          source={{uri: this.state.profile.pictureUrl}}
          style={styles.picture}/>
      )
      name = (
        <Text style={[baseStyles.heading, styles.title]}>
          {this.state.profile.name}
        </Text>
      )
    }

    return (
      <View style={[baseStyles.container, styles.container]}>
        {picture}
        {name}
        <RoundedButton
          title="Logout"
          highlightColor={colors.primaryHighlighted}
          style={[baseStyles.button, styles.button]}
          textStyle={[baseStyles.buttonText, styles.buttonText]}
          onPress={this.onPressLogout}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background
  },
  picture: {
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: colors.light
  },
  title: {
    marginTop: 30,
    color: colors.title
  },
  button: {
    backgroundColor: colors.primary
  },
  buttonText: {
    color: colors.white
  }
});
