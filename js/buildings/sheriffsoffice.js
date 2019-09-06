import Building from './building.js';

class SheriffsOffice extends Building {

  constructor() {
    super('sheriffsoffice');
    this.icon = 'icofont-police-badge';
    this.active = true;
    this.levels.push(
      { villagesquare: 3, citizens: 200 },
      { money: 500, time: 600 } );
    this.init();
  }

}

export default SheriffsOffice;