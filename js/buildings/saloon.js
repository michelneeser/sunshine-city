import Building from './building.js';
import helpers from '../helpers.js';
import Repository from "../repository.js";

class Saloon extends Building {

  constructor() {
    super('saloon');
    this.icon = 'fas fa-beer';
    this.levels.push(
      { villagesquare: 1 },
      { money: 1000, time: 300 },
      { money: 8000, time: 900 },
      { money: 15000, time: 1800 } );
    this.init();
  }

  upgradeDone() {
    // the saloon pays taxes as soon as the mayor's office is built
    let mayorsOfficeLevel = Repository.getBuildings().mayorsoffice.properties.level;
    if (this.properties.level == 1 && mayorsOfficeLevel > 0) {
      let textToShow = helpers.getStr('building.saloon.taxesHint');
      helpers.showHint(textToShow);
    }
  }

}

export default Saloon;