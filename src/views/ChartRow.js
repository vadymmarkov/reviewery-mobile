// @flow
'use strict';

import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableHighlight
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

var baseStyles = require('../styles');
var colors = require('../colors');

export default class ChartRow extends Component {
  render() {
    return (
      <TouchableHighlight
        underlayColor={colors.rowHighlighted}
        onPress={this.props.onPress}>
          <View style={baseStyles.row}>
            <View style={baseStyles.rowTextContainer}>
              <Text
                numberOfLines={1}
                ellipsizeMode={'tail'}
                style={baseStyles.rowTitle}>
                  {this.props.data.name}
              </Text>
              <Text style={baseStyles.rowSubtitle}>
                {this.props.data.playlistsCount} playlists
              </Text>
            </View>
            <Icon name="angle-right" size={30} color={colors.light}
              style={baseStyles.disclosure}/>
          </View>
      </TouchableHighlight>
    );
  }
}
