module.exports = function(config) {
  config.set({
    // base path, that will be used to resolve files and exclude
    basePath: '',

    frameworks: ['jasmine', 'dojo'],

    // list of files / patterns to load in the browser
    files: [
      'spec/main.js',

      // all the sources, tests
      {pattern: 'src/**/*.js', included: false},
      {pattern: 'spec/*.js', included: false}
    ],


    // test results reporter to use
    // possible values: dots || progress
    reporters: ['dots'],


    // web server port
    port: 9876,

    // proxy for cross domain requests
    proxies:  {
      '/arcgis/': 'http://imagery.arcgisonline.com/arcgis/'
    },

    // cli runner port
    runnerPort: 9100,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari
    // - PhantomJS
    browsers: [
      'Chrome'
      // add the name of each additional browser you want to test in below
      // you may need to first set it's path in an environment vairable, for example:
      // set FIREFOX_BIN="c:\Program Files (x86)\Mozilla Firefox\firefox.exe"
      // see: http://karma-runner.github.io/0.8/config/browsers.html
      // , 'Firefox'
    ],

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false,

    plugins: [
      'karma-dojo',
      'karma-jasmine',
      'karma-chrome-launcher',
      'karma-firefox-launcher'
    ]
  });
};