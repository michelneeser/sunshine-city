const settings = {
  "saveEnabled" : true,
  "buildingTimeEnabled" : true,
  "buildingTimeShortingFactor" : 10
}

class Settings {

  static get(key) {
    return settings[key];
  }

}

export default Settings;