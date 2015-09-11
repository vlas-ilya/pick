(function () {

    //= require 'lib.js'

    if (typeof define == 'function' && define.amd) {
        define('pick', [], function() {
            return {
                pick: lib.pick,
                unpick: lib.unpick
            };
        });
    }
})();