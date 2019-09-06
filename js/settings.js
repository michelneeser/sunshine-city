class Settings {

  static settings = {
    "saveEnabled" : true,
    "buildingTimeEnabled" : true
  }

  static get(key) {
    return this.settings[key];
  }

}

export default Settings;