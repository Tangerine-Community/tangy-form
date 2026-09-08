// Karma harness for tangy-form. LOCAL DEVELOPMENT ONLY.
//
// Replaces web-component-tester, which the "test": "polymer test -l chrome" script still names.
// WCT needs polymer-cli 1.x and an ancient Selenium; on modern Node it does not install at all, so
// nothing in test/ had been runnable. Karma + mocha's TDD interface keeps the suite()/test()/assert()
// vocabulary the existing tests are written in, so those specs port over almost verbatim.
//
// esbuild does the bundling because every component imports bare specifiers
// ('@polymer/polymer/polymer-element.js'), which a browser cannot resolve on its own.
//
// Nothing here ships: every package it needs is a devDependency, and npm does not install a
// dependency's devDependencies, so a Tangerine client install and the container image never see
// them. Requires a local Chrome — set CHROME_BIN if karma-chrome-launcher cannot find it.

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['mocha'],

    files: [
      // The custom-element polyfills the components assume, ahead of any spec.
      {
        pattern: 'node_modules/@webcomponents/webcomponentsjs/webcomponents-bundle.js',
        watched: false,
      },
      // tangy-form.js reads a global Redux (tangy-form.js:452). Every WCT page loaded this same
      // file as a plain <script>, so the global is part of the environment the components were
      // written against, not something the specs invent.
      { pattern: 'node_modules/redux/dist/redux.js', watched: false },
      { pattern: 'test/**/*.spec.js', type: 'module', watched: true },
      // Fixture JSON and stub assets some components fetch at runtime.
      { pattern: 'test/*.json', included: false, served: true, watched: false },
      { pattern: 'test/assets/**', included: false, served: true, watched: false },
    ],

    preprocessors: {
      'test/**/*.spec.js': ['esbuild'],
    },

    esbuild: {
      target: 'es2020',
      define: { 'process.env.NODE_ENV': '"test"' },
    },

    reporters: ['mocha'],
    mochaReporter: { output: 'full', showDiff: true },

    // TDD interface: suite() and test(), matching how test/*_test.html were written.
    client: {
      mocha: { ui: 'tdd', timeout: 10000 },
      captureConsole: false,
    },

    browsers: ['ChromeHeadlessNoSandbox'],
    customLaunchers: {
      ChromeHeadlessNoSandbox: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage'],
      },
    },

    port: 9877,
    colors: true,
    autoWatch: false,
    singleRun: true,
    concurrency: 1,
    browserNoActivityTimeout: 60000,
  });
};
