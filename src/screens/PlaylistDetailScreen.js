// @flow
'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  ListView,
  Text,
  View,
  RefreshControl,
  AlertIOS,
  Linking
} from 'react-native';

import TrackRow from '../views/TrackRow';
import Networking from '../networking/Networking';

var baseStyles = require('../styles');
var colors = require('../colors');

export default class PlaylistDetailScreen extends Component {

  static navigatorStyle = {
    statusBarTextColorSchemeSingleScreen: 'dark'
  };

  static navigatorButtons = {
    rightButtons: [{
      icon: require('../../img/navBarMore.png'),
      id: 'more'
    }]
  };

  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    this.onSubmitTrackReview = this.closeTrackReview.bind(this);
    this.onCancelTrackReview = this.cancelTrackReview.bind(this);
    this.networking = new Networking();

    const listDataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.state = {
      dataSource: listDataSource.cloneWithRows([]),
      refreshing: true
    };
  }

  // Lifecycle

  componentWillMount() {
    this.refreshData();
  }

  // Events

  onNavigatorEvent(event) {
    if (event.type != 'NavBarButtonPress' || event.id != 'more') {
      return;
    }

    let uri = this.state.href;

    AlertIOS.alert(this.state.name, '', [
      {text: 'Cancel', style: 'cancel'},
      {text: 'Open in Spotify', onPress: function() {
        Linking.openURL(uri);
      }},
    ]);
  }

  onPressShowReview(rowData, rowId) {
    this.props.navigator.showLightBox({
      screen: "app.TrackReviewScreen",
      passProps: {
        chartId: this.props.chartId,
        playlistId: this.props.playlistId,
        track: rowData,
        submitTrackReview: this.onSubmitTrackReview,
        cancelTrackReview: this.onCancelTrackReview
      },
      style: {
        backgroundBlur: "dark",
        backgroundColor: "#00000099"
      }
    });
  }

  closeTrackReview() {
    this.refreshData();
    this.props.navigator.dismissLightBox();
  }

  cancelTrackReview() {
    this.props.navigator.dismissLightBox();
  }

  // Networking

  async refreshData() {
    try {
      this.setState({refreshing: true});
      let data = await this.networking.get(
        `charts/${this.props.chartId}/playlists/${this.props.playlistId}`
      );
      this.setState({
        name: data.name,
        href: data.href,
        dataSource: this.state.dataSource.cloneWithRows(data.tracks),
        refreshing: false
      });
    } catch(error) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows([]),
        refreshing: false
      });
    }
  }

  // Rendering

  renderRow(rowData, sectionId, rowId) {
    return (
      <TrackRow
        data={rowData}
        onReviewPress={this.onPressShowReview.bind(this, rowData, rowId)}/>
    );
  }

  render() {
    return (
      <View style={baseStyles.screenContainer}>
        <ListView
          enableEmptySections={true}
          refreshControl={
            <RefreshControl
              tintColor={colors.dark}
              refreshing={this.state.refreshing}
              onRefresh={this.refreshData.bind(this)}
            />
          }
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this)}
          renderSeparator={ (sectionId, rowId) =>
            <View key={rowId} style={baseStyles.separator} />
          }
        />
      </View>
    );
  }
}
