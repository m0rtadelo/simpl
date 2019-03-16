/* eslint-disable func-names, no-param-reassign, no-console */
const path = require('path');
const MochaChrome = require("mocha-chrome");
const deepAssign = require("deep-assign");
// const simpl = require("../src/lib/simpl.js");
const chai = require('chai');
const { expect } = chai;

function test(options) {
  const url = `file://${path.join(__dirname, "/html", `${options.file}.html`)}`;
  const modules = options.modules;
  options = deepAssign(
    (options = {
      url,
      mocha: { useColors: false },
      ignoreConsole: true,
      ignoreExceptions: true,
      ignoreResourceErrors: true
    }),
    options
  );

  const runner = new MochaChrome(options);
  const result = new Promise((resolve, reject) => {
    runner.on("ready", () => {
        // simpl.init(modules);
    });
    runner.on("ended", stats => {
      resolve(stats);
    });

    runner.on("failure", message => {
      reject(message);
    });
  });

  (async function() {
    await runner.connect();
    await runner.run();
  })();

  return result;
}

var assert = require("assert");
describe("Load", async function() {
    it('should Load correctly', async () =>
    test({ file: 'test' }).then(({ passes, failures }) => {
      expect(passes).to.equal(3);
      expect(failures).to.equal(0);
    }));
});
