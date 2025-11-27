//Mixin is a class containing methods that can be used by other classes without a need to inherit from it.

//EXAMPLE
// mixin
let sayHiMixin = {
  sayHi() {
    console.log(`Hello ${this.name}`);
  },
  sayBye() {
    console.log(`Bye ${this.name}`);
  },
};

// usage:
class User {
  constructor(name) {
    this.name = name;
  }
}

// copy the methods
Object.assign(User.prototype, sayHiMixin);

// now User can say hi
new User('Dude').sayHi(); // Hello Dude!

{
  //Mixin can use inheritance inside themselves
  let sayMixin = {
    say(phrase) {
      console.log(phrase);
    },
  };

  let sayHiMixin = {
    __proto__: sayMixin, // (or we could use Object.setPrototypeOf to set the prototype here)

    sayHi() {
      // call parent method
      super.say(`Hello ${this.name}`); // (*)
    },
    sayBye() {
      super.say(`Bye ${this.name}`); // (*)
    },
  };

  class User {
    constructor(name) {
      this.name = name;
    }
  }

  // copy the methods
  Object.assign(User.prototype, sayHiMixin);

  // now User can say hi
  new User('Dude').sayHi(); // Hello Dude!
}

//EventMixin
let eventMixin = {
  /**
   * Subscribe to event, usage:
   *  menu.on('select', function(item) { ... }
   */
  on(eventName, handler) {
    if (!this._eventHandlers) this._eventHandlers = {};
    if (!this._eventHandlers[eventName]) {
      this._eventHandlers[eventName] = [];
    }
    this._eventHandlers[eventName].push(handler);
  },

  /**
   * Cancel the subscription, usage:
   *  menu.off('select', handler)
   */
  off(eventName, handler) {
    let handlers = this._eventHandlers?.[eventName];
    if (!handlers) return;
    for (let i = 0; i < handlers.length; i++) {
      if (handlers[i] === handler) {
        handlers.splice(i--, 1);
      }
    }
  },

  /**
   * Generate an event with the given name and data
   *  this.trigger('select', data1, data2);
   */
  trigger(eventName, ...args) {
    if (!this._eventHandlers?.[eventName]) {
      return; // no handlers for that event name
    }

    // call the handlers
    this._eventHandlers[eventName].forEach((handler) =>
      handler.apply(this, args)
    );
  },
};

//Usage
// Make a class
class Menu {
  choose(value) {
    this.trigger('select', value);
  }
}
// Add the mixin with event-related methods
Object.assign(Menu.prototype, eventMixin);

let menu = new Menu();

// add a handler, to be called on selection:
menu.on('select', (value) => console.log(`Value selected: ${value}`));

// triggers the event => the handler above runs and shows:
// Value selected: 123
menu.choose('123');

{
  let eventMixin = {
    on(eventName, handler) {
      if (!this._eventHandlers) this._eventHandlers = {};
      if (!this._eventHandlers[eventName]) {
        this._eventHandlers[eventName] = [];
      }
      this._eventHandlers[eventName].push(handler);
    },

    off(eventName, handler) {
      let handlers = this._eventHandlers?.[eventName];
      if (!handlers) return;
      for (let i = 0; i < handlers.length; i++) {
        if (handlers[i] === handler) {
          handlers.splice(i--, 1);
        }
      }
    },

    trigger(eventName, ...args) {
      if (!this._eventHandlers?.[eventName]) return;
      this._eventHandlers[eventName].forEach((handler) =>
        handler.apply(this, args)
      );
    },
  };

  class Menu {
    choose(value) {
      this.trigger('select', value);
    }
  }

  Object.assign(Menu.prototype, eventMixin);

  let menu = new Menu();

  menu.on('select', (value) => console.log(`Value selected: ${value}`));

  menu.choose('123'); // → logs correctly
}
