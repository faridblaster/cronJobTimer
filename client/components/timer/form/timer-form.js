function xioFormatDate(datetime, format, locale) {

  moment.locale(typeof locale === 'string' ? locale : 'en');

  if (moment) {
    return datetime && datetime != '' ? moment(datetime).format(format) : '';
  }
  else {
    return datetime;
  }
}

TimerCtrl = RouteController.extend({

  template: 'TimerForm'

});

Template.TimerForm.helpers({

  currentTime: function(){

    var ctrl = Iron.controller();
    var clock = new Date();

    var timeLeft = function() {
      if (clock > 0) {
        clock--;
        ctrl.state.set("time", new Date());
        return clock
      } else {
        return Meteor.clearInterval(interval);
      }
    };

    var interval = Meteor.setInterval(timeLeft, 1000);

    return xioFormatDate(ctrl.state.get("time"), 'DD/MM/YYYY H:mm:ss A');

  },

  hours: function(){

    var hours = [];

    for(var i=0; i<=23; i++){

      if(i<10){
        i = "0"+i;
      }

      hours.push({ hour: i });

    }

    return hours;

  },

  minutes: function(){

    var minutes = [];

    for(var i=0; i<60; i++){

      if(i<10){
        i = "0"+i;
      }

      minutes.push({ minute: i });

    }

    return minutes;

  },

  xioOptionSelected : function(val1, val2){

    return val1 == val2 ? 'selected' : '';

  }

});

Template.TimerForm.events({

  'click [xaction="save_config"]': function(e, tpl){

    var date = $("[name=generate_date]").val();
    var hour = $("[name=__hour]").val();
    var minute = $("[name=__minute]").val();

    if(!date){
      return;
    }

    if(!hour){
      return;
    }

    if(!minute){
      return;
    }

    var data = {
      date: date,
      hour: hour,
      minute: minute
    };

    Meteor.call('cron_job_config.save', data, function(err, result){

      if(err){

      } else {

      }

    })

  }

});

Template.TimerForm.rendered=function() {
  $('#my-datepicker').datepicker({
    format: "dd/mm/yyyy"
  });
}

Template.TimerForm.onCreated = function(){

  var CSSReload = {
    head: null, init: function () {
      this._storeHead(), this._listenToPostMessages()
    }, _storeHead: function () {
      this.head = document.head || document.getElementsByTagName("head")[0]
    }, _listenToPostMessages: function () {
      var e = this;
      window[this._eventMethod()](this._messageEvent(), function (t) {
        try {
          var s = JSON.parse(t.data);
          "string" == typeof s.css && e._refreshCSS(s)
        } catch (n) {
        }
      }, !1)
    }, _messageEvent: function () {
      return "attachEvent" === this._eventMethod() ? "onmessage" : "message"
    }, _eventMethod: function () {
      return window.addEventListener ? "addEventListener" : "attachEvent"
    }, _refreshCSS: function (e) {
      var t = this._findPrevCPStyle(), s = document.createElement("style");
      s.type = "text/css", s.className = "cp-pen-styles", s.styleSheet ? s.styleSheet.cssText = e.css : s.appendChild(document.createTextNode(e.css)), this.head.appendChild(s), t && t.parentNode.removeChild(t), "prefixfree" === e.css_prefix && StyleFix.process()
    }, _findPrevCPStyle: function () {
      for (var e = document.getElementsByTagName("style"), t = e.length - 1; t >= 0; t--)if ("cp-pen-styles" === e[t].className)return e[t];
      return !1
    }
  };
  CSSReload.init();

};