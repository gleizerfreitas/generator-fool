## FOOL! A Yeoman Generator

FOOL is a Yeoman generator for simple websites using Gulp 4 with the Pug templating system and Sass to transpile styles.

*Gleizer, jul 2019*

## Requirements

* NodeJS (https://nodejs.org/en/)
* Yeoman (https://yeoman.io/)

For Yeoman, open a **command-line** and type the following to globally install (`-g`) the above required NPM components:

	npm install -g yo

## Install

Download this repo and run the command below to **globally** install this generator.

	npm install -g [PATH]/generator-fool

## Check

Fool generator should be listed when you type:

	npm ls -g --depth=0

## Use

Create a new directory where you'll use this generator as a starting point for a new project. Enter your directory and type:

	yo fool

You will be greated by Yeoman and he will ask you some basic questions regarding your new project. 

Finally a web browser will open with `http://localhost:3000`. In the background Gulp is watching for changes to the following files:

* *.pug
* *.scss
* *.js
* *.img

When any of these change Gulp will compile / copy over those changes from the `src/` to the `dist/` directory and refresh the web browser.

## Stopping and continuing working on this web site

When your working with this setup, Gulp is running as described above, and want to quit your local development, do the following.

### Stop Gulp from watching

In the still running **command-line window** (Terminal or MS-DOS prompt) hit `ctrl + c` and type `y`. This will stop Gulp from watching, compiling and serving the `dist/` directory to `http://localhost:3000` in the web browser. The web site no longer works in your web browser.

### Start Gulp watching and serving the web site again

To continue working on your site open a **command-line window** (Terminal or MS-DOS prompt) and make sure you `cd` into the directory where the `Gulpfile.js` resides and type:

	gulp build

## Updating

If this Yeoman generator is updated you can update your globally installed version with the newer version by just reinstalling it again.

	npm install -g [PATH]/generator-fool

## Removing

Optionally: If you want to remove this globally installed Yeoman generator you need to **unlink** it. Open a **command-line window** (Terminal or MS-DOS prompt) and type:

	npm uninstall -g generator-fool
