import Building from './building.js';

class TownHall extends Building {

  constructor() {
    super('townhall');
    this.active = true;
    this.description = 'This is your home base as the major of Sunshine City';
    this.levels.push(
      {},
      { time: 4 },
      { money: 2000, time: 50 } );
    this.init();
  }

}

export default TownHall;