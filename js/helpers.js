import dict from "./dict.js";

let helpers = {

  getTimeStr: function(seconds) {
    let date = new Date(null);
    date.setSeconds(seconds);
    return date.toISOString().substr(11, 8);
  },

  showBuildFinished: function(message) {
    Vue.toasted.global.build_finished( { message: message } );
  },

  getBuildingName: function(id) {
    return dict['building.name.' + id];
  }

}

export default helpers;