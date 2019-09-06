import Building from './building.js';
import helpers from '../helpers.js';

class MayorsOffice extends Building {

  constructor() {
    super('mayorsoffice');
    this.icon = 'fas fa-donate'
    this.levels.push(
      { villagesquare: 2, citizens: 10 },
      { time: 60 },
      { money: 3000, time: 600 },
      { money: 15000, time: 3600 } );
    this.init();
  }

  upgradeDone() {
    if (this.properties.level == 1) {
      let textToShow = helpers.getStr('building.mayorsoffice.taxesHint');
      helpers.showHint(textToShow);
    }
  }

}

export default MayorsOffice;