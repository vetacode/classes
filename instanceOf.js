//INSTANCEOF is used for checking if the object is class instance
//Syntax: obj instanceof Class
class Rabbit {}
let rabbit = new Rabbit();

// is it an object of Rabbit class?
console.log(rabbit instanceof Rabbit); // true

{
  // instead of class
  function Rabbit() {}
  let rabbit = new Rabbit();
  console.log(rabbit instanceof Rabbit); // true
}

let arr = [1, 2, 3];
console.log(arr instanceof Array); // true
console.log(arr instanceof Object); // true

//set a custom logic in the static method Symbol.hasInstance.

// set up instanceof check that assumes that
// anything with canEat property is an animal
class Animal {
  static [Symbol.hasInstance](obj) {
    if (obj.canEat) return true;
  }
}

let obj = { canEat: true };

console.log(obj instanceof Animal); // true: Animal[Symbol.hasInstance](obj) is called

{
  //when a prototype property is changed after the object is created.
  function Rabbit() {}
  let rabbit = new Rabbit();

  // changed the prototype
  Rabbit.prototype = {};

  // ...not a rabbit any more!
  console.log(rabbit instanceof Rabbit); // false
}

{
  //Object.prototype.toString for the type
  let obj = {};

  console.log(obj); // [object Object]
  console.log(obj.toString()); // the same
}
{
  // copy toString method into a variable for convenience
  let objectToString = Object.prototype.toString;

  // what type is this?
  let arr = [];
  console.log(objectToString.call(arr)); // [object Array]

  let s = Object.prototype.toString;
  console.log(s.call(123)); // [object Number]
  console.log(s.call(null)); // [object Null]
  console.log(s.call(alert)); // [object Function]
}
