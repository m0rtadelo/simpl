
describe('Check init status', function () {

    it('should open the test page with title SIMPL', function () {
        browser.driver.get('http://localhost:8080');
        expect(browser.driver.getTitle()).toEqual('SIMPL');
    });

    it('should have a single Task named <Task list>', function () {
        browser.waitForAngularEnabled(false);
        browser.get("http://localhost:8080");
        browser.wait(function () {
            return element(by.id('footer')).isPresent();
        }, 1000);
        element.all(by.js(function () {
            return document.querySelectorAll('app-list');
        })).then(function (webElements) {
            expect(webElements.length).toBe(1);
            for (var i = 0; i < webElements.length; i++) {
                webElements[i].getText().then(function (text) {
                    expect(text.substring(0, 9)).toBe('Task list');
                })
            }
        });
    });
});
describe('Check user actions', function () {
    it('[Clean all] should clear properly all lists', function () {
        element.all(by.js(function () {
            document.getElementById("clean").click()
            return document.querySelectorAll('app-list');
        })).then(function (webElements) {
            expect(webElements.length).toBe(0);
        });
    });

});