'use strict';

function logic() {
    this.keyPress = function(event){
        if(event.keyCode == 13)
            this.add();
    }
    this.add = function () {
        const input = simpl.getElement(this, 'name')
        if (input.value.length > 0) {
            var td = document.createElement('app-list');
            td.setAttribute('title', input.value)
            document.getElementById('todoContainer').appendChild(td)
            simpl.render(td)
            input.value = ''
        }
        else {
            alert("Name must be set!")
            input.focus()
        }
    }
    this.clean = function(){
        document.getElementById('todoContainer').innerHTML = ''
        simpl.getElement(this, 'name').focus();
    }
}

module.exports = function () {
    return new logic();
}