export default class Counter {
  constructor() {
    this.number = 0;
  }
  add() {
    this.number += 1;
  }
  addTwo() {
    this.number += 2;
  }
  minus() {
    this.number -= 1;
  }
  minusTwo() {
    this.number -= 2;
  }
}
