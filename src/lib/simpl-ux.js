const ux = {
    original: '',
    disable: function () {
        this.original = document.body.style.display;
        document.body.style.display = 'none';
    },
    enable: function () {
        document.body.style.display = this.original
    }
}
module.exports = ux