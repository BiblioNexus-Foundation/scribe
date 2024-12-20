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

- [Node.js ^16.15.1](https://nodejs.org/en/)
- [YARN ^1.7.0 <2](https://yarnpkg.com/getting-started)

### Installation

NB: If you are cloning the repository on linux you might need to do the following:

ubuntu:

```
sudo apt-get update && sudo apt-get install libx11-dev libxkbfile-dev
```

For other distributions refer to documentation on how to download those above libraries.

To run the browser application:

1. Fork and clone this repository
2. Install dependencies with `yarn install`
3. Install dependencies and Build the app in development mode with `yarn run watch:browser`
4. Start the application(browser) with `cd applications/browser && yarn start` in another terminal window.
5. Open the browser and navigate to `http://localhost:3000`
