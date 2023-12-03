# About

Unified and simplified API for Electron application's protocol handlers ("deep links").

Features:
- support for all platforms (Windows, macOS nad Linux)
- development mode
- capturing start-up request (if application was not running and protocol request caused it to be started)

## electron-deeplink

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

Further changes are listed in [CHANGELOG.md](./CHANGELOG.md).

Huge thanks for @glawson for creating `electron-deeplink` and allowing me to continue his work as recommended fork.

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

Make sure you're launching Electron with your **main script path*** as first argument. Development mode is made upon this assumption.

## macOS Development Mode Permissions Issue

Due to macOS permissions system, you could experience following errors after starting your Electron app in development mode:
```
[42590:1203/200159.650790:ERROR:mach_port_rendezvous.cc(310)] bootstrap_look_up com.github.my-app-id.MachPortRendezvousServer.42588: Permission denied (1100)
[42590:1203/200159.651421:ERROR:child_thread_impl.cc(228)] Mach rendezvous failed, terminating process (parent died?)
```

To fix them, run this command in project's root directory:
```
sudo xattr -r -d com.apple.quarantine ./
```