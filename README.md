<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="">
    <img src="https://github.com/bible-technology/scribe-scripture-editor/blob/development/styles/scribe-logo.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Scribe Scripture Editor (Scribe v2)</h3>

  <p align="center">
    A Bible translation editor for everyone.
    <br />
    <a href="https://github.com/BiblioNexus-Foundation/scribe/issues">Report Issue</a>
    ·
    <a href="https://github.com/BiblioNexus-Foundation/scribe/issues">Feature Request</a>
  </p>
</p>

<!-- GETTING STARTED -->

## Getting Started

It is relatively easy to set up the application locally for development.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.

- [Node.js 20.10.0](https://nodejs.org/en/)
- [YARN ^1.7.0 <2](https://yarnpkg.com/getting-started)
- [More](https://github.com/eclipse-theia/theia/blob/master/doc/Developing.md)

### Installation

NB: If you are cloning the repository on linux you might need to do the following:

ubuntu:

```
sudo apt-get update && sudo apt-get install libx11-dev libxkbfile-dev
```

For other distributions refer to [documentation](https://github.com/eclipse-theia/theia/blob/master/doc/Developing.md#prerequisites) on how to download those above libraries.

To run the electron application:

1. Fork and clone this repository
2. Install dependencies with `yarn`
3. Install dependencies and Build the app run `yarn build:electron`
4. Start the application run `yarn start:electron`
5. To bundle the application run `yarn electron:dist`

To run the browser application:

1. Fork and clone this repository
2. Install dependencies with `yarn`
3. Install dependencies and Build the app run `yarn build:browser`
4. Start the application with `yarn start:browser` in another terminal window.
5. Navigate to the given link in the terminal

For developers: Instead of using the build command, you can use the watch command to see real-time changes. Run `yarn watch:electron` for electron and for browser `yarn watch:browser` instead of the build command and execute the start command simultaneously.
