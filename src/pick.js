;(function () {

    //= require 'lib.js'

    if (typeof module == 'object') {
		module.exports = lib.pick;
	} else {
		window.pick = lib.pick;
	}
})();