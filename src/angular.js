angular
.module('PickModule', [])
.factory('lib', [function () {
	
	//= require 'lib.js'

	return lib
}])
.factory('pick', ['lib', function (lib) {	
    return lib.pick;
}])
.factory('unpick', ['lib', function (lib) {	
    return lib.unpick;
}]);
