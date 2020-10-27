# Calithon Spooktacular Layouts

## Prerequisites

You will need to install [NodeJS](https://nodejs.org) and [NodeCG](https://nodecg.com/docs/installing). I recommend installing the NodeCG CLI globally with npm:

```bash
npm install --global nodecg-cli
```

## Installation

Create a new directory. Inside the new directory, run the NodeCG setup:

```bash
nodecg setup
```

Next, install the following NodeCG bundles, checking out the correct branch for Calithon Spooktacular:

```bash
nodecg install speedcontrol/nodecg-speedcontrol
nodecg install bashprime/calithon-nodecg-layouts
cd bundles/calithon-nodecg-layouts
git checkout calithon-spooktacular
cd ../..
```

You can optionally generate default config files for the bundle:

```bash
nodecg defaultconfig nodecg-speedcontrol
```

## Running the application

In the directory where you ran `nodecg setup`, run the following:

```bash
nodecg start
```

This will start a Node server on `localhost:9090`, which you can access in your web browser.