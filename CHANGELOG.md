# Changelog

All notable changes to this project will be documented in this file. This
project adheres to [Semantic Versioning](http://semver.org/).


## [v2.0.0](https://github.com/stellar/js-xdr/compare/v1.3.0...v2.0.0)

- Refactor XDR serialization/deserialization logic ([#91](https://github.com/stellar/js-xdr/pull/91)).
- Replace `long` dependency with native `BigInt` arithmetics.
- Replace `lodash` dependency with built-in Array and Object methods, iterators.
- Add `buffer` dependency for WebPack browser polyfill.
- Update devDependencies to more recent versions, modernize bundler pipeline.
- Automatically grow underlying buffer on writes (#84 fixed).
- Always check that the entire read buffer is consumed (#32 fixed).
- Check actual byte size of the string on write (#33 fixed).
- Fix babel-polyfill build warnings (#34 fixed).
- Upgrade dependencies to their latest versions ([#92](https://github.com/stellar/js-xdr/pull/92)).

## [v1.3.0](https://github.com/stellar/js-xdr/compare/v1.2.0...v1.3.0)

- Inline and modernize the `cursor` dependency ([#](https://github.com/stellar/js-xdr/pull/63)).

## [v1.2.0](https://github.com/stellar/js-xdr/compare/v1.1.4...v1.2.0)

- Add method `validateXDR(input, format = 'raw')` which validates if a given XDR is valid or  not. ([#56](https://github.com/stellar/js-xdr/pull/56)).

## [v1.1.4](https://github.com/stellar/js-xdr/compare/v1.1.3...v1.1.4)

- Remove `core-js` dependency ([#45](https://github.com/stellar/js-xdr/pull/45)).

## [v1.1.3](https://github.com/stellar/js-xdr/compare/v1.1.2...v1.1.3)

- Split out reference class to it's own file to avoid circular import  ([#39](https://github.com/stellar/js-xdr/pull/39)).

## [v1.1.2](https://github.com/stellar/js-xdr/compare/v1.1.1...v1.1.2)

- Travis: Deploy to NPM with an env variable instead of an encrypted key
- Instruct Travis to cache node_modules

## [v1.1.1](https://github.com/stellar/js-xdr/compare/v1.1.0...v1.1.1)

- Updated some out-of-date dependencies

## [v1.1.0](https://github.com/stellar/js-xdr/compare/v1.0.3...v1.1.0)

### Changed

- Added ESLint and Prettier to enforce code style
- Upgraded dependencies, including Babel to 6
- Bump local node version to 6.14.0

## [v1.0.3](https://github.com/stellar/js-xdr/compare/v1.0.2...v1.0.3)

### Changed

- Updated dependencies
- Improved lodash imports (the browser build should be smaller)

## [v1.0.2](https://github.com/stellar/js-xdr/compare/v1.0.1...v1.0.2)

### Changed

- bugfix: removed `runtime` flag from babel to make this package working in
  React/Webpack environments

## [v1.0.1](https://github.com/stellar/js-xdr/compare/v1.0.0...v1.0.1)

### Changed

- bugfix: padding bytes are now ensured to be zero when reading

## [v1.0.0](https://github.com/stellar/js-xdr/compare/v0.0.12...v1.0.0)

### Changed

- Strings are now encoded/decoded as utf-8

## [v0.0.12](https://github.com/stellar/js-xdr/compare/v0.0.11...v0.0.12)

### Changed

- bugfix: Hyper.fromString() no longer silently accepts strings with decimal
  points
- bugfix: UnsignedHyper.fromString() no longer silently accepts strings with
  decimal points
