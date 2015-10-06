Tracker.autorun(function(){

  Meteor.subscribe('cronjob_run');

  var MyCron = new Cron(100);

  MyCron.addJob(5, function() {

    var currentTime = moment().toDate();
    var cronJobData = CronJobConfig.find();

    cronJobData.forEach(function(doc){

      if(
          (moment(currentTime).format('YYYY') == moment(doc.dateTime).format('YYYY')) &&
          (moment(currentTime).format('MM') == moment(doc.dateTime).format('MM')) &&
          (moment(currentTime).format('DD') == moment(doc.dateTime).format('DD')) &&
          (moment(currentTime).format('HH') == moment(doc.dateTime).format('HH')) &&
          (moment(currentTime).format('mm') == moment(doc.dateTime).format('mm')) &&
          (moment(currentTime).format('ss') == moment(doc.dateTime).format('ss'))
      ) {

        var data = {
          year: currentTime.getFullYear()
        };

        swal('', 'haiii', 'success')

      }

    });

  });

});