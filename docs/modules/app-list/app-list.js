'use strict';
const simpl = require('../../lib/simpl').simpl;

function logic() {
    this.KeyPress = function(event){
        if(event.keyCode == 13)
            this.btClick();
    }
    this.btClose = function(){
        simpl.remove(this)
    }
    this.itemClick = function(item){
        if(item.target.checked)
            item.target.parentNode.style.textDecoration="line-through"
        else
            item.target.parentNode.style.textDecoration=""
    }
    this.btClick = function () {

        // Linking dom elements of this module
        var input = simpl.getElementById(this, 'txtItem')
        var list = simpl.getElementById(this, 'list')

        if(input.value.length==0){
            alert("You must enter a value!")
            input.focus();
            return;
        }
        // Creating <li> element
        var li = document.createElement('li');
        var check = document.createElement('input')
        check.type='checkbox'
        li.appendChild(check)
        li.appendChild(document.createTextNode(input.value));

        // Adding <li> to <ul>
        list.appendChild(li)

        // reset input
        input.value = '';
        input.focus();
    }
    this.onLoad = function () {
        simpl.log.info(`${simpl.getModule(this).type}(${simpl.getModule(this).id}) loaded.`)
        simpl.getElementById(this, 'txtItem').focus();
        simpl.getElementById(this,'title').appendChild(document.createTextNode(simpl.getModule(this).attributes['title'].value));
    }
    this.events = [
        //{ 'event': 'click', 'id': 'button', 'action': this.btClick },  <- Added with html method
        { 'event': 'click', 'id': 'close', 'action': this.btClose },
        { 'event': 'keypress', 'id': 'txtItem', 'action': this.KeyPress },
        { 'event': 'load', action: this.onLoad }
    ]
}

module.exports = function () {
    return new logic();
}