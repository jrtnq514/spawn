/**
 * Created by JT on 8/22/16.
 */

// Test spawn
var spawn = require('./../lib/index');


console.log(spawn.number.int.between(0, 2));
console.log(spawn.number.int.ofLength(6));

console.log(spawn.string.names.firstName('male'));
console.log(spawn.string.names.firstName('female'));