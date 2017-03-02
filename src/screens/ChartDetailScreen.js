'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  ListView,
  Text,
  View
} from 'react-native';

import PlaylistRow from '../views/PlaylistRow';

const FBSDK = require('react-native-fbsdk');
const {
  LoginManager,
  AccessToken
} = FBSDK;

var baseStyles = require('../styles');
var colors = require('../colors');

export default class ChartDetailScreen extends Component {

  // Initialize the hardcoded data
  constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.state = {
      dataSource: dataSource.cloneWithRows([
        {name: 'January 2017'}, {name: 'February 2017'}
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
      <PlaylistRow data={rowData} onPress={this._onPressRow.bind(this, rowData)}/>
     );
   }

  _onPressRow(rowData) {
    this.props.navigator.push({
      screen: 'app.PlaylistDetailScreen',
      title: rowData.name,
      backButtonTitle: ''
    })
  }
}
