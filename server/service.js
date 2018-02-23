const express = require('express');
const path = require('path');
const usersData = require('./db/users.json');
const locationsData = require('./db/locations.json');
const skillsData = require('./db/skillset.json');
let fs = require('fs');

let createApp = function() {
  const app = express();
  return app;
};

let setupStaticRoutes = function(app) {
  app.use(express.static(path.join(__dirname, '../', 'client')));
  return app;
};

let setupAppRoutes = function(app) {
  app.post('/location', function(req, res) {
    console.log("response from a client", req.body.location);
    fs.readFile("server/db/locations.json", 'utf8', function(err, data) {

      console.log("data",data,"error",err);

      var locationDetails = JSON.parse(data);
      locationDetails.push(req.body.location);

      locationDetails = JSON.stringify(locationDetails);

      fs.writeFile("server/db/locations.json", locationDetails, function(err){
        if(err == null) {
          console.log("location details added");
          res.send("success");
        } else {
          res.send("failed");
        }
      });
    });
  });
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
        let dataForPlace = 'Tower '+locationsData[i].tower+', floor '+locationsData[i].floor+', '+locationsData[i].room;
        placesArr.push({key:dataForPlace,text:dataForPlace,value:dataForPlace});
        if(locationsData.length-1 == i) {
          res.send(placesArr);
        }
      }
    } else if(typeOfDestination == 'persons') {
      let personsArr = [];
      for (var i = 0; i < usersData.length; i++) {
        personsArr.push({key:usersData[i].name,text:usersData[i].name,value:usersData[i].name});
        if(usersData.length-1 == i) {
          res.send(personsArr);
        }
      }
    } else if(typeOfDestination == 'SME') {
      let skillsArr = [];
      for (var i = 0; i < skillsData.length; i++) {
        skillsArr.push({key:skillsData[i],text:skillsData[i],value:skillsData[i]});
        if(skillsData.length-1 == i) {
          res.send(skillsArr);
        }
      }
    }
  });

  app.post('/coordinates', function(req, res) {
    console.log('/coordinates: ', JSON.stringify(req.body));
    let { typeOfDestination, destinationValue, currentLocation } = req.body;
    if(typeOfDestination == 'places') {
      let chunks = destinationValue.split(',');
      let tower = chunks[0].split(' ')[1];
      let floor = chunks[1].split(' ')[2];
      let room = chunks[2];
      let location = locationsData.find(item => {
        return (
          item.tower.trim() == tower.trim() &&
          item.floor.trim() == floor.trim() &&
          item.room.trim() == room.trim()
        );
      });
      res.send({
        location: {
          lat: location.lat,
          lng: location.lng
        }
      });
    } else if(typeOfDestination == 'persons') {
      let deskLocation = usersData.find(item => item.name == destinationValue).deskLocation;
      console.log('deskLocation: ', JSON.stringify(deskLocation));
      res.send({ location: deskLocation });
    } else if(typeOfDestination == 'SME') {
      let usersFound = [];
      usersData.map(item => {
        if(item.skillset.includes(destinationValue)) {
          delete item.password;
          usersFound.push(item);
        }
      });
      res.send(usersFound);
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

let getDistanceFromLatLonInKm = function (lat1, lon1, lat2, lon2) {
  let R = 6371; // Radius of the earth in km
  let dLat = deg2rad(lat2-lat1);  // deg2rad below
  let dLon = deg2rad(lon2-lon1);
  let a =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ;
  let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  let d = R * c; // Distance in km
  return d;
}

let deg2rad = function (deg) {
  return deg * (Math.PI/180)
}

module.exports = {
  createApp,
  setupStaticRoutes,
  setupAppRoutes,
  setupRESTRoutes,
  setupMiddlewares,
  setupWebpack
};
