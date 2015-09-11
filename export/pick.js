var pick = (function () {
    'use strict';
    
    var lib = {};
    
    lib.comparator = function (a, b) {
        if (a == null || b == null) {
            return 0;
        }
        for (var i = 0; i < a.length && i < b.length; i++) {
            if (a[i] == undefined) {
                return -1;
            } else if (b[i] == undefined) {
                return 1;
            } else if (a[i] < b[i]) {
                return -1;
            } else if (a[i] > b[i]) {
                return 1;
            }
        }
        return 0;
    }
    
    lib.isEmpty = function (object) {
        if (object == undefined) {
            return true;
        }
        if ((object instanceof Array || typeof(object) === "string") && object.length == 0) {
            return true;
        }
        if (typeof(object) === "object" && Object.keys(object).length === 0) {
            return true;
        }
        return false;
    }
    
    lib.createPath = function (object, path) {
        var elem = path[0];
        if (elem == undefined) {
            return {};
        }
        if (object[elem] == undefined) {
            object[elem] = {};
        }
        lib.createPath(object[elem], path.slice(1))
    }
    
    lib.createPattern = function(fields) {
        var pattern = {};
        fields.map(function (field) { return field.split("."); })
              .sort(lib.comparator)
              .forEach(function (path) { lib.createPath(pattern, path); });
        return pattern;
    }
    
    lib.copyFields = function(from, to, field, pattern) {
        if (lib.isEmpty(pattern[field])) {
            to[field] = from[field];
        } else if (from[field] instanceof Array) {
            to[field] = [];
            for (var i = 0; i < from[field].length; i++) {
                to[field][i] = {};
                for (var key in pattern[field]) {
                    lib.copyFields(from[field][i], to[field][i], key, pattern[field]);
                }
            }
        } else if (from[field] instanceof Object) {
            to[field] = {};
            for (var key in pattern[field]) {
                lib.copyFields(from[field], to[field], key, pattern[field]);
            }
        }    
    }
    
    lib.removeFields = function(object, field, pattern) {
        if (lib.isEmpty(pattern[field])) {
            delete object[field];
        } else if (object[field] instanceof Array) {
            for (var i = 0; i < object[field].length; i++) {
                for (var key in pattern[field]) {
                    lib.removeFields(object[field][i], key, pattern[field]);
                }
            }
        } else if (object[field] instanceof Object) {
            for (var key in pattern[field]) {
                lib.removeFields(object[field], key, pattern[field]);
            }
        }
    }
    
    lib.copy = function (object) {
        return JSON.parse(JSON.stringify(object));
    }
    
    lib.pick = function (object, pattern) {
        if (pattern instanceof Array) {
            pattern = lib.createPattern(pattern);
        }
    
        var newObject = {};
        for (var key in pattern) {
            lib.copyFields(object, newObject, key, pattern);
        }
        return lib.copy(newObject);
    };
    
    lib.unpick = function (object, pattern) {
        if (pattern instanceof Array) {
            pattern = lib.createPattern(pattern);
        }
    
        var newObject = lib.copy(object);
        for (var key in pattern) {
            lib.removeFields(newObject, key, pattern);
        }
        return newObject;
    }

    return {
        pick: lib.pick,
        unpick: lib.unpick
    };
})();