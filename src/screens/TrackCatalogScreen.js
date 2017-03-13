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

export default class TrackCatalogScreen extends Component {

  static navigatorStyle = {
    statusBarTextColorSchemeSingleScreen: 'dark'
  };

  constructor(props) {
    super(props);
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

  // Networking

  async refreshData() {
    try {
      this.setState({refreshing: true});
      var url = `charts/${this.props.chartId}`;
      var end = 100;

      if (this.props.playlistId) {
        url += `/playlists/${this.props.playlistId}`;
        end = 10;
      }

      url += '/top';
      let data = await this.networking.get(url);
      let tracks;

      if (data.length > end) {
        tracks = data.slice(0, end);
      } else {
        tracks = data;
      }

      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(tracks),
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
      <TrackRow data={rowData}/>
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
