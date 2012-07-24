//load modules
var path              = require('path'),
    fs                = require('fs'),
    util              = require('util'),
    sysutil           = require('./sysutils');

//define file's name convention    
var CONFFILEPOSTFIX   = 'settings.js';
var defaultConfigName = 'default';
    
//Get a user ID
//will return the current user, be it sudo'ed or su'ed
var userName = process.env.USER;
//__dirname system variable return the current directory
var currentFolder = __dirname;

//Switching to asynchronous approach
function buildFileName(fileBaseName, callback){
  //the operations here are synchronous 
  //so we can use try/catch constructor for error handling
  try { 
    var fileName = util.format('%s.%s', fileBaseName, CONFFILEPOSTFIX);
    //path.join correctly processes all the dots and slashes
    var fullPath = path.join(currentFolder, fileName);
    callback(null, fullPath);
  } 
  catch (err) {
    callback(err, null);
  }
};

var userConfig = { _baseFileName : userName };
var defaultConfig = { _baseFileName : defaultConfigName };
var configs = [ defaultConfig, userConfig ];

//TODO: explore if I can use reduce/map function for this operation
configs.forEach(function(element){
  buildFileName(element._baseFileName, function(err, fullPath){
    if (err) {
      console.log('An error occured: %s', err);
      return;
    }
    element.path = fullPath;
    //TODO: create an object with exists method
    element.exists = fs.existsSync(element.path);
      if (element.exists) {
          element.config = require(element.path);
      }
    });
});

var resultConfig;

//TODO: implement "extend" as a part of the configFile object
if (userConfig.exists && defaultConfig.exists) {
    console.log('both default\'s and user\'s configs exist, merging');
    resultConfig = defaultConfig.config.extend(userConfig.config);
    }
else if (userConfig.exists) {
    console.log('Only user config exists');
    resultConfig = userConfig.config;
  } 
else if (defaultConfig.exists) {
    console.log('Only default config exists');
    resultConfig = defaultConfig.config;
  }
else {
    //TODO: Throw a legitimate error at this point
    errMessage = 'No configuration files were found at either default or user level. Exiting.';
    new Error(errMessage);
    console.log(errMessage);
    process.exit(1);
    }
//Handle uncaught exceptions
process.on('uncaughtException', function(err) {
  console.log('An error occured: %s', err);
});

//resultConfig variable gets .config assigned. 
//Only the config variables are exported
//no service functions like fullPath etc are exposed  
module.exports = resultConfig;
