let helpers = {

  getTimeStr: function(seconds) {
    let date = new Date(null);
    date.setSeconds(seconds);
    return date.toISOString().substr(11, 8);
  }

}

export default helpers;