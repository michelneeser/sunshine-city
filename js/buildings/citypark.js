import Building from './building.js';

class CityPark extends Building {

  constructor() {
    super('citypark');
    this.levels.push(
      { townHall: 1 },
      { money: 4000 },
      { money: 10000 },
      { money: 20000 } );
    this.icon = 'fas fa-tree';
    this.init();
  }

}

export default CityPark;