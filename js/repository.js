import Money from './resources/money.js';
import Citizens from './resources/citizens.js';
import VillageSquare from './buildings/villagesquare.js';
import Houses from './buildings/houses.js';
import MayorsOffice from './buildings/mayorsoffice.js';
import Settings from './settings.js';

// resources
let money = new Money();
let citizens = new Citizens();

const resources = {
  money: money,
  citizens: citizens,
};

// buildings
let villageSquare = new VillageSquare();
let houses = new Houses();
let mayorsOffice = new MayorsOffice();

const buildings = {
  villagesquare: villageSquare,
  houses: houses,
  mayorsoffice: mayorsOffice,
}

class Repository {

  static getResources() {
    return resources;
  }

  static getResourcesForView() {
    return Object.values(resources);
  }

  static getBuildings() {
    return buildings;
  }

  static getBuildingsForView() {
    let buildingsForView = [];
    let buildingsCopy = Object.values(buildings).slice();
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

  static evaluate(firstTime) {
    let saveEnabled = Settings.get("saveEnabled");

    if (saveEnabled) {
      for (let resource of Object.values(resources)) {
        localStorage[resource.id] = JSON.stringify(resource.amount);
      }
    }

    for (let building of Object.values(buildings)) {
      building.evaluate(firstTime);
      if (saveEnabled) {
        localStorage[building.id] = JSON.stringify(building.properties);
      }
    }
  }

}

export default Repository;

Repository.evaluate(true);