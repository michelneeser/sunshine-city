import Building from './building.js';
import helpers from '../helpers.js';
import Repository from "../repository.js";

class MayorsOffice extends Building {

  constructor() {
    super('mayorsoffice');
    this.icon = 'fas fa-donate'
    this.levels.push(
      { villagesquare: 2, citizens: 10 },
      { money: 1000, time: 60 },
      { money: 3000, time: 600 },
      { money: 15000, time: 3600 } );
    this.init();
  }

  upgradeDone() {
    if (this.properties.level == 1) {
      let textToShowForMayorsOffice = helpers.getStr('building.mayorsoffice.taxesHint');
      helpers.showHint(textToShowForMayorsOffice);

      // the saloon pays taxes as soon as the mayor's office is built
      let saloonLevel = Repository.getBuildings().saloon.properties.level;
      if (saloonLevel > 0) {
        let textToShowForSaloon = helpers.getStr('building.saloon.taxesHint');
        helpers.showHint(textToShowForSaloon);
      }
    }
  }

}

export default MayorsOffice;