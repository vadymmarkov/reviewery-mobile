'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  ListView,
  Text,
  View
} from 'react-native';

import TrackRow from '../views/TrackRow';

const FBSDK = require('react-native-fbsdk');
const {
  LoginManager,
  AccessToken
} = FBSDK;

var baseStyles = require('../styles');
var colors = require('../colors');

export default class PlaylistDetailScreen extends Component {

  // Initialize the hardcoded data
  constructor(props) {
    super(props);

    const dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.submitTrackReview = this._submitTrackReview.bind(this);

    this.state = {
      dataSource: dataSource.cloneWithRows([
        {id: '1', artist: 'Joy Division', name: 'Love Will Tear Us ApartsssssssssssLoveWill Tear Us Apart'},
        {id: '1', artist: 'Joy Division', name: 'Love Will Tear Us Apart'},
        {id: '1', artist: 'Joy Division', name: 'Love Will Tear Us Apart'},
        {id: '1', artist: 'Joy Division', name: 'Love Will Tear Us Apart'},
        {id: '1', artist: 'Joy Division', name: 'Love Will Tear Us Apart'},
        {id: '1', artist: 'Joy Division', name: 'Love Will Tear Us Apart'},
        {id: '1', artist: 'Joy Division', name: 'Love Will Tear Us Apart'},
        {id: '1', artist: 'Joy Division', name: 'Love Will Tear Us Apart'},
        {id: '1', artist: 'Joy Division', name: 'Love Will Tear Us Apart'}
      ])
    };
  }

  componentWillMount() {
    AccessToken.getCurrentAccessToken()
    .then((data) => {

    })
    .catch((error) => {

    });
  }

  render() {
    return (
      <View style={baseStyles.screenContainer}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderRow.bind(this)}
          renderSeparator={ (sectionId, rowId) =>
            <View key={rowId} style={baseStyles.separator} />
          }
        />
      </View>
    );
  }

  /// Private

  _renderRow(rowData, sectionId, rowId) {
    return (
      <TrackRow
        data={rowData}
        onReviewPress={this._onShowReviewPress.bind(this, rowData)}/>
     );
   }

  _onShowReviewPress(rowData) {
    this.props.navigator.showLightBox({
      screen: "app.TrackReviewScreen",
      passProps: {
        track: rowData,
        submitTrackReview: this.submitTrackReview
      },
      style: {
        backgroundBlur: "dark",
        backgroundColor: "#00000099"
      }
    });
  }

  _submitTrackReview(trackId, rating) {
    this.props.navigator.dismissLightBox();
  }
}
