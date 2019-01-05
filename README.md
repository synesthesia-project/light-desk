# Synesthesia Project Light Desk

[![Total alerts](https://img.shields.io/lgtm/alerts/g/synesthesia-project/light-desk.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/synesthesia-project/light-desk/alerts/) [![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/synesthesia-project/light-desk.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/synesthesia-project/light-desk/context:javascript) [![Build Status](https://dev.azure.com/synesthesia--project/synesthesia/_apis/build/status/light-desk%20builds?branchName=master)](https://dev.azure.com/synesthesia--project/synesthesia/_build/latest?definitionId=1?branchName=master) [![](https://img.shields.io/npm/v/@synesthesia-project/light-desk.svg)](https://www.npmjs.com/package/@synesthesia-project/light-desk)

A Node.js library for creating control panels for controlling lighting and other things

This project is very much a work in progress!

![Screenshot](docs/screenshot.png)

## Installation

You can install this library from NPM:

```
$ npm install @synesthesia-project/light-desk
```

or

```
$ yarn add @synesthesia-project/light-desk
```

Alternatively, you can add this repository as a submodule to your repo, and add a symlink from `node_modules/@synesthesia-project/light-desk` to the location of that submodule within your repo to use in-development versions, and if you want to contribute, such as what's done in the [synesthesia-project/synesthesia](https://github.com/synesthesia-project/synesthesia) repo.

## Usage

```js
const lightDesk = require('@synesthesia-project/light-desk');

function buttonPressed() {
  console.log("The button was pressed!");
}

const desk = new lightDesk.LightDesk();

// Create the root "group" for your desk, which new components can be added to
const group = new lightDesk.Group();
desk.setRoot(group);

// Create a button that calls buttonPressed(),
const button = new lightDesk.Button("Hello World");
group.addChild(button);
button.addListener(buttonPressed);
```

See the [examples](https://github.com/synesthesia-project/light-desk/tree/master/examples) directory for full examples.

## Typescript

If you use typescript for your project, types for this module when you import should work automatically. There is no need to install a specific `@types/X` package etc... as they are included in the `@synesthesia-project/light-desk` package.

