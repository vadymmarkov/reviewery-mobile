import { Navigation } from 'react-native-navigation';
import NavigationService from './navigation';

const FBSDK = require('react-native-fbsdk');
const {
  LoginManager,
  AccessToken
} = FBSDK;

let navigationService = new NavigationService();
navigationService.registerScreens();

export default (async () => {
  AccessToken.getCurrentAccessToken()
  .then((data) => {
    if (!data.accessToken) {
      navigationService.showLoginScreen(false);
    } else {
      navigationService.showMainScreen(false);
    }
  })
  .catch((error) => {
    navigationService.showLoginScreen(false);
  });
})()
