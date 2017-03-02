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
    return (
      <View style={baseStyles.row}>
        <Image
          source={{uri: 'https://pbs.twimg.com/media/C1E4xfBWIAAUceW.jpg'}}
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
        <TouchableHighlight
          underlayColor={colors.rowHighlighted}
          onPress={this.props.onReviewPress}
          style={styles.reviewButton}>
            <Icon name="star-o" size={30} color={colors.primary}/>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  reviewButton: {
    alignSelf: 'center',
    marginRight: 5
  }
});
