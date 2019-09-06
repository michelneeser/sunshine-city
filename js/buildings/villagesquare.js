import Building from './building.js';

class VillageSquare extends Building {

  constructor() {
    super('villagesquare');
    this.active = true;
    this.icon = 'fas fa-tree'
    this.levels.push(
      {},
      { time: 60 },
      { money: 3000, time: 300 },
      { money: 5000, time: 1800 },
      { money: 10000, time: 10800 },
      { money: 20000, time: 18000 });
    this.init();
  }

}

export default VillageSquare;