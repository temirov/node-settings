//This is shamelessy taken from here:
//http://onemoredigit.com/post/1527191998/extending-objects-in-node-js
//All credits go to the author, which is not me

Object.defineProperty(Object.prototype, "extend", {
    enumerable: false,
    value: function(from) {
        var props = Object.getOwnPropertyNames(from);
        var dest = this;
        props.forEach(function(name) {
            if (name in dest) {
                var destination = Object.getOwnPropertyDescriptor(from, name);
                Object.defineProperty(dest, name, destination);
            }
        });
        return this;
     }
});

var sysutils = module.exports = {};
