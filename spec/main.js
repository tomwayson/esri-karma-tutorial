(function(window) {
  'use strict';

  var allTestFiles = [];
  var TEST_REGEXP = /.*Spec\.js$/;

  for (var file in window.__karma__.files) {
    if (TEST_REGEXP.test(file)) {
      allTestFiles.push(file);
    }
  }

  window.dojoConfig = {
    packages: [
      // local pacakges to test
      {
          name:"esri-utils",
          location:"/base/src/esri-utils"
      },

      // esri/dojo packages
      {
        name: 'dgrid',
        location: 'http://js.arcgis.com/3.20/dgrid'
      }, {
        name: 'dijit',
        location: 'http://js.arcgis.com/3.20/dijit'
      }, {
        name: 'esri',
        location: 'http://js.arcgis.com/3.20/esri'
      }, {
        name: 'dojo',
        location: 'http://js.arcgis.com/3.20/dojo'
      }, {
        name: 'dojox',
        location: 'http://js.arcgis.com/3.20/dojox'
      }, {
        name: 'put-selector',
        location: 'http://js.arcgis.com/3.20/put-selector'
      }, {
        name: 'util',
        location: 'http://js.arcgis.com/3.20/util'
      }, {
        name: 'xstyle',
        location: 'http://js.arcgis.com/3.20/xstyle'
      }, {
        name: 'moment',
        location: 'http://js.arcgis.com/3.20/moment',
      }
    ],
    async: true
  };


  /**
   * This function must be defined and is called back by the dojo adapter
   * @returns {string} a list of dojo spec/test modules to register with your testing framework
   */
  window.__karma__.dojoStart = function() {
    return allTestFiles;
  };
})(window);
