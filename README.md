# Esri Karma Tutorial

A demonstration of how to use the Karma test runner to automatically run Jasmine BDD-style unit tests on your [ArcGIS API for JavaScript](https://developers.arcgis.com/en/javascript/) code.

TODO: more description

<!-- TODO: add link to gh-pages
[View it live]()
 -->
<!-- TODO: add app screenshot -->
<!--![App]()-->

## Development Instructions

1. Clone the repo: `git clone https://github.com/tomwayson/esri-karma-tutorial`
2. Go to local copy of repo: `cd esri-karma-tutorial`
3. Install Node (if not already installed) from [http://nodejs.org/](http://nodejs.org/)
4. Install Karma (if not already installed) `npm install karma -g`
5. Install development dependencies (Karma plugins for Jasmine, Dojo, browsers, etc): `npm install`
6. Run my tests: `karma start karma.config.js`
7. Add your own specs and code under /spec and /src and let karma run your tests for you!

## How It Works

TODO: how does it work?

## Requirements

### Dependencies

* [ArcGIS API for JavaScript](http://js.arcgis.com): built/tested on v3.6, may work w/ earlier versions.

And the latest versions of:
* [Node](http://nodejs.org/)
* [Karma](http://karma-runner.github.io/)
* [Jasmine](http://pivotal.github.io/jasmine/)
* [karma-dojo](https://github.com/karma-runner/karma-dojo)

## Resources
* [Node](http://nodejs.org/)
* [Karma](http://karma-runner.github.io/)
* [Jasmine](http://pivotal.github.io/jasmine/)
* [Configuring karma-dojo](https://github.com/garcimouche/karma/tree/feature-328/test/e2e/dojo)
* [ArcGIS for Developers](http://developers.arcgis.com)
* [ArcGIS REST Services](http://resources.arcgis.com/en/help/arcgis-rest-api/)
* [ArcGIS for JavaScript API](https://developers.arcgis.com/en/javascript/)
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
