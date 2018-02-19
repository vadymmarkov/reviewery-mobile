// @flow
'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableHighlight,
  Dimensions
} from 'react-native';

import StarRating from 'react-native-star-rating';
import RoundedButton from '../views/RoundedButton';
import Networking from '../networking/Networking';

var baseStyles = require('../styles');
var colors = require('../colors');
var {height, width} = Dimensions.get('window');

export default class TrackReviewScreen extends Component {

  static navigatorStyle = {
    statusBarTextColorSchemeSingleScreen: 'light'
  };

  constructor(props) {
    super(props);
    this.networking = new Networking();
    this.state = {
      rating: 0,
      animating: false,
      error: ""
    };
  }

  // Events

  onPressRating(rating) {
    this.setState({
      rating: rating
    });
  }

  onPressCancel() {
    if (this.state.animating) {
      return;
    }
    this.props.cancelTrackReview();
  }

  onPressSubmit() {
    if (this.state.animating) {
      return;
    }
    this.submitTrackReview();
  }

  // Networking

  async submitTrackReview() {
    try {
      this.setState({animating: true, error: ''});
      let chartId = this.props.chartId;
      let playlistId = this.props.playlistId;
      let trackId = this.props.track._id;
      await this.networking.post(
        `charts/${chartId}/playlists/${playlistId}/review/${trackId}`,
        {rating: this.state.rating}
      );
      this.setState({
        animating: false
      });
      this.props.submitTrackReview();
    } catch(error) {
      this.setState({
        animating: false,
        error: error.toString()
      });
    }
  }

  // Rendering

  render() {
    return (
      <View style={baseStyles.container}>
        <ActivityIndicator
          animating={this.state.animating}
          style={styles.activityIndicator}
          color="white"
        />
        <Text
          numberOfLines={3}
          style={styles.name}>
            {this.props.track.name}
        </Text>
        <Text style={styles.artist}>
          {this.props.track.artist}
        </Text>
        <StarRating
          disabled={false}
          maxStars={12}
          starSize={(width - 20) / 12}
          rating={this.state.rating}
          starColor={'#FFEFB3'}
          emptyStarColor={colors.white}
          selectedStar={(rating) => this.onPressRating(rating)}
        />
        <Text style={styles.rating}>
          {`${this.state.rating} of 12 stars`}
        </Text>
        <Text style={styles.error}>
          {this.state.error}
        </Text>
        <View style={styles.buttonContainer}>
          <RoundedButton
            title="Submit"
            highlightColor={colors.primaryHighlighted}
            style={[styles.button, styles.submitButton]}
            textStyle={[baseStyles.buttonText, styles.submitButtonText]}
            onPress={this.onPressSubmit.bind(this)}/>
          <RoundedButton
            title="Cancel"
            highlightColor={colors.whiteHighlighted}
            style={[styles.button, styles.cancelButton]}
            textStyle={[baseStyles.buttonText, styles.cancelButtonText]}
            onPress={this.onPressCancel.bind(this)}/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  error: {
    fontSize: 20,
    color: colors.primary,
    textAlign: 'center',
    width: 300,
    margin: 5
  },
  name: {
    fontSize: 24,
    color: colors.white,
    textAlign: 'center',
    width: 300,
    margin: 10
  },
  artist: {
    fontSize: 20,
    color: colors.subtitle,
    textAlign: 'center',
    marginBottom: 30,
  },
  rating: {
    marginTop: 10,
    fontSize: 20,
    color: '#FFEFB3'
  },
  buttonContainer: {
    margin: 100,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    width: 260,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  submitButton: {
    backgroundColor: colors.primary
  },
  submitButtonText: {
    color: colors.white
  },
  cancelButton: {
    backgroundColor: colors.white,
    margin: 15
  },
  cancelButtonText: {
    color: colors.primary
  },
  activityIndicator: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
});
