'use strict';

var React = require('react-native');

var {
  StyleSheet,
} = React;

var colors = require('./colors');

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  screenContainer: {
    flex: 1,
    backgroundColor: colors.background
  },
  button: {
    margin: 100,
    width: 200,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    fontSize: 25
  },
  row: {
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    height: 80
  },
  rowTextContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: 12
  },
  rowImage: {
    alignSelf: 'flex-start',
    width: 60,
    height: 60
  },
  rowTitle: {
    color: colors.title,
    fontSize: 20,
    textAlign: 'left',
    marginBottom: 3
  },
  rowSubtitle: {
    color: colors.subtitle,
    fontSize: 14,
    textAlign: 'left'
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.light,
  },
  disclosure: {
    alignSelf: 'center'
  },
});
