# About

This package is based on [electron-deeplink](https://github.com/glawson/electron-deeplink).

Differences:
- switch to `yarn`
- small fixes
- types support for `on('request')`
- removed a lot of default behavior (like focusing the window after protocol request)
- removed logging support
- supports prebuilds (via `prebuildify`)
- no need to create a new instance of `Deeplink` class

# Installation

```sh
# If you use npm:
npm install electron-app-universal-protocol-client

# If you use yarn:
$ yarn add electron-app-universal-protocol-client
```
