import Resource from "./resource.js";
import Repository from "../repository.js";

class Money extends Resource {

  constructor() {
    super('money', 1000);
    let self = this;
    setInterval(function() {
      self.amount += ( Repository.resources.citizens.amount * 1000 );
    }, 10000 );
  }

}

export default Money;