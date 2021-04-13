# Calithon Stand Strong Layouts

## Prerequisites

You will need to install [Git](https://git-scm.com/downloads), [NodeJS](https://nodejs.org) and [NodeCG](https://nodecg.com/docs/installing). I recommend installing the NodeCG CLI globally with npm:

```bash
npm install --global nodecg-cli
```

## Installation

Create a new directory. Inside the new directory, run the NodeCG setup:

```bash
nodecg setup
```

Next, install the following NodeCG bundles, checking out the correct branch for Calithon Gold Rush:

```bash
nodecg install nicnacnic/nodecg-speedcontrol
nodecg install bashprime/calithon-nodecg-layouts
cd bundles/calithon-nodecg-layouts
git checkout calithon-stand-strong
nodecg install
cd ../..
```

You will need to generate configuration files for Speed Control and the layouts bundle:

```bash
nodecg defaultconfig nodecg-speedcontrol
nodecg defaultconfig calithon-nodecg-layouts
```

You can optionally generate default config files for the bundle:

## Running the application

In the directory where you ran `nodecg setup`, run the following:

```bash
nodecg start
```

This will start a Node server on `localhost:9090`, which you can access in your web browser.
