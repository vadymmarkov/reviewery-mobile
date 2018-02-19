// @flow
'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  ListView,
  Text,
  View,
  RefreshControl
} from 'react-native';

import PlaylistRow from '../views/PlaylistRow';
import Networking from '../networking/Networking';

var baseStyles = require('../styles');
var colors = require('../colors');

export default class ChartDetailScreen extends Component {

  static navigatorStyle = {
    navBarTranslucent: true,
    drawUnderTabBar: true,
    statusBarTextColorSchemeSingleScreen: 'dark'
  };

  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
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
    if (event.type != 'NavBarButtonPress' || event.id != 'top') {
      return;
    }

    this.props.navigator.push({
      screen: 'app.TrackCatalogScreen',
      title: this.state.name,
      backButtonTitle: '',
      passProps: {
        chartId: this.props.chartId
      }
    });
  }

  onPressRow(rowData) {
    this.props.navigator.push({
      screen: 'app.PlaylistDetailScreen',
      title: rowData.name,
      backButtonTitle: '',
      passProps: {
        chartId: this.props.chartId,
        playlistId: rowData._id
      }
    });
  }

  // Networking

  async refreshData() {
    try {
      this.setState({refreshing: true});
      let data = await this.networking.get(
        `charts/${this.props.chartId}`
      );
      this.setState({
        name: data.name,
        dataSource: this.state.dataSource.cloneWithRows(data.playlists),
        refreshing: false
      });

      if (data.isReviewed) {
        let rightButton = {
          icon: require('../../img/navBarTop.png'),
          id: 'top'
        };
        this.props.navigator.setButtons({rightButtons: [rightButton]});
      }
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
      <PlaylistRow
        data={rowData}
        onPress={this.onPressRow.bind(this, rowData)}/>
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
