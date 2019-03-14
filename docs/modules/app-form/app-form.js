'use strict';

function logic() {
    this.onLoad = function () {
        simpl.log.info(`${this.Module.type}(${this.Module.id}) loaded.`)
    }
    this.events = [
        { 'event': 'load', action: this.onLoad }
    ]
}

module.exports = function () {
    return new logic();
}