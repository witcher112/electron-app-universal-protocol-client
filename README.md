# About

This package is based on [electron-deeplink](https://github.com/glawson/electron-deeplink).

Differences:
- switch to `yarn`
- support for prebuilds (via `prebuildify` and GitHub Actions)
- types support for `on('request')`
- no need to call the API as early as possible to catch the first request (just require it)
- no need to create a new instance of class to use the API
- removed a lot of default behavior (like focusing the window after protocol request)
- removed logging support
- minor fixes

# Installation

```sh
# If you use npm:
npm install electron-app-universal-protocol-client

# If you use yarn:
$ yarn add electron-app-universal-protocol-client
```

# Usage

## Example

```
import electronAppUniversalProtocolClient from 'electron-app-universal-protocol-client';

// create window, initialize other stuff

electronAppUniversalProtocolClient.on(
  'request',
  (requestUrl) => {

    // handle the request
  },
);

await electronAppUniversalProtocolClient.initialize({
  protocol: 'your-app-id',
  mode: 'development', // if running in dev mode, otherwise use 'production' or skip
});

```

## Development mode

Make sure you're launching Electron with your main script as first argument. Development mode is made upon this assumption.
