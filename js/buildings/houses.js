import Building from './building.js';
import Repository from "../repository.js";

class Houses extends Building {

  constructor() {
    super('houses');
    this.description = 'Homes for your citizens';
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
  }

}

export default Houses;