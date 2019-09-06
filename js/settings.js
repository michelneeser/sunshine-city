class Settings {

  static settings = {
    "saveEnabled" : true,
    "buildingTimeEnabled" : true,
    "buildingTimeShortingFactor" : 0
  }

  static get(key) {
    return this.settings[key];
  }

}

export default Settings;