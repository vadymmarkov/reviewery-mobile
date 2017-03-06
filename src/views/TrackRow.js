// @flow
'use strict';

import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableHighlight,
  StyleSheet
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

var baseStyles = require('../styles');
var colors = require('../colors');

export default class TrackRow extends Component {
  render() {
    let rating;
    if (this.props.data.rating) {
      rating = (
        <Text style={[styles.ratingText]}>
          { this.props.data.rating }
        </Text>
      )
    } else {
      rating = (
        <TouchableHighlight
          underlayColor={colors.rowHighlighted}
          onPress={this.props.onReviewPress}
          style={styles.review}>
            <Icon name="star-o" size={30} color={colors.primary}/>
        </TouchableHighlight>
      )
    }

    return (
      <View style={baseStyles.row}>
        <Image
          source={{uri: this.props.data.imageUrl}}
          style={baseStyles.rowImage}/>
        <View style={baseStyles.rowTextContainer}>
          <Text
            numberOfLines={1}
            ellipsizeMode={'tail'}
            style={baseStyles.rowTitle}>
              {this.props.data.name}
          </Text>
          <Text style={baseStyles.rowSubtitle}>
            {this.props.data.artist}
          </Text>
        </View>
        { rating }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  review: {
    alignSelf: 'center',
    marginRight: 5
  },
  ratingText: {
    width: 40,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '500',
    color: colors.dark
  }
});
