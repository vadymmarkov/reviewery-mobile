// @flow
'use strict';

const FBSDK = require('react-native-fbsdk');
const {
  LoginManager,
  AccessToken
} = FBSDK;

export default class Networking {

  constructor() {
    this.baseUrl = "http://localhost:3000/api/";
  }

  // Method requests

  async get(endpoint) {
    let url = this.baseUrl + endpoint;
    return this.request('GET', url);
  }

  async post(endpoint, parameters) {
    let url = this.baseUrl + endpoint
    return this.request('POST', url, parameters);
  }

  // Reqeust

  async request(method, url, parameters) {
    let data = await AccessToken.getCurrentAccessToken();
    let accessToken = data.accessToken.toString();
    let headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    };

    var request = {
      method: method,
      headers: headers
    };

    if (parameters) {
      request.body = JSON.stringify(parameters)
    };

    let response = await fetch(url, request);

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    let responseJson = await response.json();
    return responseJson;
  }
}
