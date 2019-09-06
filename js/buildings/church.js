import Building from './building.js';

class Church extends Building {

  constructor() {
    super('church');
    this.levels.push(
      { cityPark: 2 },
      { money: 10000, citizens: 4 },
      { money: 30000, citizens: 20 } );
    this.init();
  }

}

export default Church;