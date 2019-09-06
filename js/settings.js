class Settings {

  static settings = {
    "saveEnabled" : true
  }

  static get(key) {
    return this.settings[key];
  }

}

export default Settings;