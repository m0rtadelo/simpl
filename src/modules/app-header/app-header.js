'use strict';
const simpl = require('../../lib/simpl').simpl;

function logic() {
    this.keyPress = function(event){
        if(event.keyCode == 13)
            this.add();
    }
    this.add = function () {
        const input = simpl.getElementById(this, 'name')
        if (input.value.length > 0) {
            var tasklist = document.createElement('app-list');
            tasklist.setAttribute('title', input.value)
            document.getElementById('todoContainer').appendChild(tasklist)
            simpl.render(tasklist)
            input.value = ''
        }
        else {
            alert("Name must be set!")
            input.focus()
        }
    }
    this.clean = function(){
        document.getElementById('todoContainer').innerHTML = ''
        simpl.getElementById(this, 'name').focus();
    }
}

module.exports = function () {
    return new logic();
}