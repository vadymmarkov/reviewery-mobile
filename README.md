# Description

**Reviewery** is an iOS application to rate songs in
[Spotify](https://www.spotify.com) playlists. It's a hobby project built in
React Native. Read more in my [Medium article](https://t.co/7qONtlRGxr).

Server side code in located [here](https://github.com/vadymmarkov/reviewery-server).

<div align="center">
<img src="https://github.com/vadymmarkov/reviewery-mobile/blob/master/reviewery.gif" alt="Reviewery" width="369" height="665" />
</div>

# Functionality

- Facebook login
- Profile screen with the possibility to logout
- A list of charts
- Chart detail screen with a list of attached playlists
- Playlist detail screen with a list of songs
- Review popup to rate songs
- Result screen with a list of songs sorted by rating. It should be
accessible only when the chart is marked as completed.

# Installation

Assuming you’ve already installed [Node.js](https://nodejs.org),
[CocoaPods](https://cocoapods.org) and [React Native CLI](https://facebook.github.io/react-native/docs/getting-started.html#the-react-native-cli)
```sh
git clone https://github.com/vadymmarkov/reviewery-mobile.git
cd reviewery-mobile/ios
pod install
cd ..
npm install
react-native run-ios
```

Read more about React Native setup in official [getting started guide](https://facebook.github.io/react-native/docs/getting-started.html).

## Author

Vadym Markov, markov.vadym@gmail.com

## Contributing

Check the [CONTRIBUTING](https://github.com/vadymmarkov/reviewery-mobile/blob/master/CONTRIBUTING.md) file for more info.

## License

**Reviewery** is available under the MIT license. See the [LICENSE](https://github.com/vadymmarkov/reviewery-mobile/blob/master/LICENSE.md) file for more info.
