import Building from './building.js';
import Repository from "../repository.js";
import helpers from '../helpers.js';

class Houses extends Building {

  constructor() {
    super('houses');
    this.noLevels = true;
    this.properties.houses = 0;
    this.icon = 'fas fa-home'
    this.levels.push(
      { villagesquare: 1 },
      { money: 1000, time: 5 } );
    this.init();
  }

  upgradeDone() {
    this.properties.houses++;
    let citizensToAdd = ( Math.floor( Math.random() * 4 ) + 1 );
    Repository.resources.citizens.amount += citizensToAdd;
    let textToShow = helpers.getStr('building.levelCompleted.houses.' + (citizensToAdd > 1 ? 'plural' : 'singular'), citizensToAdd);
    helpers.showBuildFinished( textToShow );
  }

}

export default Houses;