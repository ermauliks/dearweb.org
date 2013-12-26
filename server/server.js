// DEPENDENCIES
var express = require("express"),
   http = require("http"),
   port = (process.env.PORT || 8001),
   server = module.exports = express(),
   config = require('./config.js');

var mongo = require('mongodb');

var DBServer = mongo.Server,
   Db = mongo.Db,
   BSON = mongo.BSONPure;

var fs = require('fs'),
   path = require('path'),
   execution_status = 0;




// if(config.environment() == 'dev'){
   var dbserver = new DBServer('ds043497.mongolab.com',43497, {auto_reconnect: true});
   db = new Db('heroku_app15112354', dbserver, {safe: true});
   db.open(function(err, client) {
     if(err) { return console.dir(err); }
     client.authenticate(config.username(), config.password(), function(authErr, success) {
       db.collection('stylesDB', {safe:true}, function(err, collection) {
               if (err) {
                   console.log("The 'stylesDB' collection doesn't exist. Creating it with sample data...");
               }
           });
     });
   });
// }
// else{
 //   var dbserver = new DBServer('localhost', 27017, {auto_reconnect: true}); 
 //   db = new Db('test', dbserver, {safe: true});
 //   db.open(function(err, db) {
 //     if(!err) {
 //         db.collection('stylesDB', {safe:true}, function(err, collection) {
 //             if (err) {
 //                 console.log("The 'stylesDB' collection doesn't exist. Creating it with sample data...");
 //             }
 //         });
 //     }
 // });
// }


//set up middleware
var allowCrossDomain = function(req, res, next) {
   var oneof = false;
   if(req.headers.origin) {
       res.header('Access-Control-Allow-Origin', req.headers.origin);
       oneof = true;
   }
   if(req.headers['access-control-request-method']) {
       res.header('Access-Control-Allow-Methods', req.headers['access-control-request-method']);
       oneof = true;
   }
   if(req.headers['access-control-request-headers']) {
       res.header('Access-Control-Allow-Headers', req.headers['access-control-request-headers']);
       oneof = true;
   }
   if(oneof) {
       res.header('Access-Control-Max-Age', 60 * 60 * 24 * 365);
   }

   // intercept OPTIONS method
   if (oneof && req.method == 'OPTIONS') {
       res.send(200);
   }
   else {
       next();
   }
}    

// SERVER CONFIGURATION
// ====================
server.configure(function() {
 server.use(express["static"](__dirname + "/../public"));
 server.use(express.bodyParser());
 server.use(express.methodOverride());
 server.use(allowCrossDomain);
 server.use(server.router);
});

// SERVER
// ======
//Function returns all the Elements
var listAllElements = function (req, res) {
//Create the CSS file - button.css which will be at front-end
createCssFile();
db.collection('stylesDB', function(err, collection) {
       collection.find().toArray(function(err, items) {            
           res.send(items);
       });
   });
}

var listsElements = function (req, res) {
//lists all the different types of elements from collection
   db.collection('element_type', function(err, collection) {
       collection.find().toArray(function(err, items) {            
           res.send(items);
       });
   });
}

var listsColors  = function (req, res) {
//lists all the different types of elements from collection
   db.collection('colorsDB', function(err, collection) {
       collection.find().toArray(function(err, items) {            
           res.send(items);
       });
   });
}

var getElementTemplate = function(req,res){
  db.collection('element_template_collection', function(err, collection) {
       collection.find({ element_type: req.params.elementType}).toArray(function(err, items) {            
           res.send(items);
       });
   });  
}

var listElementsByType = function(req, res){
   db.collection('stylesDB', function(err, collection) {
       collection.find({ element_type: req.params.elementType}).toArray(function(err, items) {            
           res.send(items);
       });
   });
}

var listElementsByColor = function(req, res){
   db.collection('colorsDB', function(err, collection) {
       collection.find({ name: req.params.color}).toArray(function(err, items) {            
           res.send(items);
       });
   });
}

//Function for adding a style
var createStyle = function (req, res) {
 var style = req.body;
 console.log('Adding Style: ' + JSON.stringify(style));
 db.collection('stylesDB', function (err, collection) {
   collection.insert(style, {safe: true}, function(err, result) {
      if(err) {
       res.send({'error': 'An error has occured'});
     }
     else {
       console.log('Success: ' + JSON.stringify(result[0]));
       res.send(result[0]);
     }
   });   
 });
}

//Function returns style details based on id
var elementDetails = function (req, res) {
 var id = req.params.id;
   console.log('Retrieving style: ' + id);
   db.collection('stylesDB', function(err, collection) {
       collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
           res.send(item);
       });
   });
};

//Function delete style details based on id
var deleteStyle = function (req, res) {
   var id = req.params.id;
   console.log('Deleting Style: ' + id);
   db.collection('stylesDB', function(err, collection) {
       collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
           if (err) {
               res.send({'error':'An error has occurred - ' + err});
           } else {
               console.log('' + result + ' document(s) deleted');
               //Regenerate the CSS file
                execution_status = 1 ;
               res.send(req.body);
           }
       });
   });
};

//Function update style details based on id
var updateStyle = function (req, res) {
   var id = req.params.id;
   var style = req.body;
   delete style._id;
   console.log('Updating style: ' + id);
   console.log(JSON.stringify(style));
   db.collection('stylesDB', function(err, collection) {
       collection.update({'_id':new BSON.ObjectID(id)}, style, {safe:true}, function(err, result) {
           if (err) {
               console.log('Error updating style: ' + err);
               res.send({'error':'An error has occurred'});
           } else {
               console.log('' + result + ' document(s) updated');                
               res.send(style);
           }
       });
   });
};


var createCssFile = function () {
   //Set the path of the CSS file
   var _filePath = path.resolve('./public/css/button.css');
   
   //This will truncate the file if it exists and create it if it doesn't.
   fs.openSync(_filePath, 'w')
  
   db.collection('stylesDB', function(err, collection) {
       //Loop through the data
       var cssString;
       collection.find().each(function(err, doc) {
           if (doc != null) {
               //Holds CSS data from Document
               cssString = doc.class_css + doc.class_hover + doc.class_active + doc.class_disabled; 
           } 

           //Append data to the file synchronously
           fs.appendFileSync(_filePath, cssString);
       });  
   });
};


server.get('/elements', listAllElements); // All elements
server.get('/elements/:id', elementDetails); //Specific Element 
server.get('/type/:elementType', listElementsByType); // Filtering by Type. eg button 
server.get('/color/:color', listElementsByColor); //Filtering by color. eg Red
server.get('/getElementTemplate/:elementType', getElementTemplate);


server.get('/getElementList', listsElements);
server.del('/elements/:id', deleteStyle);
server.post('/elements', createStyle);
server.put('/elements/:id', updateStyle);
server.get('/getColorsList', listsColors);

// Start Node.js Server
http.createServer(server).listen(port);

console.log('Welcome to DearWeb.org home!\n\nPlease go to http://localhost:' + port + ' to start using Require.js and Backbone.js');