# Esri Karma Tutorial

If you're building web mapping apps using the [ArcGIS API for JavaScript](https://developers.arcgis.com/en/javascript/), and need a way to automate running your unit tests, this tutorial will show you how using the [Karma test runner](http://karma-runner.github.io/) and [Jasmine](http://pivotal.github.io/jasmine/) BDD-style testing framework.

<!-- TODO: add link to gh-pages
[View it live]()
 -->
<!-- TODO: add app screenshot -->
<!--![App]()-->

If you (don't already know and) want to know why Karma is so awesome, I suggest watching this video, starting at the point where the first tests are run:

http://youtu.be/MVw8N3hTfCI?t=3m44s

In a nut shell, Karma:
* is easy to intall and configure w/ NPM
* serves up your app and test files in a local web server, which includes a reverse-proxy to prevent cross-origin requests
* launches one or more browsers pointing to above web server and runs your tests
* watches for changes in your source and test files and re-runs all your tests as soon as you save a file
* works with most popular testing frameworks (Jasmine, Mocha, Qunit)
* works with AMD (Require.js and Dojo) code
* can generage code coverage reports and much more via plugins

This tutorial demonstrates the configuration settings to get Karma running Jasmine BDD-style tests on code that relies on the ArcGIS API for JavaScript.

[Jasmine](https://github.com/pivotal/jasmine) is a popular and simple BDD-style JavaScript testing framework. Details on using Jasmine can be found at the [Jasmine Wiki]
(http://jasmine.github.io/).

**NOTE:** The current release of this tutorial runs on Jasmine 2.0 and uses  `done()` style async testing. If you want to use this tutorial with existing specs written for Jasmine 1.x (i.e. using the deprecated `runs()` and `waitsFor()` async syntax), you can check out the [v0.1.0 release](https://github.com/tomwayson/esri-karma-tutorial/releases/tag/v0.1.0) of this tutorial.


## Running the Tests

1. Clone the repo: `git clone https://github.com/tomwayson/esri-karma-tutorial`
2. Go to local copy of repo: `cd esri-karma-tutorial`
3. Install Node (if not already installed) from [http://nodejs.org/](http://nodejs.org/)
4. Install Karma (if not already installed) `npm install karma-cli -g`
5. Install development dependencies (Karma plugins for Jasmine, Dojo, browsers, etc): `npm install`
6. Run my tests: `karma start karma.conf.js` or just `karma start`
7. Add your own specs and code under `/spec` and `/src` and let karma run your tests for you!

## Tutorial

This tutorial walks you through configuring Karma to use additional plugins to run tests in additional browsers, use spies and fakes, generate code coverage reports, and integrate with generic task runners like Grunt.

To view the completed tutorial, run the following at the command line:
```bash
git checkout completed-tutorial
npm install
```

### Testing in Additional Browsers

Testing in additional browsers with Karma is a breeze. For each browser you want to test in you simply:

1. Install the browser launcher*
2. Add the browser name in the `browsers` section

For example, to run tests in FireFox as well as Chrome:
```bash
npm install karma-firefox-launcher --save-dev
```
After insalling the plugin, update the `browsers` section of `karma.conf.js`:
```js
    browsers: ['Chrome', 'Firefox'],
```

Re-run Karma and you should see your tests run in both Chrome and Firefox.

*Note that you may need to first set the path to the browser's executable in an environment vairable.
```bash
set FIREFOX_BIN="c:\Program Files (x86)\Mozilla Firefox\firefox.exe"
```

See the [Browsers page of the Karma documentation](http://karma-runner.github.io/0.12/config/browsers.html) for more information.

### Testing in Internet Explorer and Emulating Older Versions

If you are unlucky enough to have to support Internet Explorer, especially older versions, then you will want to run you tests in those environments as well.

To run tests in Internet Explorer:
```bash
npm install karma-ie-launcher --save-dev
```
After insalling the plugin, update the `browsers` section of `karma.conf.js`:
```js
    browsers: ['Chrome', 'IE'],
```

Re-run Karma and you should see your tests run in both Chrome and Internet Explorer.

Karma can also launch Internet Explorer in emulation mode to simulate running tests in older versions of Internet Explorer. To do that, add the following section to `karma.conf.js`:
```js
    // custom browser configurations
    // to emulate older versions of IE
    customLaunchers: {
      // emulate IE8
      IE8: {
        base: 'IE',
        'x-ua-compatible': 'IE=EmulateIE8'
      },
      // emulate IE9
      IE9: {
        base: 'IE',
        'x-ua-compatible': 'IE=EmulateIE9'
      },
      // emulate IE10
      IE10: {
        base: 'IE',
        'x-ua-compatible': 'IE=EmulateIE10'
      }
    },
```

Then update the `browsers` section of `karma.conf.js` with the versions you want to test in:
```js
    browsers: ['Chrome', 'IE', 'IE10', 'IE9', 'IE8'],
```

Re-run Karma and you should see your tests run in both Chrome and all the versions of Internet Explorer that you specified.

See the [Karma IE launcher documentation](https://github.com/karma-runner/karma-ie-launcher) for more information.

### Going Headless with PhantomJS

If you prefer to not have Karma spawn several browser windows while you are coding you can have Karma run your tests in a "headless" browser such as [PhantomJS](http://phantomjs.org/).

```bash
npm install karma-phantomjs-launcher --save-dev
```
After insalling the plugin, update the `browsers` and `plugins` sections of `karma.conf.js`:
```js
    browsers: ['PhantomJS'],
```

Re-run Karma and you should see your tests run in PhantomJS.

See the [Browsers page of the Karma documentation](http://karma-runner.github.io/0.12/config/browsers.html) for more information.

### Spies, Fakes, and Mocks

You can use spies, fakes, and mocks from [Sinon.js](http://sinonjs.org/) in your tests by installing the [karma-sinon](https://www.npmjs.com/package/karma-sinon) plugin:
```bash
npm install karma-sinon --save-dev
```

After insalling the plugin, add `'sinon'` to the list of `frameworks` in `karma.conf.js` as follows:
```js
    frameworks: ['jasmine', 'dojo', 'sinon'],
```

For an example of how to use Sinon.js's fake server to test code that generates an XHR request without actually makeing the XHR request, add the following test suite to `specs/imageServiceUtilsSpec.js`:

```js
  describe('item info tests', function() {
    var server;

    beforeEach(function() {
      server = sinon.fakeServer.create();
    });

    afterEach(function() {
      server.restore();
    });

    it('should request item info', function(done) {
      var imageServiceUrl = '/not/a/real/url/ImageServer';
      // var imageServiceUrl = 'http://imagery.arcgisonline.com/arcgis/rest/services/LandsatGLS/GLS2010_Enhanced/ImageServer';
      var dummyResponse = {
        result: 'success'
      };

      // hijack any HTTP requests to item info end point
      server.respondWith('GET',
        imageServiceUrl + '/info/iteminfo?f=json',
        [200, { 'Content-Type': 'application/json' }, JSON.stringify(dummyResponse) ]);

      // call get item info and have fake server respond
      imageServiceUtils.getItemInfo(imageServiceUrl).then(function(response) {
        // success
        expect(response).toEqual(dummyResponse);
        done();
      }, function(err) {
        expect(err).toBeNull(null);
        done();
      });

      // respond to any matching request
      server.respond();
    });
  });
```

See the [Sinon.js](http://sinonjs.org/) documentation for more ways to use Sinon to help you spy on or fake your modules' dependencies.

### Code Coverage

You can get [Istanbul](https://github.com/yahoo/istanbul) code coverage reports for your tests by installing the [karma-coverage](https://github.com/karma-runner/karma-coverage) plugin:

```bash
npm install karma-coverage --save-dev
```

After insalling the plugin, uncomment the coverage related lines in the `preprocessors`, `reporters`, and `coverageReporter`, sections of `karma.conf.js` and run karma.

See the [karma-coverage](https://github.com/karma-runner/karma-coverage) plugin README for more information.

### Calling Karma from Grunt

Often you'll want to run your tests as part of some workflow (like a build). Futhermore, in that workflow, you may want to override your default test configuration settings, such as which browsers to use, or to only run the tests once. The steps below show how to use [Grunt](http://gruntjs.com/) to run tests using Karma's default configuration from above with the exception that the tests will only run one time.

If you don't already have the [Grunt CLI](http://gruntjs.com/getting-started) installed globally, run this:
```bash
npm install -g grunt-cli
```
Then install a local grunt and the karma plugin for grunt in this repo:
```bash
npm install grunt --save-dev
npm install grunt-karma --save-dev
```
Then add `gruntfile.js` at the repo's root folder with the following configuration:
```js
module.exports = function(grunt) {

  grunt.initConfig({
    karma: {
      // common options for all targets
      options: {
        // use Karma's defaults
        configFile: 'karma.conf.js'
      },
      // options for the build target
      build: {
        // test in real browsers once beofre build
        browsers: ['Chrome', 'Firefox'],
        singleRun: true
      }
    }
  });

  grunt.loadNpmTasks('grunt-karma');

  grunt.registerTask('default', ['karma']);
};
```
Finally run Karma from Grunt with:
```bash
grunt karma
```

Another common scenario is when you want to use Grunt's [watch](https://www.npmjs.com/package/grunt-contrib-watch) task to listen for file changes and then run the tests in Karma as a step (i.e. after jshint). In this case you'd add another target (i.e. `dev`) above and configure it to [run karma in background mode and have a watch target run the tests](https://www.npmjs.com/package/grunt-karma#karma-server-with-grunt-watch).

See the [Grunt](http://gruntjs.com/getting-started) and [grunt-karma](https://www.npmjs.com/package/grunt-karma) documentaion for more information.

### Other Test Frameworks

This repo shows you how to use Karma to run unit tests using the Jasmine test framework, but Karma can be used with other test frameworks. For an example of how to use Karma to run [Mocha](http://visionmedia.github.io/mocha/) tests with the [ArcGIS API for JavaScript](http://js.arcgis.com), see:

https://github.com/Esri/landscape-modeler-js

## How It Works

This tutorial relies on the [karma-dojo plugin](https://github.com/karma-runner/karma-dojo) which enables testing of AMD style Dojo code.

After insalling and configuring the plug in, the trick is to set the `dojoConfig` in main.js to use the [ArcGIS API for JavaScript](http://js.arcgis.com) for the Dojo and Esri packages as follows:

```
var dojoConfig = {
    packages: [
        // local pacakges to test
        {
            name:"esri-utils",
            location:"/base/src/esri-utils"
        },
        // hosted packages
        {
            name: 'esri',
            location: 'http://js.arcgis.com/3.13/esri'
        }, {
            name: 'dojo',
            location: 'http://js.arcgis.com/3.13/dojo'
        }, {
            name: 'dojox',
            location: 'http://js.arcgis.com/3.13/dojox'
        }, {
            name: 'dijit',
            location: 'http://js.arcgis.com/3.13/dijit'
        }
    ],
    async: true
};

```

## Requirements

### Dependencies

* [ArcGIS API for JavaScript](http://js.arcgis.com): built/tested on v3.6 and updated to latest; may work w/ earlier versions.

And the latest versions of:
* [Node](http://nodejs.org/)
* [Karma](http://karma-runner.github.io/)
* [Jasmine](http://pivotal.github.io/jasmine/)
* [karma-dojo](https://github.com/karma-runner/karma-dojo)

## Resources
* [ArcGIS for JavaScript API](https://developers.arcgis.com/en/javascript/)
* [Karma](http://karma-runner.github.io/)
* [Configuring karma-dojo](https://github.com/garcimouche/karma/tree/feature-328/test/e2e/dojo)
* [Jasmine](http://pivotal.github.io/jasmine/)
* [Jasmine Wiki]
(https://github.com/pivotal/jasmine/wiki)
* [Node](http://nodejs.org/)
* [ArcGIS for Developers](http://developers.arcgis.com)
* [ArcGIS REST Services](http://resources.arcgis.com/en/help/arcgis-rest-api/)
* [@esri](http://twitter.com/esri)
* [Sinon.js](http://sinonjs.org/)

## Issues

Find a bug or want to request a new feature?  Please let us know by submitting an issue.

## Contributing

Please do! See CONTRIBUTING.md

## Credit

Largely inspired by:
* The blog post by [Dave Bouwman](https://github.com/dbouwman) on [Automated Headless Unit Tests with Esri JS API](http://blog.davebouwman.com/2013/07/26/automated-headless-unit-tests-with-esri-js-api/) using [Jasmine](http://pivotal.github.io/jasmine/), Grunt, and PhantomJS
* The tutorial by [David Spriggs](https://github.com/DavidSpriggs) on [using the intern with the ArcGIS API for JavaScript](https://github.com/DavidSpriggs/intern-tutorial-esri-jsapi) repo
* [Scott Davis](https://twitter.com/ScottAGRC) and [Rene Rubalcava](https://twitter.com/odoenet) who graciously share their outstanding ideas and code

## Licensing
Copyright 2013 Tom Wayson

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

A copy of the license is available in the repository's [license.txt]( https://raw.github.com/Esri/esri-leaflet/master/license.txt) file.

[](Esri Tags: ArcGIS Unit Testing Jasmine Karma)
[](Esri Language: JavaScript)
