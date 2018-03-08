/**
 * Console log object for debug purposes
 */
const log = {
    enabled: true,
    info: function (message) {
        if (this.enabled)
            console.info(`[SIMPL] ${message}`)
    },
    warn: function (message) {
        if (this.enabled)
            console.warn(`[SIMPL] ${message}`)
    },
    error: function (message) {
        if (this.enabled)
            console.error(`[SIMPL] ${message}`)
    }
}

module.exports = log