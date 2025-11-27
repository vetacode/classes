//Protecting “waterAmount”
//Protected properties are usually prefixed with an underscore _.

class CoffeeMachine {
  _waterAmount = 0;

  set waterAmount(value) {
    if (value < 0) {
      value = 0;
    }
    this._waterAmount = value;
  }

  get waterAmount() {
    return this._waterAmount;
  }

  constructor(power) {
    this._power = power;
  }
}

// create the coffee machine
let coffeeMachine = new CoffeeMachine(100);
console.log(coffeeMachine);

// add water
coffeeMachine.waterAmount = -10; // _waterAmount will become 0, not -10
console.log(coffeeMachine.waterAmount); // 0

{
  //READ ONLY. 'power'
  class CoffeeMachine {
    // ...

    constructor(power) {
      this._power = power;
    }

    get power() {
      return this._power;
    }
  }

  // create the coffee machine
  let coffeeMachine = new CoffeeMachine(100);

  console.log(`Power is: ${coffeeMachine.power}W`); // Power is: 100W

  coffeeMachine.power = 25; // Error (no setter)
  console.log(coffeeMachine.power); //100
}

{
  //Private “#waterLimit”
  class CoffeeMachine {
    #waterLimit = 200;

    #fixWaterAmount(value) {
      if (value < 0) return 0;
      if (value > this.#waterLimit) return this.#waterLimit;
    }

    setWaterAmount(value) {
      this.#waterLimit = this.#fixWaterAmount(value);
    }
  }

  let coffeeMachine = new CoffeeMachine();

  // can't access privates from outside of the class
  // coffeeMachine.#fixWaterAmount(123); // Error
  // coffeeMachine.#waterLimit = 1000; // Error
}

{
  //Private and Public fields can present at the same time
  class CoffeeMachine {
    #waterAmount = 0;

    get waterAmount() {
      return this.#waterAmount;
    }

    set waterAmount(value) {
      if (value < 0) value = 0;
      this.#waterAmount = value;
    }
  }

  let machine = new CoffeeMachine();

  machine.waterAmount = 100;
  // console.log(machine.#waterAmount); // Error
  console.log(machine.waterAmount); //100
}
