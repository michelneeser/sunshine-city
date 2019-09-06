import Money from './resources/money.js';
import Citizens from './resources/citizens.js';
import TownHall from './buildings/townhall.js';
import CityPark from './buildings/citypark.js';
import Church from './buildings/church.js';
import Houses from './buildings/houses.js';
import Settings from './settings.js';

class Repository {

  static resources = {};
  static buildings = {};

  static getResourcesForView() {
    return Object.values(this.resources);
  }

  static getBuildingsForView() {
    let buildingsForView = [];
    let buildingsCopy = Object.values(this.buildings).slice();
    let currentRow = [];

    // make rows of three
    while (buildingsCopy.length > 0) {
      currentRow.push(buildingsCopy.shift());
      if (currentRow.length == 3) {
        buildingsForView.push(currentRow);
        currentRow = [];
      }
    }

    if (currentRow.length > 0) {
      buildingsForView.push(currentRow);
    }

    return buildingsForView;
  }

  static evaluate(firstTime = false) {
    let saveEnabled = Settings.get("saveEnabled");

    if (saveEnabled) {
      for (let resource of Object.values(this.resources)) {
        localStorage[resource.id] = JSON.stringify(resource.amount);
      }
    }

    for (let building of Object.values(this.buildings)) {
      building.evaluate(firstTime);
      if (saveEnabled) {
        localStorage[building.id] = JSON.stringify(building.properties);
      }
    }
  }

}

let money = new Money();
let citizens = new Citizens();

Repository.resources = {
  money: money,
  citizens: citizens,
}

let townHall = new TownHall();
let cityPark = new CityPark();
let church = new Church();
let houses = new Houses();

Repository.buildings = {
  townHall: townHall,
  cityPark: cityPark,
  church: church,
  houses: houses,
}

export default Repository;

Repository.evaluate(true);