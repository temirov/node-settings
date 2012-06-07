//load modules
var path              = require('path'),
    util              = require('util'),
    sysutil           = require('./sysutils');

//define file's name convention    
var confFilePostfix = 'settings.js',
    defaultConfigName = 'default';
    
//Get a user ID
//will return current user, be it sudo'ed or su'ed
var userName = process.env.USER;

//TODO: change the code to asynchronous

function buildFileName(fileBaseName){
    var fileName = util.format('%s.%s', fileBaseName, confFilePostfix);
    //__dirname system variable return the current directory
    //path.join correctly processes all the dots and slashes
    var fullPath = path.join(__dirname, fileName);
    return fullPath;
};

var userConfig = { path : buildFileName(userName) };
var defaultConfig = { path : buildFileName(defaultConfigName) };
var configs = [defaultConfig, userConfig];

//TODO: create an object with exists method
configs.forEach(function(element, index, array){
        element.exists = path.existsSync(element.path);
        if (element.exists) {
            element.config = require(element.path);
        }
    });

var resultConfig;

if (userConfig.exists && defaultConfig.exists) {
    console.log('both default\'s and user\'s configs exist, merging');
        resultConfig = defaultConfig.config.extend(userConfig.config);
    }
else if (userConfig.exists || defaultConfig.exists) {
        if (userConfig.exists) {
            console.log('Only user config exists');
            resultConfig = userConfig.config;
        } else {
            console.log('Only default config exists');
            resultConfig = defaultConfig.config;
        }
    }
else {
    console.log('No configuration was find at either default or user level. Exiting.');
    process.exit(1);
    }

module.exports = resultConfig;
