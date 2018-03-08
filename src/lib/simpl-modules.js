const Modules = {
    available: [],
    loaded: [],
    has: function (element) {
        return this.available.indexOf(element.nodeName.toLowerCase()) > -1
    },
    loadedCount: function () { return this.loaded.length },
    add: function (Module) {
        this.loaded.push(Module)
    },
    inCache: function (moduleName) {
        for (var i = 0; i < this.loaded.length; i++) {
            if (this.loaded[i].type == moduleName)
                return this.loaded[i]
        }
        return undefined
    },
    list: function(){
        return this.available.join(',')
    }
}

module.exports = Modules;