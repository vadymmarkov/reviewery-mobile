// @flow
'use strict';

import React, { Component } from 'react';
import {
  Text,
  TouchableHighlight
} from 'react-native';

export default class Button extends Component {
  render() {
    return (
      <TouchableHighlight
        underlayColor={this.props.highlightColor}
        onPress={this.props.onPress}
        style={this.props.style}>
          <Text style={this.props.textStyle}>{this.props.title}</Text>
      </TouchableHighlight>
    );
  }
}
