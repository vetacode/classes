//Extending built-in classes
// add one more method to it (can do more)
class PowerArray extends Array {
  isEmpty() {
    return this.length === 0;
  }
}

let arr = new PowerArray(1, 2, 5, 10, 50);
console.log(arr.isEmpty()); // false

let filteredArr = arr.filter((item) => item >= 10);
console.log(filteredArr); // 10, 50
console.log(filteredArr.isEmpty()); // false

{
  //filter, map, set are using [Symbol.secies] to return to Array (parent Obj)
  class PowerArray extends Array {
    isEmpty() {
      return this.length === 0;
    }

    // built-in methods will use this as the constructor
    static get [Symbol.species]() {
      return Array;
    }
  }

  let arr = new PowerArray(1, 2, 5, 10, 50);
  console.log(arr.isEmpty()); // false

  // filter creates new array using arr.constructor[Symbol.species] as constructor
  let filteredArr = arr.filter((item) => item >= 10);

  // filteredArr is not PowerArray, but Array
  // console.log(filteredArr.isEmpty()); // Error: filteredArr.isEmpty is not a function
}

//No static inheritance in built-ins
/**
   * there’s no link between Date and Object. They are independent, only Date.prototype inherits from Object.prototype.

That’s an important difference of inheritance between built-in objects compared to what we get with extends.
   */
