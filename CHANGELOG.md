# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.1.1]

### Fixed
- Remove leftover bindings.js from dist directory

## [2.1.0]

### Added
- Module now exports `electronAppUniversalProtocolClient` beside default export

## [2.0.1]

### Fixed
- GitHub Prebuild Action

## [2.0.0]

### Fixed
- (POTENTIAL BREAKING CHANGE) Issues with native module binding (dropped usage of node-gyp-build for importing native modules in favour of manual approach that only loads them on macOS where they are indeed required)

## [1.3.0]

### Added
- Example project
- Support for dev mode on Linux + Xfce

## [1.2.0]

### Added

- Prebuilds support for darwin-arm64 (Apple M1/M2)
