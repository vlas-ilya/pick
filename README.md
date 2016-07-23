# pick
Building a new object based on the selected fields.

## Building

To build as node module:
```
npm install
gulp export
```

To run test%
```
npm install
gulp test
```

To build as angular module:
```
npm install
gulp angular
```

## Usage

```js
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

var result = lib.pick(a, ["uuid", "numbers", "subObject", "objects.uuid", "objects.number", "objects.subObject.uuid"]);
```

And result is

```js
{
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
```