import dict from "./dict.js";

let helpers = {

  getTimeStr: function (seconds) {
    let date = new Date(null);
    date.setSeconds(seconds);
    return date.toISOString().substr(11, 8);
  },

  showBuildFinished: function (message) {
    if (Vue.toasted) {
      Vue.toasted.global.build_finished({ message: message });
    }
  },

  showHint: function (message) {
    if (Vue.toasted) {
      Vue.toasted.global.hint({ message: message });
    }
  },

  getStr: function (key, ...values) {
    let str = dict[key];
    if (values) {
      for (const [index, value] of values.entries()) {
        str = str.replace("{" + index + "}", value);
      }
    }
    return str;
  },

  getBuildingName: function (id) {
    return this.getStr('building.name.' + id);
  },

}

export default helpers;