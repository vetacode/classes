//EXTENDS Keyword
//The syntax to extend another class is: class Child extends Parent.
{
  class Animal {
    constructor(name) {
      this.name = name;
      this.speed = 0;
    }
    run(speed) {
      this.speed = speed;
      console.log(`${this.name} runs with speed ${this.speed} km/h`);
    }

    stop() {
      this.speed = 0;
      console.log(`${this.name} stands still`);
    }
  }
  let animal = new Animal('My Animal');
  animal.stop();
  animal.run(50);

  class Rabbit extends Animal {
    hide() {
      console.log(`${this.name} hides!`);
    }
  }

  let rabbit = new Rabbit('Long Ears');

  rabbit.run(30);
  rabbit.hide();

  //CREATE class wrapping function
  function f(say) {
    return class {
      sayHi() {
        console.log(say);
      }
    };
  }

  class User extends f('Hello') {}
  new User().sayHi(); //Hello
}

{
  //OVERRIRDING a Method with 'SUPER' keyword
  // super.method(...) to call a parent method.
  // super(...) to call a parent constructor (inside our constructor only).
  class Animal {
    constructor(name) {
      this.name = name;
      this.speed = 0;
    }

    run(speed) {
      this.speed = speed;
      console.log(`${this.name} runs with speed ${this.speed} km/h`);
    }

    stop() {
      this.speed = 0;
      console.log(`${this.name} stands still!`);
    }
  }

  class Rabbit extends Animal {
    hide() {
      console.log(`${this.name} hides!!`);
    }

    stop() {
      super.stop();
      this.hide();
    }
  }

  let rabbit = new Rabbit('Black Rabbit');
  rabbit.stop();
  rabbit.run(10);
  rabbit.hide();

  //Arrow functions have no super => berguna untuk buat setTimeout pake arrow tp msh bs akses super parent
  class Cat extends Animal {
    stop() {
      console.log(setTimeout(() => super.stop(), 1000)); //super msh bisa akses stop() dari parent (Animal)
    }
  }
  let cat = new Cat('Belang');
  cat.stop(); //Belang stands still!
}

{
  //OVERRIDING CONSTRUCTOR
  // super(...) to call a parent constructor (inside our constructor only).
  class Animal {
    constructor(name) {
      this.name = name;
      this.speed = 0;
    }

    run(speed) {
      this.speed = speed;
      console.log(`${this.name} runs with speed ${this.speed} km/h`);
    }

    stop() {
      this.speed = 0;
      console.log(`${this.name} stands still!`);
    }
  }

  class Rabbit extends Animal {
    constructor(name, earLength) {
      super(name);
      this.earLength = earLength;
      console.log(`${this.name} has ear length ${earLength} cm`);
    }

    hide() {
      console.log(`${this.name} hides!!`);
    }
  }

  let rabbit = new Rabbit('White Rabbit', 15);
  console.log(rabbit.name);
  console.log(rabbit.earLength);
  rabbit.run(30);
  rabbit.hide();
}

{
  //Overriding class fields: a tricky note
  //NOTES: for CLASS FIELDS the parent constructor always uses its own field value, not the overridden one. (THE DIFFERENCE BETWEEN USING FIELDS AND METHODS)
  class Animal {
    name = 'animal';

    constructor() {
      console.log(this.name); // (*)
    }
  }

  class Rabbit extends Animal {
    name = 'rabbit';
  }

  new Animal(); // animal
  new Rabbit(); // animal
}

{
  //Super: internals, [[HomeObject]]
  //ADVANCED NOTES: It’s about the internal mechanisms behind inheritance and super.
  let animal = {
    name: 'Animal',
    eat() {
      // animal.eat.[[HomeObject]] == animal
      console.log(`${this.name} eats.`);
      return `${this.name} eats.`;
    },
  };

  let rabbit = {
    __proto__: animal,
    name: 'Rabbit',
    eat() {
      // rabbit.eat.[[HomeObject]] == rabbit
      return super.eat();
    },
  };

  let longEar = {
    __proto__: rabbit,
    name: 'Long Ear',
    eat() {
      // longEar.eat.[[HomeObject]] == longEar
      return super.eat();
    },
  };

  // works correctly
  console.log(longEar.eat()); // Long Ear eats.
}

/**TASK 1
 * Error creating an instance
importance: 5
Here’s the code with Rabbit extending Animal.

Unfortunately, Rabbit objects can’t be created. What’s wrong? Fix it.

class Animal {

  constructor(name) {
    this.name = name;
  }

}

class Rabbit extends Animal {
  constructor(name) {
    this.name = name;
    this.created = Date.now();
  }
}

let rabbit = new Rabbit("White Rabbit"); // Error: this is not defined
console.log(rabbit.name);
 */
class Animal {
  constructor(name) {
    this.name = name;
  }
}

class Rabbit extends Animal {
  constructor(name) {
    super(name);
    this.created = Date.now();
    // this.created = new Date().toLocaleString('id-ID');
  }
}

let rabbit = new Rabbit('White Rabbit');
console.log(rabbit.name);
console.log(rabbit.created);
