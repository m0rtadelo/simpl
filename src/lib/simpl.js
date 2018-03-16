'use strict'

require("babel-core/register");
require("babel-polyfill");

const axios = require('axios')
const log = require('./simpl-log')
const Modules = require('./simpl-modules')
const ux = require('./simpl-ux')

const moduleHelper = {
    log: log,
    Modules: Modules,
    getElementById: function (module, id) {
        try {
            if (module.Module)
                return this.getById(module.Module.dom, id)
        } catch (error) {
            log.error("[getElement] " + error)
        }
    },
    render: function (element) {
        try {
            simpl.loadModule(element)
        } catch (error) {
            log.error("[render] " + error)
        }
    },
    getById: function (root, id) {
        return root.querySelectorAll('#' + id)[0];
    },
    remove: function (element) {
        try {
            element.parentNode.removeChild(element)
        } catch (error) {
            log.error("[remove] " + error)
        }
    }
}

const simpl = {
    /**
     * Iterate trough the DOM elements passed as Array.
     * IMPORTANT: the array list must be static not live. querySelectorAll = OK, getElementsByTagName = KO. See https://www.w3.org/TR/selectors-api/#queryselectorall
     * 
     * @param {Array} elements DOM elements to iterate trough
     */
    iterateHTML: async function (elements) {
        if (elements.length == 0) {
            log.info(`No detected Modules elements to iterate`)
            return
        }
        log.info(`Iterating ${elements.length} Modules elements...`)
        for (var i = 0; i < elements.length; i++) {
            if (Modules.has(elements[i]))
                await this.loadModule(elements[i])
        };
        log.info(`Iteration of ${elements.length} Modules elements done`)
    },
    setModule: function(element){

    },
    /**
     * Loads and renders the element module. If exist in caché doesn't request again
     */
    loadModule: async function (element) {
        const moduleName = element.nodeName.toLowerCase()
        let cModule = Modules.inCache(moduleName)
        let Module = {}
        if (cModule == undefined) {
            log.info(`Loading module ${moduleName}...`)
            Module = await this.requestModule(moduleName)
        } else {
            log.info(`Loading module ${moduleName} (from caché)...`)
            Module.factory = cModule.factory
            Module.html = cModule.html
            Module.css = cModule.css
        }
        Module.type = moduleName
        try {
            Module.js = Module.factory()
        } catch (error) {
            log.error(error + " Binding JS!")
            Module.js = {}
        }
        Module.id = Modules.loadedCount()
        Module.attributes = element.attributes
        Module.dom = element
        Module.js.Module = Module
        Modules.add(Module)

        // injecting HTML code into DOM module
        if (Module.css != undefined)
            element.innerHTML = '<style>' + Module.css + '</style>' + Module.html
        else
            element.innerHTML = Module.html;
        await this.iterateHTML(element.querySelectorAll(Modules.list()))
        // Adding events listeners to DOM elements
        try {
            if (Module.js != undefined && Module.js.events) {
                for (let h = 0; h < Module.js.events.length; h++) {
                    if (Module.js.events[h].event == 'load')
                        Module.js.events[h].action.bind(Module.js)()
                    const select = element.querySelectorAll('#' + Module.js.events[h].id);
                    for (let j = 0; j < select.length; j++)
                        select[j].addEventListener(Module.js.events[h].event, Module.js.events[h].action.bind(Module.js));
                }
            }
        } catch (error) {
            log.error(moduleName + ' ' + error)
        }
        // Adding more listeners (html method)
        let elements = element.querySelectorAll('*')
        for(var i=0;i<elements.length;i++){
            for(var j=0;j<elements[i].attributes.length;j++){
                const attribute = elements[i].attributes[j]
                if(attribute.nodeName.startsWith('event.') && attribute.nodeValue.length > 0){
                    elements[i].addEventListener(attribute.nodeName.substring(6),Module.js[attribute.nodeValue].bind(Module.js))
                    attribute.nodeValue = "";
                }
            }
        }
        log.info(`Module ${moduleName} loaded`)
    },
    requestModule: async function (moduleName) {
        log.info(`<${moduleName}> HTML, CSS and JS request...`)
        let Module = {}
        try {
            Module.html = (await axios.get(`../modules/${moduleName}/${moduleName}.html`)).data
            log.info(`<${moduleName}> HTML loaded`)
            Module.css = (await axios.get(`../modules/${moduleName}/${moduleName}.css`)).data
            log.info(`<${moduleName}> CSS loaded`)
        } catch (error) {
            //log.error(error)
        }
        try {
            Module.factory = await System.import(`../modules/${moduleName}/${moduleName}.js`)
            log.info(`<${moduleName}> JS loaded`)
        } catch (error) {
            log.error(error)
        }
        return Module
    }
}

/**
 * SIMPL Library - public function
 */
const library = {
    init: async function (availableModules) {
        log.info("init started, loading modules...")
        if (availableModules != undefined && availableModules.length > 0) {
            //ux.disable()
            window.simpl = moduleHelper
            Modules.available = availableModules
            log.info(`${availableModules} available, iterating DOM and injecting modules...`)
            await simpl.iterateHTML(document.querySelectorAll(Modules.list()))
            //ux.enable()
        } else {
            log.warn("You must pass an argument with available Modules. Example: simpl.init(['app-tasklist','app-main'])")
        }
        log.info("init finished")
        console.log(Modules)
    }, getHelper: function () { return moduleHelper }
}
module.exports = library