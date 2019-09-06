class Settings {

  static settings = {
    "saveEnabled" : true,
    "buildingTimeEnabled" : true,
    "buildingTimeShortingFactor" : 10
  }

  static get(key) {
    return this.settings[key];
  }

}

export default Settings;