import Building from './building.js';

class CityPark extends Building {

  constructor() {
    super('citypark');
    this.description = 'A beautiful park in the middle of your city';
    this.levels.push(
      { townHall: 1 },
      { money: 4000 },
      { money: 10000 },
      { money: 20000 } );
    this.init();
  }

}

export default CityPark;