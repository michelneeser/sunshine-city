import Resource from "./resource.js";
import Repository from "../repository.js";

class Money extends Resource {

  constructor() {
    super('money', 20000);
    this.startMoneyCalculation();
  }

  startMoneyCalculation() {
    let self = this;
    setInterval(function() {
      let moneyToAdd = 0;
      moneyToAdd += self.calculateTaxes();
      moneyToAdd += self.calculateAlcoholTaxes();
      self.amount += moneyToAdd;
    }, 5000 );
  }

  calculateTaxes() {
    let mayorsOfficeLevel = Repository.getBuildings().mayorsoffice.properties.level;
    let nrOfCitizens = Repository.getResources().citizens.amount;
    return nrOfCitizens * ( mayorsOfficeLevel * 10 );
  }

  calculateAlcoholTaxes() {
    let mayorsOfficeLevel = Repository.getBuildings().mayorsoffice.properties.level;
    if (mayorsOfficeLevel > 0) {
      let saloonLevel = Repository.getBuildings().saloon.properties.level;
      let nrOfCitizens = Repository.getResources().citizens.amount;
      return nrOfCitizens * ( saloonLevel * 5 );
    }
    return 0;
  }

}

export default Money;