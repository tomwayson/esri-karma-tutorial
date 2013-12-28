# Esri Karma Tutorial

If you're building web mapping apps using the [ArcGIS API for JavaScript](https://developers.arcgis.com/en/javascript/), and need a way to automate running your unit tests, this tutorial will show you how using the [Karma test runner](http://karma-runner.github.io/) and [Jasmine](http://pivotal.github.io/jasmine/) BDD-style testing framework.

<!-- TODO: add link to gh-pages
[View it live]()
 -->
<!-- TODO: add app screenshot -->
<!--![App]()-->

If you (don't already know and) want to know why Karma is so awesome, I suggest watching this video, starting at the point where the frist tests are run:

http://youtu.be/MVw8N3hTfCI?t=3m44s

In a nut shell, Karma:
* serves up your app and test files in a local web server, which includes a reverse-proxy to prevent cross-origin requestes
* launch one or more browsers pointing to above web server and runs your tests
* watches for changes in your source and test files and re-run all your tests as soon as you save a file
* works with most popular testing frameworks (Jasmine, Mocha, Qunit)
* works with AMD (Require.js and Dojo) code
* is easy to intall and configure w/ NPM

This tutorial demonstrates the configuration settings to get Karma running Jasmine BDD-style tests on code that relies on the ArcGIS API for JavaScript.

[Jasmine](http://pivotal.github.io/jasmine/) is a popular and simple BDD-style JavaScript testing framework. Details on using Jasmine can be found at the [Jasmine Wiki]
(https://github.com/pivotal/jasmine/wiki).

## Development Instructions

1. Clone the repo: `git clone https://github.com/tomwayson/esri-karma-tutorial`
2. Go to local copy of repo: `cd esri-karma-tutorial`
3. Install Node (if not already installed) from [http://nodejs.org/](http://nodejs.org/)
4. Install Karma (if not already installed) `npm install karma -g`
5. Install development dependencies (Karma plugins for Jasmine, Dojo, browsers, etc): `npm install`
6. Run my tests: `karma start karma.conf.js` or just `karma start`
7. Add your own specs and code under `/spec` and `/src` and let karma run your tests for you!

### Testing in Additional Browsers
You can test in additional browsers by adding the names of each in the `browsers` section of `karma.conf.js`. Note that you may need to first set the path to each in an environment vairable, for example:
```
set FIREFOX_BIN="c:\Program Files (x86)\Mozilla Firefox\firefox.exe"
```
See the [Browsers page of the Karma documentation](http://karma-runner.github.io/0.8/config/browsers.html) for more information.

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
            location: 'http://js.arcgis.com/3.6/js/esri'
        }, {
            name: 'dojo',
            location: 'http://js.arcgis.com/3.6/js/dojo/dojo'
        }, {
            name: 'dojox',
            location: 'http://js.arcgis.com/3.6/js/dojo/dojox'
        }, {
            name: 'dijit',
            location: 'http://js.arcgis.com/3.6/js/dojo/dijit'
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
