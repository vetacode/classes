'use strict';

//Class is a function
//syntax
//NOTE: No comma between class methods: to distinguish with object literals
/**
 * class MyClass {
  // class methods
  constructor() { ... }
  method1() { ... }
  method2() { ... }
  method3() { ... }
  ...
}
 */

class User {
  constructor(name) {
    this.name = name;
  }

  sayHi() {
    console.log(this.name);
  }
}

// Usage:
let user = new User('John');
user.sayHi();
console.log(User.prototype.constructor == user.__proto__.constructor);

class User2 {
  constructor(name) {
    this.name = name;
  }
  sayHi() {
    console.log(this.name);
  }
}

// class is a function
console.log(typeof User2); // function

// ...or, more precisely, the constructor method
console.log(User2 === User2.prototype.constructor); // true

// The methods are in User2.prototype, e.g:
console.log(User2.prototype.sayHi); // the code of the sayHi method

// there are exactly two methods in the prototype
console.log(Object.getOwnPropertyNames(User.prototype)); // constructor, sayHi

function Car() {}
Car.prototype.sayHi = function () {};
console.log(Car.prototype.constructor == Car); //true

class User3 {
  constructor(jeneng) {
    this.jeneng = jeneng;
  }

  sayHi(pesan) {
    return `${this.jeneng} ${pesan}`;
  }
}

const user3 = new User3('Veta');
console.log(user3.constructor === User3); // true
console.log(user3.jeneng); //Veta
console.log(user3.sayHi('mau makan')); //Veta

//CREATING CLASS WITH PURE FUNCTION
// rewriting class User in pure functions

// 1. Create constructor function
function User4(name) {
  this.name = name;
}
// a function prototype has "constructor" property by default,
// so we don't need to create it

// 2. Add the method to prototype
User4.prototype.sayHi = function () {
  console.log(this.name);
};

// Usage:
let user4 = new User4('John');
user4.sayHi();

// CLASS TRAITS
//1. Class cannot called without 'new'
class Food {
  constructor() {}
}

console.log(typeof Food); // function
// Food(); // Error: Class constructor Food cannot be invoked without 'new'

//2. String rep starts with the 'class'
class Drink {
  constructor() {}
}
console.log(Drink); // class Drink { ... }

//3. Class methods are NON-enumerable
//4. Classes always use strict. All code inside the class construct is automatically in strict mode.

//CLASS EXPRESSION
function makeClass(phrase) {
  // declare a class and return it
  return class {
    sayHi() {
      console.log(phrase);
    }
  };
}

// Create a new class
let Guru = makeClass('Hello');
new Guru().sayHi(); // Hello

//GETTERS/SETTERS
{
  class User {
    constructor(name) {
      //invokes the setter
      this.name = name;
    }

    get name() {
      return this._name;
    }

    set name(value) {
      if (value.length < 4) {
        console.log('Name is too short.');
        return;
      }
      this._name = value;
    }
  }

  let user = new User('John');
  console.log(user.name);
  user = new User('');
}
