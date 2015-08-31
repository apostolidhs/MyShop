# MyShop

**MyShop** is a study case application for modern frontend web pages.

Technologies used: require.js, backbone.js, underscore.js, jquery, bootstrap, less, mocha, chai, gulp

Gulp build principals like livereload, autoprefix, uglify and many more. 


## Install

### Requirements
  In order to build the application the following tools required:
  node.js, npm, bower

### Build
  run the following commands in the root of the project:

  1. npm install
  2. bower install
  3. gulp build

### Run

#### Development version
  execute
  ```
  >gulp develop
  ```
  The page served at http://localhost:3000/
  
  *develop version served from server due to cross-origin errors*

#### Production version
  dist/index.html 

## test framework
  Mocha with chai used as test framework
  
###  execute tests
  Execute
  ```
  >gulp develop
  ```
  The test page served at http://localhost:3000/test
