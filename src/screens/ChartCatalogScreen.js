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

import ChartRow from '../views/ChartRow';
import Networking from '../networking/Networking';

var baseStyles = require('../styles');
var colors = require('../colors');

export default class ChartCatalogScreen extends Component {

  static navigatorStyle = {
    navBarButtonColor: colors.primary,
    navBarTextColor: colors.title
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

  // Events

  onPressRow(rowData) {
    this.props.navigator.push({
      screen: 'app.ChartDetailScreen',
      title: rowData.name,
      backButtonTitle: '',
      passProps: {
        chartId: rowData._id
      }
    })
  }

  // Networking

  async refreshData() {
    try {
      this.setState({refreshing: true});
      let data = await this.networking.get('charts');
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(data),
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
      <ChartRow
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
