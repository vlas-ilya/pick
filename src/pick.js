;(function () {

    //= require 'lib.js'

    if (typeof module == 'object') {
		module.exports = {
            pick: lib.pick,
            unpick: lib.unpick
        };
	} else {
        window.pick = lib.pick;
        window.unpick = lib.unpick;
	}
})();