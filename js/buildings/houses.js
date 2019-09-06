import Building from './building.js';
import Repository from "../repository.js";
import helpers from '../helpers.js';

class Houses extends Building {

  constructor() {
    super('houses');
    this.noLevels = true;
    this.properties.houses = 0;
    this.levels.push(
      { townHall: 1 },
      { money: 5000 } );
    this.init();
  }

  upgradeDone() {
    this.properties.houses++;
    let peopleToAdd = ( Math.floor( Math.random() * 4 ) + 1 );
    Repository.resources.citizens.amount += peopleToAdd;
    let textToShow = 'Yeah, 1 House completed – we welcome ' + peopleToAdd + ( peopleToAdd > 1 ? ' new citizens!' : ' new citizen!' );
    helpers.showBuildFinished( textToShow );
  }

}

export default Houses;