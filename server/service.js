const express = require('express');
const path = require('path');
const usersData = require('./db/users.json');
const locationsData = require('./db/locations_two.json');
const skillsData = require('./db/skillset.json');

let createApp = function() {
  const app = express();
  return app;
};

let setupStaticRoutes = function(app) {
  app.use(express.static(path.join(__dirname, '../', 'client')));
  return app;
};

let setupAppRoutes = function(app) {
  return app;
};

let setupRESTRoutes = function(app) {
  app.post('/login', function(req, res) {
    let username = req.body.name;
    let password = req.body.password;
    for (var i = 0; i < usersData.length; i++) {
      console.log(usersData[i].name == username ,'---', usersData[i].password == password);
      if(usersData[i].name == username && usersData[i].password == password) {
        res.send('success');
        break;
      } else if(usersData.length-1 == i) {
        res.send('failure');
        break;
      }
    }
  });

  app.post('/updateContent', function(req, res) {
    let typeOfDestination = req.body.typeOfDestination;
    if(typeOfDestination == 'places') {
      let placesArr = [];
      for (var i = 0; i < locationsData.length; i++) {
        let dataForPlace = 'Tower '+locationsData[i].tower+' floor '+locationsData[i].floor+' '+locationsData[i].room;
        placesArr.push({key:dataForPlace,text:dataForPlace,value:dataForPlace});
        if(locationsData.length-1 == i) {
          res.send(placesArr);
        }
      }
    }else if(typeOfDestination == 'persons') {
      let personsArr = [];
      for (var i = 0; i < usersData.length; i++) {
        personsArr.push({key:usersData[i].name,text:usersData[i].name,value:usersData[i].name});
        if(usersData.length-1 == i) {
          res.send(personsArr);
        }
      }
    }else if(typeOfDestination == 'SME') {
      let skillsArr = [];
      for (var i = 0; i < skillsData.length; i++) {
        skillsArr.push({key:skillsData[i],text:skillsData[i],value:skillsData[i]});
        if(skillsData.length-1 == i) {
          res.send(skillsArr);
        }
      }
    }
  });

  app.use(function (req, res) {
    let err = new Error('resource not found');
    err.status = 404;
    return res.status(err.status).json({
      error: err.message
    });
  });

  app.use(function (err, req, res) {
    console.error('internal error in watch processor: ', err);
    return res.status(err.status || 500).json({
      error: err.message
    });
  });



  return app;
};

let setupMiddlewares = function(app) {
  const bodyParser = require('body-parser');
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  return app;
};

let setupWebpack = function(app) {
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const webpackConfig = require('../webpack.config.js');
  const webpackCompiler = webpack(webpackConfig);
  app.use(webpackHotMiddleware(webpackCompiler));
  app.use(webpackDevMiddleware(webpackCompiler, {
      noInfo: true,
      publicPath: webpackConfig.output.publicPath,
      stats: {colors: true}
  }));
  return app;
};

let setupMongooseConnections = function() {
  const mongoose = require('mongoose');
  let mongoURL = 'mongodb://127.0.0.1:27017/db';

  mongoose.connect(mongoURL);

  mongoose.connection.on('connected', function () {
    console.log('mongoose is now connected to ', mongoURL);


    mongoose.connection.on('error', function (err) {
      console.error('error in mongoose connection: ', err);
    });

    mongoose.connection.on('disconnected', function () {
      console.log('mongoose is now disconnected.');
    });

    process.on('SIGINT', function () {
      mongoose.connection.close(function () {
        console.log(
          'mongoose disconnected on process termination'
          );
        process.exit(0);
      });
    });
  });
};

module.exports = {
  createApp,
  setupStaticRoutes,
  setupAppRoutes,
  setupRESTRoutes,
  setupMiddlewares,
  setupMongooseConnections,
  setupWebpack
};
