// @flow
'use strict';

import { Navigation } from 'react-native-navigation';
import ChartCatalogScreen from './screens/ChartCatalogScreen';
import ChartDetailScreen from './screens/ChartDetailScreen';
import LoginScreen from './screens/LoginScreen';
import PlaylistDetailScreen from './screens/PlaylistDetailScreen';
import ProfileScreen from './screens/ProfileScreen';
import TrackReviewScreen from './screens/TrackReviewScreen';
import TrackCatalogScreen from './screens/TrackCatalogScreen';

var colors = require('./colors');

export default class NavigationService {

  // Register all screens of the app
  registerScreens() {
    Navigation.registerComponent(
      'app.ChartCatalogScreen', () => ChartCatalogScreen
    );
    Navigation.registerComponent(
      'app.ChartDetailScreen', () => ChartDetailScreen
    );
    Navigation.registerComponent(
      'app.LoginScreen', () => LoginScreen
    );
    Navigation.registerComponent(
      'app.PlaylistDetailScreen', () => PlaylistDetailScreen
    );
    Navigation.registerComponent(
      'app.ProfileScreen', () => ProfileScreen
    );
    Navigation.registerComponent(
      'app.TrackReviewScreen', () => TrackReviewScreen
    );
    Navigation.registerComponent(
      'app.TrackCatalogScreen', () => TrackCatalogScreen
    );
  }

  // Show login
  showLoginScreen(animated) {
    return Navigation.startSingleScreenApp({
      animationType: animated ? 'fade': 'none',
      screen: {
       screen: 'app.LoginScreen',
       title: 'Login',
       navigatorStyle: {
         navBarHidden: true,
         statusBarTextColorScheme: 'light'
       }
     }
    });
  }

  // Show main tab bar
  showMainScreen(animated) {
    const createTabs = () => {
      let tabs = [
        {
          label: 'Charts',
          screen: 'app.ChartCatalogScreen',
          icon: require('../img/tabBarCharts.png'),
          selectedIcon: require('../img/tabBarCharts.png'),
          title: 'Charts'
        },
        {
          label: 'Profile',
          screen: 'app.ProfileScreen',
          icon: require('../img/tabBarProfile.png'),
          selectedIcon: require('../img/tabBarProfile.png'),
          title: 'Profile',
          navigatorStyle: {
            navBarHidden: true,
            statusBarTextColorScheme: 'dark'
          }
        }
      ];

      return tabs;
    };

    Navigation.startTabBasedApp({
      animationType: animated ? 'slide-down': 'none',
      tabs: createTabs(),
      tabsStyle: {
        tabBarBackgroundColor: colors.white,
        tabBarButtonColor: colors.light,
        tabBarSelectedButtonColor: colors.primary,
      }
    });
  }
}
