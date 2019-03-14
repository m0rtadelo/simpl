exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['todo-spec.js'],
    multiCapabilities: [
        {
            browserName: 'firefox'
        },
        {
            browserName: 'chrome'
        }/*,
        {
            browserName: 'internet explorer',
            'platform': 'ANY',
            'version': '11'
        },
        {
            browserName: 'internet explorer',
            'platform': 'ANY',
            'version': '9'
        }/*,
        {
            browserName: 'edge'
        },
        {
            browserName: 'chrome',
            // List of devices https://cs.chromium.org/chromium/src/chrome/test/chromedriver/chrome/mobile_device_list.cc
            'deviceName': 'Google Nexus 5'
        },
        {
            browserName: 'chrome',
            'deviceName': 'Apple iPhone 6'
        },
        {
            browserName: 'chrome',
            'deviceName': 'Apple iPad'
        },
        {
            browserName: 'chrome',
            'deviceName': 'Samsung Galaxy S4'
        }*/
    ],
    localSeleniumStandaloneOpts : {
        jvmArgs : ["-Dwebdriver.ie.driver=node_modules/protractor/node_modules/webdriver-manager/selenium/IEDriverServer3.11.1.exe"]
      },
    maxSessions: 4
};