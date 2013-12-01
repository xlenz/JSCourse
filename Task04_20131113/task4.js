'use strict'

var o1 = {
    a: {
        b: 'c'
    }
};
var o2 = '';
var o3;
var o4 = {};
var o5 = {
    key1: 'qwe'
    , key2: true
    , key3: false
    , key4: 45
    , key5: {
        prop1: null
        , prop2: {
            subProp1: 'str'
            , subProp2: undefined
        }
    }
    , key6: [1, 2, 'qwe', {a: 2}]
};
var o6 = null;

var people = [
    {id: 1, name: 'Brad', friends: [2,5,6]},
    {id: 2, name: 'John', friends: [1, 3]},
    {id: 3, name: 'Tom', friends: [2, 5]},
    {id: 4, name: 'Fil', friends: null},
    {id: 5, name: 'John', friends: [1, 3]},
    {id: 6, name: 'Jim', friends: [1]},
    {id: 7, name: 'Pol'},
    {name: 'Bob'}
];

function getObject (path, obj) {
    var arr = path.split('.');
    if (obj === undefined || obj === null) {
        return obj;
    }
    for (var i = 0; i < arr.length; i++) {
        obj = obj[arr[i]];
    }
    return obj;
}

function forEachObj (obj, callback) {
    var forEachObjName = 'forEachObj';
    if (typeof callback != 'function') throw new Error(forEachObjName + ': callback is not a function.');
    if (obj === undefined || obj === null) throw new Error(forEachObjName + ': object is undefined or null');
    Object.keys(obj).forEach(function(key) {
        callback(key);
    });
}

function copyObj(o) {
    var copy = Object.create( Object.getPrototypeOf(o) );

    forEachObj(o, function(key) {
        var desc = Object.getOwnPropertyDescriptor(o, key);
        Object.defineProperty(copy, key, desc);
    });

    return copy;
}

function getFriends(userId) {
    var friendsListFiltered = [];
    var friendFound = false;
    forEachObj(people, function(key) {
        if (people[key].id != null && people[key].id == userId) {
            friendFound = true;
        }
        if (people[key].friends != null && Array.isArray(people[key].friends)) {
            var arr = people[key].friends;
            for (var i = 0; i < arr.length; i++) {
                if (arr[i] == userId) {
                    friendsListFiltered.push(people[key]);
                }
            }
        }
    });

    if (friendFound) {
        return friendsListFiltered;
    }
    return null;
}

console.log('----task1----');
console.log(getObject('a.b', o1));
console.log(getObject('a', o1));
console.log(getObject('d', o1));
console.log(getObject('a', o2));
console.log(getObject('a', o3));
console.log(getObject('a', o4));
console.log(getObject('a', o6));
console.log(getObject('key5.prop2.subProp1', o5));
console.log(getObject('key5.prop1', o5));
console.log(getObject('key5.prop2.subProp2', o5));
console.log(getObject('key1', o5));
console.log(getObject('key2', o5));
console.log(getObject('key3', o5));
console.log(getObject('key4', o5));
console.log(getObject('key6', o5));

console.log('----task2----');
console.log(objClone(o1));
console.log(objClone(o2));
console.log(objClone(o3));
console.log(objClone(o4));
console.log(objClone(o5));
console.log(objClone(o6));

console.log('----task3----');
console.log(getFriends(2));
console.log(getFriends(4));
console.log(getFriends(7));
console.log(getFriends(100500));
