Meteor.publish('cronjob_run', function(){

  check(arguments, [Match.Any]); //TODO Audit CHECK;

  var criteria = {};
  var projection = {};

  return CronJobConfig.find(criteria, projection);

})