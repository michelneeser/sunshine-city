import Resource from "./resource.js";
import Repository from "../repository.js";

class Money extends Resource {

  constructor() {
    super('money', 10000);
    this.startMoneyCalculation();
  }

  startMoneyCalculation() {
    let self = this;
    setInterval(function() {
      let moneyToAdd = 0;
      moneyToAdd = self.calculateTaxes();
      self.amount += moneyToAdd;
    }, 5000 );
  }

  calculateTaxes() {
    let mayorsOfficeLevel = Repository.buildings.mayorsoffice.properties.level;
    let nrOfCitizens = Repository.resources.citizens.amount;
    return nrOfCitizens * ( mayorsOfficeLevel * 10 );
  }

}

export default Money;