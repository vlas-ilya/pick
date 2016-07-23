'use strict';


//= require 'lib.js'


describe("Testing method comparator", function() {

    it("Testing for Equal", function() {
        var a = [1, 2, 3, 4, 5];
        var b = [1, 2, 3, 4, 5];

        expect(lib.comparator(a, b)).toBe(0);
    });

    it("Testing for Greater", function() {
        var a = [1, 2, 3, 4, 5];
        var b = [1, 2, 3, 3, 4];

        expect(lib.comparator(a, b)).toBe(1);
    });

    it("Testing for Less", function() {
        var a = [1, 2, 2, 3, 4];
        var b = [1, 2, 3, 4, 5];

        expect(lib.comparator(a, b)).toBe(-1);
    });

    it("Testing for left undefined", function() {
        var a = [1, 2, 3, 4, 5, undefined, undefined];
        var b = [1, 2, 3, 4, 5, 6, 7];

        expect(lib.comparator(a, b)).toBe(-1);
    });

    it("Testing for right undefined", function() {
        var a = [1, 2, 3, 4, 5, 6, 7, 8];
        var b = [1, 2, 3, 4, 5, 6, undefined, undefined];

        expect(lib.comparator(a, b)).toBe(1);
    });
});


describe("Testing method createPath", function () {
    it("Testing #1", function () {
        var a = {};
        var path = ["b", "c", "d"];
        var pattern = {
            b: {
                c: {
                    d: {}
                }
            }
        }
        lib.createPath(a, path);

        expect(a).toEqual(pattern);
    });
});


describe("Testing method createPattern", function () {
    it("Testing #1", function () {
        var a = lib.createPattern(["uuid", "numbers", "subObject", "objects.uuid", "objects.numbers", "objects.subObject.uuid"]);
        var pattern = {
            "numbers": {},
            "objects": {
                "numbers": {},
                "subObject": {
                    "uuid": {},
                },
                "uuid": {}
            },
            "subObject": {},
            "uuid": {}
        };

        expect(a).toEqual(pattern);
    });
});


describe("Testing method pick", function () {

    var a = {
        uuid: "20f3148c-5186-11e5-a840-3085a99f8ed4",
        name: "Test Name",
        numbers: [1, 2, 3, 4, 5, 6],
        objects: [{
            uuid: "545d891a-5186-11e5-b4a5-3085a99f8ed4",
            name: "Test Object 1 Name",
            number: 1,
            subObject: {
                uuid: "744650a4-5186-11e5-b6e0-3085a99f8ed4",
                name: "Test Object 1 subObject Name"
            },
            numbers: [1, 2, 3, 4, 5, 6]
        }, {
            uuid: "9e5d6652-5186-11e5-bb81-3085a99f8ed4",
            name: "Test Object 2 Name",
            number: 2,
            subObject: {
                uuid: "a2f00df0-5186-11e5-b5d0-3085a99f8ed4",
                name: "Test Object 2 subObject Name"
            },
            numbers: [1, 2, 3, 4, 5, 6]
        }, {
            uuid: "a772c606-5186-11e5-b477-3085a99f8ed4",
            name: "Test Object 3 Name",
            number: 3,
            subObject: {
                uuid: "aba507c0-5186-11e5-adeb-3085a99f8ed4",
                name: "Test Object 3 subObject Name"
            },
            numbers: [1, 2, 3, 4, 5, 6]
        }],
        subObject: {
            uuid: "b98a23e8-5186-11e5-89a6-3085a99f8ed4",
            name: "subObject Name"
        }
    };

    var pattern = {
        numbers: [1, 2, 3, 4, 5, 6],
        objects: [{
            number: 1,
            subObject: {
                uuid: "744650a4-5186-11e5-b6e0-3085a99f8ed4"
            },
            uuid: "545d891a-5186-11e5-b4a5-3085a99f8ed4"
        }, {
            number: 2,
            subObject: {
                uuid: "a2f00df0-5186-11e5-b5d0-3085a99f8ed4"
            },
            uuid: "9e5d6652-5186-11e5-bb81-3085a99f8ed4"
        }, {
            number: 3,
            subObject: {
                uuid: "aba507c0-5186-11e5-adeb-3085a99f8ed4"
            },
            uuid: "a772c606-5186-11e5-b477-3085a99f8ed4"
        }],
        subObject: {
            uuid: "b98a23e8-5186-11e5-89a6-3085a99f8ed4",
            name: "subObject Name"
        },
        uuid: "20f3148c-5186-11e5-a840-3085a99f8ed4"
    };

    it("Testing #1", function () {       
        var result = lib.pick(a, ["uuid", "numbers", "subObject", "objects.uuid", "objects.number", "objects.subObject.uuid"]);  

        expect(result).toEqual(pattern);
    });


    it("Testing #2", function () {
        var result = lib.pick(a, {
            "numbers": {},
            "objects": {
                "number": {},
                "subObject": {
                    "uuid": {}
                },
                "uuid": {}
            },
            "subObject": {},
            "uuid": {},
        });
        
        expect(result).toEqual(pattern);
    });
});