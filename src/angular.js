var PickService = angular
.module('PickService', [])
.service('Pick', function () {
	//= require 'lib.js'
    this.pick = lib.pick;
});