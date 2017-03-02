'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  View,
  Dimensions
} from 'react-native';

import StarRating from 'react-native-star-rating';
import RoundedButton from '../views/RoundedButton';

var baseStyles = require('../styles');
var colors = require('../colors');
var {height, width} = Dimensions.get('window');

export default class TrackReviewScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      rating: 0
    };
  }

  render() {
    return (
      <View style={baseStyles.container}>
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
          maxStars={10}
          starSize={(width - 20) / 10}
          rating={this.state.rating}
          starColor={'#FFEFB3'}
          emptyStarColor={colors.white}
          selectedStar={(rating) => this._onRatingPress(rating)}
        />
        <Text style={styles.rating}>
          {`${this.state.rating} of 10 stars`}
        </Text>
        <RoundedButton
          title="Submit"
          highlightColor={colors.primaryHighlighted}
          style={[baseStyles.button, styles.button]}
          textStyle={[baseStyles.buttonText, styles.buttonText]}
          onPress={this._onSubmitPress.bind(this)}/>
      </View>
    );
  }

  _onRatingPress(rating) {
    this.setState({
      rating: rating
    });
  }

  _onSubmitPress() {
    // Sumit review
    this.props.submitTrackReview(this.props.track.id, this.state.rating);
  }
}

const styles = StyleSheet.create({
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
  button: {
    backgroundColor: colors.primary
  },
  buttonText: {
    color: colors.white
  }
});
