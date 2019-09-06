import Repository from "../repository.js";
import Settings from '../settings.js';
import helpers from "../helpers.js";

class Building {

  constructor(id) {
    this.id = id;
    this.properties = { level: 0, secondsToBuild: 0 };
    this.active = false;
    this.levels = [];
    this.noLevels = false;
    this.canUpgrade = false;
    this.upgradeInProgress = false;
    this.description = "";
    this.icon = 'icofont-tree'; // fontawesome: e.g. 'fas fa-home'
  }

  init() {
    let savedProperties = localStorage[this.id];
    if (savedProperties) {
      this.properties = JSON.parse(savedProperties);
    }
  }

  upgrade(peekOnly, toLevel, reload) {
    let nextLevel = 0;
    if (toLevel != undefined) {
      nextLevel = toLevel;
    } else if (this.noLevels) {
      nextLevel = 1;
    } else {
      nextLevel = this.properties.level + 1;
    }

    if (!this.levels[nextLevel]) {
      return false;
    }

    let requirements = this.levels[nextLevel];
    let resourcesToSubtract = [];

    for (let req of Object.keys(requirements)) {
      let resource = Repository.resources[req];

      if (resource) {
        if (resource.amount >= requirements[req]) {
          if (!peekOnly && resource == Repository.resources.money) {
            resourcesToSubtract.push({
              resource: resource,
              amount: requirements[req]
            });
          }
        } else {
          return false;
        }
      } else {
        let building = Repository.buildings[req];

        if (building) {
          if (building.properties.level < requirements[req]) {
            return false;
          }
        }
      }
    }

    if (!peekOnly) {
      for (let obj of resourcesToSubtract) {
        obj.resource.amount -= obj.amount;
      }

      let self = this;
      let doUpgrade = function() {
        if (!self.noLevels) {
          self.properties.level++;
          if (!reload) {
            let textToShow = helpers.getStr('building.levelCompleted', self.properties.level, helpers.getBuildingName(self.id));
            helpers.showBuildFinished( textToShow );
          }
        }

        self.upgradeInProgress = false;
        self.upgradeDone();
        Repository.evaluate();
      };
      
      let buildingTimeEnabled = Settings.get("buildingTimeEnabled");
      let buildingTimeShortingFactor = Settings.get("buildingTimeShortingFactor");
      let timeToBuild = (reload ? this.properties.secondsToBuild : requirements.time);
      if (buildingTimeShortingFactor > 0) {
        timeToBuild = Math.ceil(timeToBuild / buildingTimeShortingFactor);
      }

      if (buildingTimeEnabled && timeToBuild) {
        this.properties.secondsToBuild = timeToBuild;
        this.upgradeInProgress = true;
        
        let timer = setInterval( function() {
          self.properties.secondsToBuild--;
          if (self.properties.secondsToBuild == 0) {
            clearInterval(timer);
          }
        }, 1000 );

        setTimeout( function() {
          doUpgrade();
        }, timeToBuild * 1000 );
      }
      else {
        doUpgrade();
      }
    }

    return true;
  }

  upgradeDone() {
    // can be overriden to do something after upgrading
  }

  evaluate(firstTime) {
    if (firstTime && this.properties.secondsToBuild > 0) {
      this.upgradeInProgress = true;
      this.upgrade( false, undefined, true );
    }

    if (!this.active) {
      this.active = this.upgrade(true, 0);
      if (this.active) {
        let textToShow = helpers.getStr('building.activated.' + (this.noLevels ? 'plural' : 'singular'), helpers.getBuildingName(this.id));
        helpers.showHint(textToShow);
      }
    }
    this.canUpgrade = this.upgrade(true);
  }

}

export default Building;