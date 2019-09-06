const settings = {
  "saveEnabled" : true,
  "buildingTimeEnabled" : true,
  "buildingTimeShortingFactor" : 0
}

class Settings {

  static get(key) {
    return settings[key];
  }

}

export default Settings;