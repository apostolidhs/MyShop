# MyShop

**MyShop** is a case study application for modern frontend web pages.

Technologies used: require.js, backbone.js, underscore.js, jquery, bootstrap, less, mocha, chai, gulp

Gulp build plugins like livereload, autoprefix, uglify and many more. 

## Install

### Requirements

In order to build the application the following tools are required:
node.js, npm, bower, and gulp

For bower and gulp you'll need to execute:

```
npm install -g gulp
npm install -g bower
```

### Build

Run the following commands in the project root:

1. `npm install`
2. `bower install`
3. `gulp build`

### Run

#### Development version

Execute

```
> gulp develop
```

The page is served at http://localhost:3000/

*development version served from server due to cross-origin errors*

#### Production version

Once the build task is run the production version will be in `dist/index.html`

## Testing framework

Mocha with chai are used as a testing framework
  
### Executing tests
Execute

```
> gulp develop
```

The test page is served at http://localhost:3000/test
