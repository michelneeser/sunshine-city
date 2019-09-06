import Repository from "../repository.js";

class Resource {

  constructor(id, initialAmount) {
    this.id = id;

    let savedAmount = localStorage[id];
    this._amount = savedAmount ? JSON.parse(savedAmount) : initialAmount;
  }

  get amount() {
    return this._amount;
  }

  set amount(amount) {
    this._amount = amount;
    Repository.evaluate();
  }

}

export default Resource;