CronJobConfig = new Meteor.Collection('cron_job_config');

Meteor.methods({

  'cron_job_config.save': function(data){

    check(arguments, [Match.Any]); //TODO CHECK

    _.each(data, function(v,k){

      if(/date/.test(k)){

        if(data[k] !== ''){
          data[k] = moment(data[k], 'DD/MM/YYYY').toDate();
        }

      }

    });

    var time_set = {
      year: moment(data.date).format('YYYY'),
      month: moment(data.date).format('MM'),
      day: moment(data.date).format('DD'),
      hour: data.hour,
      minute: data.minute
    };

    CronJobConfig.insert({
      time_set: time_set,
      dateTime: new Date(time_set.year + '-'+time_set.month+'-'+time_set.day+'T'+time_set.hour+':'+time_set.minute+':59+08:00'),
      dt: moment().toDate()
    })

  }

});